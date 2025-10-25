import { execa } from "execa";
import * as path from "node:path";
import type { Compiler } from "../../types/compile.js";
import { isWindows } from "../node/process.js";

export async function compileExeca(
	compiler: Compiler,
	options: {
		inputFilePath: string;
		outputFilePath: string;
		runAfter?: boolean;
	},
) {
	try {
		await execa(compiler, [
			options.inputFilePath,
			"-o",
			options.outputFilePath,
		]);

		if (options.runAfter) {
			const resolvedOutputPath = path.resolve(options.outputFilePath);

			if (!isWindows()) {
				console.log("Setting 755 executable file permision ...");
				await execa("chmod", ["755", resolvedOutputPath]);
			}

			console.log(`Running output ${resolvedOutputPath} ...\n`);
			await execa(resolvedOutputPath, undefined, {
				stdin: ["inherit"],
				stdout: ["inherit"],
			});
		}
	} catch (error) {
		console.error(error);
	}
}
