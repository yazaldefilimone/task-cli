import { ICommand, ICommandResponse } from "@/commands/protocols";
import { IGetAllTaskUseCase } from "@/core/usecases";

export class GetAllTaskCommand implements ICommand {
  private readonly getAllTaskUseCase: IGetAllTaskUseCase;
  constructor(getAllTaskUseCase: IGetAllTaskUseCase) {
    this.getAllTaskUseCase = getAllTaskUseCase;
  }

  public action(options: GetAllTaskCommand.optionsProps, parameters: { args: string[] }): void | Promise<void> {
    this.getAllTaskUseCase.execute().then((response) => console.log({ response: response.value }));
  }

  public build(): ICommandResponse<typeof this.action> {
    return {
      command: "list",
      description: "list all task",
      action: this.action,
    };
  }
}

export namespace GetAllTaskCommand {
  export type optionsProps = {
    priority?: any;
  };
}
