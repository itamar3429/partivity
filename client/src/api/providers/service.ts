import { api } from "../../config";
import { defaultErrorMessage } from "../constants";
import { services } from "./types";

export type TService = {
	id: number;
	service: typeof services[number];
	service_type: string;
	country: string | null;
	city: string | null;
	address: string | null;
	capacity: number | null;
	title: string;
	description: string;
	name?: string;
	user_id: number;
	images: string[] | [null];
};
export default async function getServices() {
	const res = await fetch(api.host + "/providers/services", api.defOptions);
	if (res.ok) {
		const data = await res.json();
		return data;
	}
	return { success: false, message: defaultErrorMessage };
}

export async function getService(serviceId: number) {
	const res = await fetch(
		`${api.host}/providers/service/${serviceId}`,
		api.defOptions
	);
	if (res.ok) {
		const data = await res.json();
		return data;
	}
	const date = await res.json().catch(() => ({}));
	return { success: false, message: defaultErrorMessage, ...date };
}

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

export async function addService(data: TData) {
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

export async function deleteService(serviceId: number) {
	const res = await fetch(`${api.host}/providers/service/${serviceId}`, {
		...api.defOptions,
		method: "delete",
	});
	if (res.ok) {
		const data = await res.json();
		return data;
	}
	const date = await res.json().catch(() => ({}));
	return { success: false, message: defaultErrorMessage, ...date };
}

export async function editService(data: TData, serviceId: number) {
	const res = await fetch(`${api.host}/providers/service/${serviceId}`, {
		method: "put",
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
	}
	const date = await res.json().catch(() => ({}));
	return {
		success: false,
		message: defaultErrorMessage,
		...date,
	};
}
