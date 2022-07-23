import { ICommand, ICommandResponse } from "@/commands/protocols";
import { IDropTaskUseCase } from "@/core/usecases";

export class DropTaskCommand implements ICommand {
  private readonly dropTaskUseCase: IDropTaskUseCase;
  constructor(dropTaskUseCase: IDropTaskUseCase) {
    this.dropTaskUseCase = dropTaskUseCase;
  }

  public action(options: DropTaskCommand.optionsProps, parameters: { args: string[] }): void | Promise<void> {
    this.dropTaskUseCase.execute({ id: Number(options) }).then((response) => console.log({ response }));
  }

  public build(): ICommandResponse<typeof this.action> {
    return {
      command: "drop",
      description: "drop a task",
      action: this.action,
    };
  }
}

export namespace DropTaskCommand {
  export type optionsProps = {
    priority?: any;
  };
}
