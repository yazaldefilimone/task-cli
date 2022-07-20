export type ICommandResponse<F = Function> = {
  name: string;
  description: string;
  action: F;
};
