import { api } from "../../config";

export default async function getServices() {
	const res = await fetch(api.host + "/providers/services", {
		credentials: "include",
		mode: "cors",
	});
	if (res.ok) {
		const data = await res.json();
		return data;
	}
	return { success: false, message: "something went wrong" };
}
