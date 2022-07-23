import { Task, TaskClient, TaskStorage } from "@/core/entities";
import { Either } from "@/shared/error-handler/either";

export interface ITaskStorage {
  create: (data: TaskStorage) => Promise<Either<Error, { id: number }>>;
  createDropHold: (data: TaskStorage[]) => Promise<Either<Error, { ok: boolean }>>;
  dropOne: (data: { id: number }) => Promise<Either<Error, { id: number }>>;
  done: (data: { id: number }) => Promise<Either<Error, { id: number }>>;
  getAll: () => Promise<Either<Error, TaskStorage[]>>;
}
