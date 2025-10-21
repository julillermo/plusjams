export function isWindows(): boolean {
	return (process.platform === "win32") === true;
}
