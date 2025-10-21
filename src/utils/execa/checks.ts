import { execa } from "execa";
import { isWindows } from "../node/process.js";

//TODO: The windows equivalent commands here need to be verified
export async function isSystemPackageInstalled(pkg: string): Promise<boolean> {
	const cmd = isWindows() ? "where" : "which";
	const args = isWindows() ? ["-v", pkg] : [pkg];
	try {
		await execa(cmd, args);
		return true;
	} catch {
		return false;
	}
}
