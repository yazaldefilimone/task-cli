import { IncrementIdError, InternalError } from "@/core/errors";
import { Either, left, right } from "@/shared/error-handler/either";
import { ITaskStorage } from "@/usecases/protocols";

export class IncrementIdService {
  private readonly taskStorage: ITaskStorage;
  constructor(taskStorage: ITaskStorage) {
    this.taskStorage = taskStorage;
  }

  async id(): Promise<Either<IncrementIdError | InternalError, number>> {
    try {
      const all = await this.taskStorage.getAll();
      if (all.isLeft()) {
        return left(new IncrementIdError());
      }

      const id = all.value.length;

      return right(id);
    } catch (error) {
      return left(new InternalError());
    }
  }
}
