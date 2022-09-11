import { api } from "../../config";

export async function deleteService(serviceId: number) {
	const res = await fetch(`${api.host}/providers/service/${serviceId}`, {
		...api.defOptions,
		method: "delete",
	});
	if (res.ok) {
		const data = await res.json();
		return data;
	}
	return { success: false, message: "something went wrong" };
}
