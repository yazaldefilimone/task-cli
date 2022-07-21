import shelljs from "shelljs";
import { CreateTaskCommand } from "@/commands";
import { IncrementIdService, StorageService, UnixShellService } from "@/services";
import { CreateTaskUseCase } from "@/usecases";

const user = shelljs.exec("whoami").stdout;
const rootPath = `/home/${user.trim()}/.task-cli`;
const rootFile = "task-cli-memory-storage.json";

const unixShellService = new UnixShellService(shelljs);
const taskStorage = new StorageService(unixShellService, rootFile, rootPath);
const incrementIdService = new IncrementIdService(taskStorage);

export const CreateTaskCommandFactory = function (): CreateTaskCommand {
  const createTaskUseCase = new CreateTaskUseCase(taskStorage, incrementIdService);
  const createTaskCommand = new CreateTaskCommand(createTaskUseCase);
  return createTaskCommand;
};
