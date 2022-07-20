export class NotFoundTaskError extends Error {
  constructor(task: string) {
    super(`The task with: [${task}] is not found`);
  }
}
