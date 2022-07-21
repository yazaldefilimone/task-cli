import packageInfo from "@/../package.json";
import { CreateTaskCommandFactory } from "@/factories";

import { program } from "commander";

const createTaskCommandFactory = CreateTaskCommandFactory();
const createTaskBuild = createTaskCommandFactory.build();

program.name(packageInfo.name).description(packageInfo.description).version(packageInfo.version);
program
  .command(createTaskBuild.command)
  .description(createTaskBuild.description)
  .option("--priority", "display just the first substring")
  .action((options, parameters) => createTaskCommandFactory.action(options, parameters));

export default program;
