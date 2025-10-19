import { Args, Command, Flags } from "@oclif/core";

// Ink CLI framework will go here
export default class Tui extends Command {
	static override args = {
		file: Args.string({ description: "file to read" }),
	};
	static override description =
		"> interact with plusjams via a terminal user interfance";
	static override examples = ["<%= config.bin %> <%= command.id %>"];
	static override flags = {
		// flag with no value (-f, --force)
		force: Flags.boolean({ char: "f" }),
		// flag with a value (-n, --name=VALUE)
		name: Flags.string({ char: "n", description: "name to print" }),
	};

	static override state = "planned";

	public async run(): Promise<void> {
		const { args, flags } = await this.parse(Tui);

		const name = flags.name ?? "world";
		this.log(
			`hello ${name} from /home/tuliog/Documents/Workspace/plusjams/src/commands/tui.ts`,
		);
		if (args.file && flags.force) {
			this.log(`you input --force and --file: ${args.file}`);
		}
	}
}
