export function removeDuplicatesFromlist<T>(list: T[]): T[] {
	return Array.from(new Set(list));
}
