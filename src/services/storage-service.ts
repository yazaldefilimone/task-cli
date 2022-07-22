import { TaskStorage, Task } from "@/core/entities";
import { ITaskStorage } from "@/usecases/protocols";
import { UnixShellService } from "@/services";
import { InternalError, NotFoundTaskError } from "@/core/errors";
import { Either, right, left } from "@/shared/error-handler/either";
import { convertedTask } from "./converted-task";

export class StorageService implements ITaskStorage {
  private readonly unixShellService: UnixShellService;
  private readonly rootPath: string;
  private readonly rootFile: string;
  private readonly root: string;

  constructor(unixShellService: UnixShellService, rootFile: string, rootPath: string) {
    this.unixShellService = unixShellService;
    this.rootFile = rootFile;
    this.rootPath = rootPath;
    this.root = `${rootPath}/${rootFile}`;
    this.int(this.rootPath, this.rootFile);
  }

  async done(data: { id: number }): Promise<Either<Error, { id: number }>> {
    const results = await this.unixShellService.redFile(this.root);
    const doneFile = results.find((task) => task.id === data.id);
    if (!doneFile) {
      return left(new NotFoundTaskError(String(data.id)));
    }
    const newsTasks = results.filter((task) => task.id !== data.id);

    doneFile.status = "done";
    newsTasks.push(doneFile);

    const result = await this.unixShellService.writeFile(this.root, newsTasks);

    if (!result) return left(new InternalError());

    return right({ id: doneFile.id as number });
  }

  async dropOne(data: { id: number }): Promise<Either<Error, { id: number }>> {
    const dataStorage = await this.unixShellService.redFile(this.root);
    const isExists = dataStorage.find((task) => task?.id === data.id);
    if (isExists === undefined) {
      return left(new NotFoundTaskError(String(data.id)));
    }
    const newsTasks = dataStorage.filter((task) => task.id !== data.id);
    await this.unixShellService.writeFile<TaskStorage[]>(this.root, newsTasks);

    return right({ id: isExists.id as number });
  }

  private int(rootPath: string, rootFile: string) {
    this.unixShellService.findFile(this.root).then((result) => {
      if (!result) {
        this.unixShellService
          .makeDir(rootPath, rootFile)
          .then(() => 0)
          .catch();
      }
    });
  }

  public async create(data: TaskStorage): Promise<Either<Error, { id: number }>> {
    const storageTask = await this.unixShellService.redFile(this.root);
    storageTask.push(data);

    const response = await this.unixShellService.writeFile<TaskStorage[]>(this.root, storageTask);
    if (!response) {
      return left(new InternalError());
    }
    return right({ id: data.id as number });
  }
}
