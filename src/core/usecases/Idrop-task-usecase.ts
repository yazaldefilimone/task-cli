import { Either } from "@/shared/error-handler/either";
import { InternalError } from "../errors";

export interface IDropTaskUseCase {
  execute: (data: IDropTaskUseCase.Input) => IDropTaskUseCase.Output;
}

export namespace IDropTaskUseCase {
  export type Input = { id: number };

  export type Output = Promise<Either<InternalError, { id: number }>>;
}
