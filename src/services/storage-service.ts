import { TaskStorage, Task } from "@/core/entities";
import { ITaskStorage } from "@/usecases/protocols";
import { UnixShellService } from "@/services";
import { InternalError } from "@/core/errors";
import { Either, right, left } from "@/shared/error-handler/either";

export class StorageService  implements ITaskStorage{
  private readonly unixShellService:UnixShellService;
  private readonly rootPath: string;
  private readonly rootFile:string;
  private readonly root: string

  constructor(unixShellService:UnixShellService, rootFile:string, rootPath:string, root:string){
    this.unixShellService = unixShellService;
    this.rootFile = rootFile;
    this.rootPath = rootPath;
    this.root = root;
    this.int(this.rootPath, this.rootFile)
  }

  private int(rootPath:string, rootFile:string) {
    this.unixShellService.makeDir(rootPath, rootFile).then(() => 0).catch()
  }

  public async create(data: TaskStorage): Promise<Either<Error, { id: number }>>{
    const response = await this.unixShellService.writeFile<TaskStorage>(this.root, data)
    if(!response){
      return left(new InternalError())
    }
    return right({ id: data.id as number })
  }



}