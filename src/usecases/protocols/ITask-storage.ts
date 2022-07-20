import { Task } from "@/core/entities";

export interface ITaskStorage {
  create: () => Promise<{ id: string } | Error>;
  dropOne: () => Promise<{ id: string } | Error>;
  done: () => Promise<{ id: string } | Error>;
  getAll: () => Promise<Task[] | Error>;
}
