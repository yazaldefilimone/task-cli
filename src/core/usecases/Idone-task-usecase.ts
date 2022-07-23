import { Either } from "@/shared/error-handler/either";
import { IncrementIdError, InternalError, InvalidDescriptionError } from "../errors";

export interface IDoneTaskUseCase {
  execute: (data: IDoneTaskUseCase.Input) => IDoneTaskUseCase.Output;
}

export namespace IDoneTaskUseCase {
  export type Input = { id: number };
  export type Output = Promise<
    Either<InvalidDescriptionError | InternalError | IncrementIdError, { description: string }>
  >;
}
