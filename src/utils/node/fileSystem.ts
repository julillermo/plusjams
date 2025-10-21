import fs from "node:fs";
import {
	MAX_PATH_CHAR_COUNT,
	MAX_PATH_CHAR_COUNT_EXTENDED,
	RESERVED_FILE_PATH_CHARS_UNIX,
	RESERVED_FILE_PATH_CHARS_WIN32,
} from "../../constants/system.js";

import { isWindows } from "./process.js";

/**
 * File path (including proper file name) must already exist for this to be true
 */
export function isAFile(path: string): boolean {
	let fileValidity = false;
	fileValidity = fs.lstatSync(path).isFile();
	return fileValidity;
}

/**
 * File path must already exist for this to be true
 */
export function isDirectory(path: string): boolean {
	let fileValidity = false;
	fileValidity = fs.lstatSync(path).isDirectory();
	return fileValidity;
}

/**
 * The isValidFilePath is a ESM port of is-invalid-path <https://github.com/jonschlinkert/is-invalid-path>
 */
export type IsValidFilePathOptions = {
	extendWin32MaxPath: boolean;
};
export function isValidFilePath(
	filePath: string,
	options: IsValidFilePathOptions = { extendWin32MaxPath: false },
) {
	if (filePath.length < 1) {
		return false;
	}

	if (isWindows()) {
		const maxPathChar = options.extendWin32MaxPath
			? MAX_PATH_CHAR_COUNT_EXTENDED
			: MAX_PATH_CHAR_COUNT;
		if (filePath.length > maxPathChar) {
			return false;
		}
	}

	const reservedChars = isWindows()
		? `[${RESERVED_FILE_PATH_CHARS_WIN32.join("")}]`
		: `[${RESERVED_FILE_PATH_CHARS_UNIX.join("")}]`;
	const re = new RegExp(reservedChars);

	return !re.test(filePath);
}
