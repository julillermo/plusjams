// Windows
export const MAX_PATH_CHAR_COUNT = 260;
export const MAX_PATH_CHAR_COUNT_EXTENDED = 32767;
export const RESERVED_FILE_PATH_CHARS_WIN32 = [
	"<", // (less than)
	">", // (greater than)
	":", // (colon)
	'"', // (double quote)
	"/", // (forward slash)
	"\\", // (backslash)
	"|", // (vertical bar or pipe)
	"?", // (question mark)
	"*", // (asterisk)
];

// Linux / Unix
export const RESERVED_FILE_PATH_CHARS_UNIX = [
	"<", // (less than)
	">", // (greater than)
	":", // (colon)
	'"', // (double quote)
	"\\", // (backslash)
	"|", // (vertical bar or pipe)
	"?", // (question mark)
	"*", // (asterisk)
];
