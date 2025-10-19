import path from "node:path";
import { isAFile, isValidFilePath } from "../node/fileSystem.js";

export function getFullInputFilePath(inputFile: string): string {
	const currentWorkingDirectory = process.cwd();
	const inputFilePath = path.join(currentWorkingDirectory, inputFile);

	if (!isAFile(inputFile)) {
		throw new Error(`invalid .cpp source file: ${inputFilePath}`);
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
