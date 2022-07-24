import { ICommand, ICommandResponse } from "@/commands/protocols";
import { ICreateTaskUseCase } from "@/core/usecases";

export class CreateTaskCommand implements ICommand {
  private readonly createTaskUseCase: ICreateTaskUseCase;
  constructor(createTaskUseCase: ICreateTaskUseCase) {
    this.createTaskUseCase = createTaskUseCase;
  }

  public action(options: any, parameters: { args: string[] }): void | Promise<void> {
    this.createTaskUseCase
      .execute({ priority: options, description: options })
      .then((response) => console.log({ response }));
  }

  public build(): ICommandResponse<typeof this.action> {
    return {
      command: "add",
      description: "create new task",
      action: this.action,
    };
  }
}

export namespace CreateTaskCommand {
  export type optionsProps = {
    priority?: any;
  };
}
