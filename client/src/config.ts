export const api = {
	host:
		process.env.NODE_ENV === "production"
			? "//production.host"
			: "//localhost:5000",
};
