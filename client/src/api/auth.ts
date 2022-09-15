import { api } from "../config";

export const apiRegister = async (
	username: string,
	email: string,
	password: string
) => {
	return fetch(api.host + "/auth/register", {
		method: "POST",
		body: JSON.stringify({ username, password, email }),
		headers: {
			"Content-Type": "application/json",
		},
	}).then(async (res) => {
		console.log(res);

		if (res.ok) {
			return res.json();
		} else {
			const data = await res.json().catch(() => ({}));
			console.log(data);

			return {
				success: false,
				message: "something went wrong",
			};
		}
	});
};

export const apiLogin = async (username: string, password: string) => {
	return fetch(api.host + "/auth/login", {
		method: "POST",
		body: JSON.stringify({ username, password }),
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		mode: "cors",
	}).then(async (res) => {
		if (res.ok) {
			return res.json();
		} else {
			const data = await res.json().catch(() => ({}));
			if (data.message === "Unauthorized") {
				data.message = "one or more of your credentials is incorrect";
			}
			return {
				success: false,
				message: "something went wrong",
				...data,
			};
		}
	});
};

export const apiAuth = async () => {
	return fetch(api.host + "/auth", {
		credentials: "include",
		mode: "cors",
	}).then((res) => {
		if (res.ok) {
			return res.json();
		} else
			return {
				success: false,
				message: "something went wrong",
			};
	});
};
