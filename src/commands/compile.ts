import path from "node:path";
import { Args, Command, Flags } from "@oclif/core";

export default class Compile extends Command {
	static override summary =
		"Compile .cpp source opinionated (but cuztomizable) defaults.";
	static override description = "";

	static override args = {
		input_file: Args.string({
			description: "target .cpp source file to be compiled",
			required: true,
		}),
		output_file: Args.string({
			description: "file path (and file anme) of output executable",
			required: false,
		}),
	};

	static override examples = [
		'<%= config.bin %> <%= command.id %> "./cpp_source.cpp"',
		'<%= config.bin %> <%= command.id %> "./cpp_source.cpp" "./custom_path/custom_file_name"',
	];

	static override flags = {
		// flag with no value (-f, --force)
		file_marker: Flags.string({
			char: "m",
			default: "_executable",
			description:
				"text appended to the output file name so its easily identifiable in .gitignore",
			required: false,
		}),
	};

	public async run(): Promise<void> {
		const {
			args: { input_file, output_file },
			flags,
		} = await this.parse(Compile);

		const currentWorkingDirectory = process.cwd();
		const inputFilePath = path.join(currentWorkingDirectory, input_file);
		const outputFilePath =
			output_file !== undefined
				? path.join(currentWorkingDirectory, output_file)
				: inputFilePath;

		console.log({
			input_file,
			output_file,
			currentWorkingDirectory,
			inputFilePath,
			outputFilePath,
		});
	}
}
