import { api } from "../../config";

export default async function getServices() {
	const res = await fetch(api.host + "/providers/services", api.defOptions);
	if (res.ok) {
		const data = await res.json();
		return data;
	}
	return { success: false, message: "something went wrong" };
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
	return { success: false, message: "something went wrong" };
}
