import { api } from "../../config";

export type TSchedule = {
	start: Date;
	end: Date;
	service_id: number;
	title: string;
	price: number;
};

export async function getSchedule(serviceId: number) {
	const res = await fetch(
		`${api.host}/providers/schedule/${serviceId}`,
		api.defOptions
	);
	if (res.ok) {
		return await res.json();
	}
	return { success: false, message: "something went wrong" };
}

export async function addSchedules(serviceId: number, schedules: TSchedule[]) {
	const res = await fetch(`${api.host}/providers/schedule/${serviceId}`, {
		...api.defOptions,
		body: JSON.stringify(schedules),
		method: "post",
		headers: api.defHeaders,
	});
	if (res.ok) {
		return await res.json();
	}
	return { success: false, message: "something went wrong" };
}

export async function editSchedules(id: number, schedule: Partial<TSchedule>) {
	const res = await fetch(`${api.host}/providers/schedule/${id}`, {
		...api.defOptions,
		body: JSON.stringify(schedule),
		method: "put",
		headers: api.defHeaders,
	});
	if (res.ok) {
		return await res.json();
	}
	return { success: false, message: "something went wrong" };
}

export async function deleteSchedule(id: number) {
	const res = await fetch(`${api.host}/providers/schedule/${id}`, {
		...api.defOptions,
		method: "delete",
		headers: api.defHeaders,
	});
	if (res.ok) {
		return await res.json();
	}
	return { success: false, message: "something went wrong" };
}
