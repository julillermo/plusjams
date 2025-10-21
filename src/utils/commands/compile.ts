import path from "node:path";
import type { Compiler } from "../../types/compile.js";
import { isSystemPackageInstalled } from "../execa/checks.js";
import { removeDuplicatesFromlist } from "../logic.js";
import { isAFile, isValidFilePath } from "../node/fileSystem.js";

export function getFullInputFilePath(inputFile: string): string {
	const currentWorkingDirectory = process.cwd();
	const inputFilePath = path.join(currentWorkingDirectory, inputFile);

	if (!isAFile(inputFile)) {
		throw new Error(`invalid C++ source file: ${inputFilePath}`);
	}

	return inputFilePath;
}

export type GetFullOutputFilePathProps = {
	inputFilePath: string;
	outputPath: string | undefined;
	outputFileName: string | undefined;
	fileMarker?: string;
};
export function getFullOutputFilePath({
	inputFilePath,
	outputPath,
	outputFileName,
	fileMarker,
}: GetFullOutputFilePathProps) {
	const { dir, name } = path.parse(inputFilePath);
	const finalOutputName = outputFileName ?? name;

	if (outputPath === undefined) {
		return path.join(dir, `${finalOutputName}${fileMarker ?? ""}`);
	}

	if (!isValidFilePath(outputPath, { extendWin32MaxPath: true })) {
		throw new Error(`invalid output file path: ${outputPath}`);
	}

	return path.join(outputPath, `${finalOutputName}${fileMarker ?? ""}`);
}

export async function getInstalledCompilerRecursive({
	compiler,
	checkedCompilers,
	userSpecified = false,
}: {
	compiler?: Compiler;
	checkedCompilers: Compiler[];
	userSpecified?: boolean;
}): Promise<Compiler> {
	userSpecified &&
		checkedCompilers.length > 0 &&
		process.stdout.write(
			`ERROR: Couldn't locate user specified compiler, checking system for ${compiler} installation`,
		);

	if (compiler === "clang++" && !checkedCompilers.includes("clang++")) {
		const isClangPPInstalled = await isSystemPackageInstalled("clang++");
		return isClangPPInstalled
			? "clang++"
			: await getInstalledCompilerRecursive({
					compiler: "g++",
					checkedCompilers: removeDuplicatesFromlist<Compiler>([
						...checkedCompilers,
						"clang++",
					]),
				});
	} else if (compiler === "g++" && !checkedCompilers.includes("g++")) {
		const isGnuPPInstalled = await isSystemPackageInstalled("g++");
		return isGnuPPInstalled
			? "g++"
			: await getInstalledCompilerRecursive({
					compiler: "clang++",
					checkedCompilers: removeDuplicatesFromlist<Compiler>([
						...checkedCompilers,
						"g++",
					]),
				});
	} else if (compiler === undefined) {
		return await getInstalledCompilerRecursive({
			compiler: "clang++",
			checkedCompilers: [],
		});
	} else {
		throw Error(
			"Unable to locate either clang++ or g++ installed on the system.\n\
      Plusjams requires at least one of these to be installed for to compile source C++ files",
		);
	}
}
