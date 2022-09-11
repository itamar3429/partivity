import { api } from "../../config";

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
		if (data.success) {
			return data;
		}
	}
	return { success: false, message: "something went wrong" };
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
		return res.json();
	}
	return { success: false, message: "failed to upload image to the server" };
}

export async function deleteImages(imgId: number) {
	const res = await fetch(api.host + "/providers/image/delete/" + imgId, {
		...api.defOptions,
		method: "DELETE",
	});
	if (res.ok) {
		const data = await res.json();
		if (data.success) {
			return data;
		}
	}
	return { success: false, message: "something went wrong" };
}
