
import unixShell from 'shelljs';

export class UnixShellService{
  private unix: typeof unixShell
  constructor(unix: typeof unixShell){
    this.unix = unix
  }
  makeDir(filePath:string, fileName:string){
    const result =  this.unix.mkdir(`~/${filePath}/${fileName}`)
    console.log({result})
  }
}