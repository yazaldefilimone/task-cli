import { Task } from "@/core/entities";
import { Either } from "@/shared/error-handler/either";
import { IncrementIdError, InternalError, InvalidDescriptionError } from "../errors";

export interface IGetAllTaskUseCase {
  execute: () => IGetAllTaskUseCase.Output;
}

export namespace IGetAllTaskUseCase {
  export type Output = Promise<Either<InvalidDescriptionError | InternalError | IncrementIdError, Task[]>>;
}
