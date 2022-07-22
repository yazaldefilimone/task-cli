import { Task, TaskStorage } from "@/core/entities";
import moment from "moment";
export const convertedTask = function (task: TaskStorage): Task {
  const now = moment().format();
  const diff = moment(now).diff(moment(task.createdAt));

  const newTask = {
    id: task.id,
    description: task.description,
    age: `${moment.duration(diff).asMinutes()}} seconds`,
    status: task.status,
    priority: task.priority,
  };

  return newTask;
};
