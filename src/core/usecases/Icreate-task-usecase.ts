import { TaskClient } from "@/core/entities";
import { Either } from "@/shared/error-handler/either";
import { IncrementIdError, InternalError, InvalidDescriptionError } from "../errors";

export interface ICreateTaskUseCase {
  execute: (data: ICreateTaskUseCase.Input) => ICreateTaskUseCase.Output;
}

export namespace ICreateTaskUseCase {
  export type Input = TaskClient;

  export type Output = Promise<Either<InvalidDescriptionError | InternalError | IncrementIdError, { id: number }>>;
}
