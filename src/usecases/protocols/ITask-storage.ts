import { Task, TaskClient, TaskStorage } from "@/core/entities";

export interface ITaskStorage {
  create: (data: TaskStorage) => Promise<{ id: string } | Error>;
  dropOne: (data: { id: string }) => Promise<{ id: string } | Error>;
  done: (data: { id: string }) => Promise<{ id: string } | Error>;
  getAll: () => Promise<Task[] | Error>;
}
