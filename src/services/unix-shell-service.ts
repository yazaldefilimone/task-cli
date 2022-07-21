import { writeFile } from "fs/promises";
import unixShell from 'shelljs';

export class UnixShellService{
  private unix: typeof unixShell
  constructor(unix: typeof unixShell){
    this.unix = unix
  }
  public async makeDir(filePath:string, fileName:string){
    this.unix.mkdir('-p', `~/${filePath}/${fileName}`);
  }

  public async redFile(filePath:string){
    const file =  this.unix.cat('./package.json');
    const json = JSON.parse(file);
    return json.task
  }
  public async writeFile<T = any>(filePath:string, data:T){
    try {
      const file =  this.unix.cat('./package.json');
      const json = JSON.parse(file);
      json.task.push(data)
      await writeFile(filePath, json)
      return true

    } catch (error) {
      return false
    }
   
  }
}