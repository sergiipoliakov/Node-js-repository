import fs from "fs/promises";
import { isAccessible } from "./helpers/exist.js";
import path from "path";

class SortFiles {
	constructor(dist) {
		this.dist = dist;
	}
	async #copyFile(file) {
		const folder = path.extname(file.path);
		const targetFolder = path.join(this.dist, folder);

		try {
			if (!(await isAccessible(targetFolder))) {
				await fs.mkdir(targetFolder);
			}
		} catch (error) {
			process.exit(1);
		}
	}
	async readFolder(base) {
		const files = await fs.readdir(base);
		console.log(base); //?
		for (const item of files) {
			const localBase = path.join(base, item);
			const state = await fs.stat(localBase);
			if (state.isDirectory()) {
				await this.readFolder(localBase);
			} else {
				await this.#copyFile({ name: item, path: localBase });
			}
		}
	}
}

export default SortFiles;
