import packageInfo from "@/../package.json";
import { CreateTaskCommandFactory } from "@/factories";

import { program } from "commander";

const createTaskCommandFactory = CreateTaskCommandFactory();
const createTaskBuild = createTaskCommandFactory.build();

program.name(packageInfo.name).description(packageInfo.description).version(packageInfo.version);
program
  .command(createTaskBuild.command)
  .description(createTaskBuild.description)
  .action((str, options) => createTaskBuild.action(str, options));

export default program;
