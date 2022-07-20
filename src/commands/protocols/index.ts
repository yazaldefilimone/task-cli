export type ICommandResponse<F = Function> = {
  command: string;
  description: string;
  action: F;
};
