import { ICommand, ICommandResponse } from "@/commands/protocols";
import { IGetAllTaskUseCase } from "@/core/usecases";
import { UserInterface } from "@/ui";

export class GetAllTaskCommand implements ICommand {
  private readonly getAllTaskUseCase: IGetAllTaskUseCase;
  private readonly userInterface: UserInterface;
  constructor(getAllTaskUseCase: IGetAllTaskUseCase, userInterface: UserInterface) {
    this.getAllTaskUseCase = getAllTaskUseCase;
    this.userInterface = userInterface;
  }

  public async action(options: GetAllTaskCommand.optionsProps, parameters: { args: string[] }): Promise<void> {
    const response = await this.getAllTaskUseCase.execute();
    if (response.isLeft()) {
      return console.log(response.value);
    }

    const footers = ["total", "27%"];
    const ui = this.userInterface.list(response.value);
    return console.log(ui);
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
