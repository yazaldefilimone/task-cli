import { ICommand, ICommandResponse } from "@/commands/protocols";
import { IDropTaskUseCase } from "@/core/usecases";

export class DropTaskCommand implements ICommand {
  private readonly dropTaskUseCase: IDropTaskUseCase;
  constructor(dropTaskUseCase: IDropTaskUseCase) {
    this.dropTaskUseCase = dropTaskUseCase;
  }

  public action(options: DropTaskCommand.optionsProps, parameters: { args: string[] }): void | Promise<void> {
    this.dropTaskUseCase.execute({ id: Number(parameters.args[0]) }).then((response) => console.log({ response }));
  }

  public build(): ICommandResponse<typeof this.action> {
    return {
      command: "add",
      description: "create new task",
      action: this.action,
    };
  }
}

export namespace DropTaskCommand {
  export type optionsProps = {
    priority?: any;
  };
}
