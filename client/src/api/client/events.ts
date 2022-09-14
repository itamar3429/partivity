import { api } from "../../config";
import { services } from "../providers/types";

type TDetails = {
	name: string;
	title: string;
	description: string;
	date: Date;
};

export type TEventService = {
	// id: number;
	// event_id: number;
	// service_id: number;
};

export type TServiceOptions = {
	title: string;
	country: string;
	capacity: number;
	city: string;
	id: number;
	service: typeof services[number];
	name: string;
	service_type: string;
};

export async function addEvent(details: TDetails) {
	const res = await fetch(`${api.host}/event`, {
		...api.defOptions,
		headers: api.defHeaders,
		method: "post",
		body: JSON.stringify(details),
	});
	if (res.ok) {
		return await res.json();
	} else return { success: false, message: "something went wrong" };
}

export async function getEvent(id: number) {
	const res = await fetch(`${api.host}/event/${id}`, api.defOptions);
	if (res.ok) {
		return await res.json();
	} else return { success: false, message: "something went wrong" };
}

export async function getEvents() {
	const res = await fetch(`${api.host}/events`, api.defOptions);
	if (res.ok) {
		return await res.json();
	} else return { success: false, message: "something went wrong" };
}

export async function updateEvent(id: number, details: TDetails) {
	const res = await fetch(`${api.host}/event/${id}`, {
		...api.defOptions,
		headers: api.defHeaders,
		method: "put",
		body: JSON.stringify(details),
	});
	if (res.ok) {
		return await res.json();
	} else return { success: false, message: "something went wrong" };
}

export async function getServicesOptions(
	date: Date
): Promise<
	| { success: true; services: TServiceOptions[] }
	| { success: false; message: string }
> {
	const res = await fetch(
		`${api.host}/service-options?` +
			new URLSearchParams([["date", date.toISOString()]]).toString(),
		api.defOptions
	);
	if (res.ok) {
		return await res.json();
	} else return { success: false, message: "something went wrong" };
}

export async function getAvailableDates(): Promise<
	{ success: true; dates: string[] } | { success: false; message: string }
> {
	const res = await fetch(`${api.host}/dates`, api.defOptions);
	if (res.ok) {
		return await res.json();
	} else return { success: false, message: "something went wrong" };
}

export async function addEventService(eventService: {
	eventId: number;
	scheduleId: number;
}): Promise<
	{ success: true; services: any[] } | { success: false; message: string }
> {
	const res = await fetch(`${api.host}/event/service`, {
		...api.defOptions,

		method: "POST",
		body: JSON.stringify(eventService),
		headers: api.defHeaders,
	});
	if (res.ok) {
		return await res.json();
	} else return { success: false, message: "something went wrong" };
}

export async function removeEventService(
	eventServiceId: number
): Promise<
	{ success: true; [key: string]: any } | { success: false; message: string }
> {
	const res = await fetch(`${api.host}/event/service/${eventServiceId}`, {
		...api.defOptions,

		method: "DELETE",
	});
	if (res.ok) {
		return await res.json();
	} else return { success: false, message: "something went wrong" };
}

export async function bookEvent(eventId: number) {
	const res = await fetch(`${api.host}/event/book/${eventId}`, {
		...api.defOptions,
		method: "PUT",
	});
	if (res.ok) return await res.json();
	return { success: false, message: "something went wrong" };
}
