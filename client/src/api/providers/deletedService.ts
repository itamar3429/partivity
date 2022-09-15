import { api } from "../../config";
import { defaultErrorMessage } from "../constants";

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
