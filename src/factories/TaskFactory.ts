import { CreateTaskCommand } from "@/commands";
import { ICreateTaskUseCase } from "@/core/usecases";
import { IncrementIdService } from "@/services";
import { CreateTaskUseCase } from "@/usecases";

const taskStorage: any = "not created";
const incrementIdService = new IncrementIdService(taskStorage);

export const CreateTaskCommandFactory = function (): CreateTaskCommand {
  const createTaskUseCase = new CreateTaskUseCase(taskStorage, incrementIdService);
  const createTaskCommand = new CreateTaskCommand(createTaskUseCase);
  return createTaskCommand;
};
