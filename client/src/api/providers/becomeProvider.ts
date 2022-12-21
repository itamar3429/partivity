import { api } from "../../config";
import { defaultErrorMessage } from "../constants";

export async function becomeProvider(firstName: string, lastName: string) {
	const res = await fetch(`${api.host}/become-provider`, {
		method: "post",
		...api.defOptions,
		headers: api.defHeaders,
		body: JSON.stringify({
			firstName,
			lastName,
		}),
	});
	if (res.ok) {
		return await res.json();
	} else {
		const data = await res.json().catch(() => ({}));
		return { success: false, message: defaultErrorMessage, ...data };
	}
}
