export function getDateString(date: Date | string | number) {
	return new Date(date).toISOString().split("T")[0];
}
