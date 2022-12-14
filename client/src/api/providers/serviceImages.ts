import { api } from "../../config";
import { defaultErrorMessage } from "../constants";

export async function getImages(serviceId: string): Promise<
	| {
			success: false;
			message: string;
	  }
	| {
			success: true;
			images: Record<string, any>[];
	  }
> {
	const res = await fetch(
		api.host + "/providers/service/images/" + serviceId,
		api.defOptions
	);
	if (res.ok) {
		const data = await res.json();
		return data;
	}
	const date = await res.json().catch(() => ({}));
	return { success: false, message: defaultErrorMessage, ...date };
}

export async function addServiceImage(
	fileContent: File,
	serviceId: number | string
) {
	const data = new FormData();
	data.append("file", fileContent, fileContent.name);

	const res = await fetch(`${api.host}/providers/service/image/${serviceId}`, {
		method: "POST",
		...api.defOptions,
		headers: {
			// "Content-Type": mimeType,
		},
		body: data,
	});
	if (res.ok) {
		return await res.json();
	}
	const date = await res.json().catch(() => ({}));
	return {
		success: false,
		message: "failed to upload image to the server",
		...date,
	};
}

export async function deleteImages(imgId: number) {
	const res = await fetch(api.host + "/providers/image/delete/" + imgId, {
		...api.defOptions,
		method: "DELETE",
	});
	if (res.ok) {
		const data = await res.json();
		return data;
	}
	const date = await res.json().catch(() => ({}));
	return { success: false, message: defaultErrorMessage, ...date };
}

export async function updatePrimaryImage(imgId: number, serviceId: number) {
	const res = await fetch(
		`${api.host}/providers/primary/image/${serviceId}/${imgId}`,
		{
			...api.defOptions,
			method: "PUT",
		}
	);
	if (res.ok) {
		const data = await res.json();
		return data;
	}
	const date = await res.json().catch(() => ({}));
	return { success: false, message: defaultErrorMessage, ...date };
}
