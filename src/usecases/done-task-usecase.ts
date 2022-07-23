import { IDoneTaskUseCase } from "@/core/usecases";
import { ITaskStorage } from "./protocols";
import { left, right } from "@/shared/error-handler/either";
import { InternalError, NotFoundTaskError } from "@/core/errors";
export class DoneTaskUseCase implements IDoneTaskUseCase {
  private readonly taskStorage: ITaskStorage;
  constructor(taskStorage: ITaskStorage) {
    this.taskStorage = taskStorage;
  }

  async execute(data: IDoneTaskUseCase.Input): IDoneTaskUseCase.Output {
    const taskOrError = await this.taskStorage.getAll();

    if (taskOrError.isLeft()) {
      return left(taskOrError.value);
    }
    const tasks = taskOrError.value;

    const task = tasks.find((task) => task.id === data.id);

    if (!task) {
      return left(new NotFoundTaskError(String(data.id)));
    }
    task.status = "done";
    const storageTask = tasks.filter((task) => task.id !== data.id);
    storageTask.push(task);

    const response = await this.taskStorage.createDropHold(storageTask);
    if (response.isLeft()) {
      return left(new InternalError());
    }
    return right({ id: task.id as number });
  }
}
