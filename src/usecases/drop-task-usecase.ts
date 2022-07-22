import { IDropTaskUseCase } from "@/core/usecases";
import { ITaskStorage } from "./protocols";
import { left, right } from "@/shared/error-handler/either";

export class DropTaskUseCase implements IDropTaskUseCase {
  private readonly taskStorage: ITaskStorage;
  constructor(taskStorage: ITaskStorage) {
    this.taskStorage = taskStorage;
  }

  async execute(data: IDropTaskUseCase.Input): IDropTaskUseCase.Output {
    const result = await this.taskStorage.dropOne(data);
    if (result.isLeft()) {
      return left(result.value);
    }

    return right(result.value);
  }
}
