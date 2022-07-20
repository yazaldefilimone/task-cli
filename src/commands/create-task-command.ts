import { ICommandResponse } from "@/commands/protocols";
import { ICreateTaskUseCase } from "@/core/usecases";

export class CreateTaskCommand {
  private readonly createTaskUseCase: ICreateTaskUseCase;

  constructor(createTaskUseCase: ICreateTaskUseCase) {
    this.createTaskUseCase = createTaskUseCase;
  }

  private action() {
    //  const response = await this.createTaskUseCase.execute()
  }
  public build(): ICommandResponse {
    return {
      command: "add",
      description: "create new task",
      action: this.action,
    };
  }
}
