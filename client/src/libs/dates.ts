export function getDateString(date: Date | string | number) {
	return new Date(date).toISOString().split("T")[0];
}

export function removeTZOffset(date: Date) {
	return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
}
