export class InvalidDescriptionError extends Error {
  constructor(param: string) {
    super(`This [${param}] is not valid!`);
  }
}
