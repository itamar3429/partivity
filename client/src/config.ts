const host =
	process.env.NODE_ENV === "production"
		? "https://paritivity-api.onrender.com"
		: "//localhost:5000";

export const api = {
	host,
	defOptions: {
		mode: "cors" as const,
		credentials: "include" as const,
	},
	defHeaders: {
		"Content-Type": "application/json",
	},
	images: host + "/storage/get",
};
