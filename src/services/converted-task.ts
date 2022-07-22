import { Task, TaskStorage } from "@/core/entities";
import moment from "moment";
export const convertedTask = function (task: TaskStorage): Task {
  const newTask = {
    id: task.id,
    description: task.description,
    age: moment(task.createdAt).fromNow(),
    status: task.status,
    priority: task.priority,
  };

  return newTask;
};
