import fs from "fs/promises";
import { isAccessible } from "./helpers/exist.js";
import { Command } from "commander/esm.mjs";
import path from "path";
import { fileURLToPath } from "url";

const program = new Command();
import SortFiles from "./sort.js";

program
	.option("-s, --source <type>", "Sourse folder")
	.option("-o, --output [type]", "Output folder", "./dist");

program.parse(process.argv);

const { source, output } = program.opts();

if (!(await isAccessible(output))) {
	await fs.mkdir(output);
}

const sorting = new SortFiles(output);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__filename);
console.log(__dirname);

try {
	await sorting.readFolder(path.resolve(__dirname, source));
} catch (error) {
	console.log(error);
	process.exit(1);
}
