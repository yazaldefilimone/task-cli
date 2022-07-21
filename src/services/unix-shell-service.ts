import { TaskStorage } from "@/core/entities";
import { writeFile, readFile } from "fs/promises";
import unixShell from "shelljs";

export class UnixShellService {
  private unix: typeof unixShell;
  constructor(unix: typeof unixShell) {
    this.unix = unix;
  }
  public async makeDir(filePath: string, fileName: string) {
    const init = { tasks: [] };
    const rootPath = filePath;
    this.unix.mkdir(rootPath);
    console.log(`${rootPath}/${fileName}`);
    await writeFile(`${rootPath}/${fileName}`, JSON.stringify(init));
  }

  public async redFile(filePath: string): Promise<TaskStorage[]> {
    const file = await readFile(filePath);
    const json = JSON.parse(file as any);
    console.log(json);
    return json.tasks;
  }
  public async writeFile<T = any>(filePath: string, data: T) {
    try {
      const file = await readFile(filePath);
      const json = JSON.parse(file as any);
      json.tasks = data;
      await writeFile(filePath, JSON.stringify(json));
      return true;
    } catch (error) {
      return false;
    }
  }
}
