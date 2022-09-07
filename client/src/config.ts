export const api = {
	host:
		process.env.NODE_ENV === "production"
			? "//production.host"
			: "//localhost:5000",
	defOptions: {
		mode: "cors" as const,
		credentials: "include" as const,
	},
	defHeaders: {
		"Content-Type": "application/json",
	},
};
