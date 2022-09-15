import { api } from "../../config";
import { defaultErrorMessage } from "../constants";

export async function getEvents() {
	const res = await fetch(
		`${api.host}/dashboard/events/pending`,
		api.defOptions
	);

	if (res.ok) {
		return await res.json();
	} else {
		const data = await res.json().catch(() => ({}));
		return { success: false, message: defaultErrorMessage, ...data };
	}
}
