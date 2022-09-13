import { api } from "../../config";

type TDetails = {
	name: string;
	title: string;
	description: string;
	date: Date;
};

type TEventService = {
	id: number;
	event_id: number;
	service_id: number;
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
