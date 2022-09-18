import { api } from "../../config";
import { defaultErrorMessage } from "../constants";

export async function getInviteData(eventId: number) {
	const res = await fetch(
		`${api.host}/public/invite/${eventId}`,
		api.defOptions
	);

	if (res.ok) return await res.json();
	else {
		const data = await res.json().catch(() => ({}));

		return { success: false, message: defaultErrorMessage, ...data };
	}
}
