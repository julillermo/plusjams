import { Args, Command, Flags } from "@oclif/core";

export default class Tui extends Command {
  static override summary =
    "Compile C++ source  with (but cuztomizable) defaults.";
  static override description = "";
  static override examples = [
    '<%= config.bin %> <%= command.id %> "./cpp_source.cpp"',
  ];

  static override args = {
    file: Args.string({ description: "file to read" }),
  };
  static override flags = {
    force: Flags.boolean({ char: "f" }),
    name: Flags.string({ char: "n", description: "name to print" }),
  };

  public async run(): Promise<void> {
    const { args: _args, flags: _flags } = await this.parse(Tui);

    // 	const name = flags.name ?? "world";
    // 	this.log(
    // 		`hello ${name} from /home/tuliog/Documents/Workspace/plusjams/src/commands/tui.ts`,
    // 	);
    // 	if (args.file && flags.force) {
    // 		this.log(`you input --force and --file: ${args.file}`);
    // 	}
    // }
    this.log("Ink CLI framework will go here");
  }
}
