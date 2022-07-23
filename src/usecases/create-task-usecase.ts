import { InternalError, InvalidDescriptionError } from "@/core/errors";
import { ICreateTaskUseCase } from "@/core/usecases";
import { right, left } from "@/shared/error-handler/either";
import { ITaskStorage } from "./protocols";
import { IncrementIdService } from "@/services";
import { TaskStorage } from "@/core/entities";
import moment from "moment";

export class CreateTaskUseCase implements ICreateTaskUseCase {
  private readonly taskStorage: ITaskStorage;
  private readonly incrementIdService: IncrementIdService;
  constructor(taskStorage: ITaskStorage, incrementIdService: IncrementIdService) {
    this.taskStorage = taskStorage;
    this.incrementIdService = incrementIdService;
  }

  public async execute({ description, priority }: ICreateTaskUseCase.Input): ICreateTaskUseCase.Output {
    if (!description || description.length <= 2) {
      return left(new InvalidDescriptionError(description));
    }

    priority = priority ? priority : "high";
    const buildIncrementId = await this.incrementIdService.id();

    if (buildIncrementId.isLeft()) {
      return left(buildIncrementId.value);
    }

    const buildTask: TaskStorage = {
      id: buildIncrementId.value,
      createdAt: moment().format(),
      priority,
      status: "padding",
      description,
    };

    const response = await this.taskStorage.create(buildTask);

    if (response.isLeft()) {
      return left(new InternalError());
    }

    return right({ id: response.value.id as any });
  }
}
