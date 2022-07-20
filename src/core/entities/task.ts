export type TaskStorage = {
  id?: number;
  description: string;
  createdAt: Date;
  status: Status;
  priority: Priority;
};

export type Task = {
  id?: number;
  description: string;
  age: string;
  status: Status;
  priority: Priority;
};

export type TaskClient = {
  description: string;
  priority?: Priority;
};

type Status = "padding" | "done";
type Priority = "low" | "high" | "normal";
