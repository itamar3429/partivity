import { services } from "../../components/main/providers/AddService";
import { api } from "../../config";

type TData = {
	service: typeof services[number];

	capacity?: number | undefined;

	serviceType: string;

	title: string;

	description: string;

	country?: string | undefined;

	city?: string | undefined;

	address?: string | undefined;

	name?: string | undefined;
};

export default async function editService(data: TData, serviceId: number) {
	const res = await fetch(`${api.host}/providers/service/${serviceId}`, {
		method: "put",
		headers: {
			"Content-Type": "application/json",
		},
		mode: "cors",
		credentials: "include",
		body: JSON.stringify(data),
	});
	if (res.ok) {
		const data = await res.json();
		return data;
	}
	return {
		success: false,
		message: "something went wrong",
	};
}
