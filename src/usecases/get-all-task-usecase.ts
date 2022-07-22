import { IGetAllTaskUseCase } from "@/core/usecases";
import { right, left } from "@/shared/error-handler/either";
import { ITaskStorage } from "./protocols";

export class GetAllTaskUseCase implements IGetAllTaskUseCase {
  private readonly taskStorage: ITaskStorage;
  constructor(taskStorage: ITaskStorage) {
    this.taskStorage = taskStorage;
  }
  async execute(): IGetAllTaskUseCase.Output {
    const tasks = await this.taskStorage.getAll();
    if (tasks.isLeft()) {
      return left(tasks.value);
    }
    return right(tasks.value);
  }
}
