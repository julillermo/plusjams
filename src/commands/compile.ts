import { Args, Command, Flags } from "@oclif/core";
import { COMPILERS } from "../constants/typeVariables.js";
import type { Compiler } from "../types/compile.js";
import {
	getFullInputFilePath,
	getFullOutputFilePath,
	getInstalledCompilerRecursive,
} from "../utils/commands/compile.js";
import { compileExeca } from "../utils/execa/compile.js";

export default class Compile extends Command {
	static override summary =
		"Compile C++ source opinionated with (but cuztomizable) defaults.";
	static override description = "";
	static override examples = [
		'<%= config.bin %> <%= command.id %> "./cpp_source.cpp"',
	];

	static override args = {
		"input-file": Args.directory({
			description: "target C++ source file to be compiled",
			required: true,
		}),
	};

	static override flags = {
		"output-path": Flags.directory({
			char: "o",
			required: false,
			description: "File path of output executable.",
		}),

		"output-file-name": Flags.string({
			char: "n",
			required: false,
			description:
				"File name of output executable.\n\
        Unless specified using '--no-file-marker', a file-marker string will still be appended to the filename\n\
        This can also be used to specify the output file extension.",
		}),

		"run-after": Flags.boolean({
			char: "r",
			required: false,
			description:
				"Indicate whether to automatically run the output exectuable after compilation.",
		}),

		compiler: Flags.string({
			char: "c",
			options: COMPILERS,
			required: false,
			description:
				"Specify a compiler the way it's called via the terminal: 'clang++', 'g++'.\n\
        If no specified compiler is specified Plusjams first reach for 'clang++' before falling back on 'g++'\n\
        At least 1 compiler must be available for this command to work.",
		}),

		"no-file-marker": Flags.boolean({
			char: "M",
			required: false,
			description: "Explicitly state whether to append a file-marker.",
			default: false,
		}),

		"file-marker": Flags.string({
			char: "m",
			required: false,
			description:
				"Text appended to the output file name so its easily identifiable in .gitignore.\n\
        A file-marker will always be appended unless the '--no-file-marker' flag is passed.\n\
        This can also be used to specify the output file extensions",
			default: "_executable",
		}),
	};

	public async run(): Promise<void> {
		const {
			args: { "input-file": inputFile },
			flags: {
				"output-path": outputPath,
				"output-file-name": outputFileName,
				"run-after": runAfter,
				compiler,
				"no-file-marker": noFileMarker,
				"file-marker": fileMarker,
			},
		} = await this.parse(Compile);

		const inputFilePath = getFullInputFilePath(inputFile);
		const outputFilePath = getFullOutputFilePath({
			inputFilePath,
			outputPath,
			outputFileName: outputFileName,
			fileMarker: noFileMarker ? undefined : fileMarker,
		});
		const installVerifiedCompiler = await getInstalledCompilerRecursive({
			compiler: compiler as Compiler | undefined,
			checkedCompilers: [],
			userSpecified: compiler !== undefined,
		});

		/**
		 * Uncomment for debugging purposes. Update variables as you go along
		 */
		// console.log(
		// 	JSON.stringify(
		// 		{
		// 			cliArguments: {
		// 				inputFile,
		// 				outputPath,
		// 				outputFileName,
		// 				runAfter,
		// 				compiler,
		// 				noFileMarker,
		// 				fileMarker,
		// 			},
		// 			derivedVariables: {
		// 				currentWorkingDirectory,
		// 				inputFilePath,
		// 				outputFilePath,
		// 				installVerifiedCompiler,
		// 			},
		// 		},
		// 		null,
		// 		2,
		// 	),
		// );

		await compileExeca(installVerifiedCompiler, {
			inputFilePath,
			outputFilePath,
			runAfter,
		});
	}
}
