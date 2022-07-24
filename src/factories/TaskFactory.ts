import shelljs from "shelljs";
import { CreateTaskCommand, DropTaskCommand, GetAllTaskCommand } from "@/commands";
import { IncrementIdService, StorageService, UnixShellService } from "@/services";
import { CreateTaskUseCase, DropTaskUseCase, GetAllTaskUseCase } from "@/usecases";
import { DoneTaskCommand } from "@/commands/done-task-command";
import { DoneTaskUseCase } from "@/usecases/done-task-usecase";
import { UserInterface } from "@/ui";
import Table from "easy-table";

const user = shelljs.exec("whoami").stdout;
const rootPath = `/home/${user.trim()}/.task-cli`;
const rootFile = "task-cli-memory-storage.json";

const unixShellService = new UnixShellService(shelljs);
const taskStorage = new StorageService(unixShellService, rootFile, rootPath);
const incrementIdService = new IncrementIdService(taskStorage);
const userInterface = new UserInterface(new Table());

export const CreateTaskCommandFactory = function (): CreateTaskCommand {
  const createTaskUseCase = new CreateTaskUseCase(taskStorage, incrementIdService);
  const createTaskCommand = new CreateTaskCommand(createTaskUseCase);
  return createTaskCommand;
};

export const GetAllTaskCommandFactory = function (): GetAllTaskCommand {
  const getAllTaskUseCase = new GetAllTaskUseCase(taskStorage);
  const getAllTaskCommand = new GetAllTaskCommand(getAllTaskUseCase, userInterface);
  return getAllTaskCommand;
};

export const DropTaskCommandFactory = function (): DropTaskCommand {
  const dropTaskUseCase = new DropTaskUseCase(taskStorage);
  const dropTaskCommand = new DropTaskCommand(dropTaskUseCase);
  return dropTaskCommand;
};

export const DoneTaskCommandFactory = function (): DoneTaskCommand {
  const doneTaskUseCase = new DoneTaskUseCase(taskStorage);
  const doneTaskCommand = new DoneTaskCommand(doneTaskUseCase);
  return doneTaskCommand;
};
