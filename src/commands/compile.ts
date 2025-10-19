import { Args, Command, Flags } from "@oclif/core";
import {
	getFullInputFilePath,
	getFullOutputFilePath,
} from "../utils/commands/compile.js";

export default class Compile extends Command {
	static override summary =
		"Compile .cpp source opinionated with (but cuztomizable) defaults.";
	static override description = "";
	static override examples = [
		'<%= config.bin %> <%= command.id %> "./cpp_source.cpp"',
	];

	static override args = {
		"input-file": Args.string({
			description: "target .cpp source file to be compiled",
			required: true,
		}),
	};

	static override flags = {
		"output-path": Flags.string({
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
				"no-file-marker": noFileMarker,
				"file-marker": fileMarker,
			},
		} = await this.parse(Compile);

		const currentWorkingDirectory = process.cwd();
		const inputFilePath = getFullInputFilePath(inputFile);
		const outputFilePath = getFullOutputFilePath({
			inputFilePath,
			outputPath,
			outputFileName: outputFileName,
			fileMarker: noFileMarker ? undefined : fileMarker,
		});

		console.log({
			inputFile,
			outputPath,
			outputFileName,
			noFileMarker,
			fileMarker,
			currentWorkingDirectory,
			inputFilePath,
			outputFilePath,
		});
	}
}
