import { addAlias } from "module-alias";
import { resolve } from "path";
import dotenv from "dotenv";
dotenv.config();

addAlias("@", resolve(process.env.TS_NODE_DEV === undefined ? "dist" : "src"));
