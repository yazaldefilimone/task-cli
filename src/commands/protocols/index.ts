export type ICommandResponse<F = Function> = {
  command: string;
  description: string;
  action: F;
};



export interface ICommand<T = any> {
  build: () => ICommandResponse
}