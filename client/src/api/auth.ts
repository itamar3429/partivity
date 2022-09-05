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

export const apiLogin = async (username: string, password: string) => {
	return fetch(api.host + "/auth/login", {
		method: "POST",
		body: JSON.stringify({ username, password }),
		headers: {
			"Content-Type": "application/json",
		},
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
