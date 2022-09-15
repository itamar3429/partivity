import { api } from "../../config";
import { defaultErrorMessage } from "../constants";
import { services } from "./types";

type TData = {
	service: typeof services[number];

	capacity?: number | undefined;

	service_type: string;

	title: string;

	description: string;

	country?: string | undefined;

	city?: string | undefined;

	address?: string | undefined;

	name?: string | undefined;
};

export default async function addService(data: TData) {
	const res = await fetch(api.host + "/providers/service", {
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
		mode: "cors",
		credentials: "include",
		body: JSON.stringify(data),
	});
	if (res.ok) {
		const data = await res.json();
		return data;
	} else {
		const date = await res.json().catch(() => ({}));

		return {
			success: false,
			message: defaultErrorMessage,
			...date,
		};
	}
}
