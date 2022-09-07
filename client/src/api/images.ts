export function getExtension(filename: string): string {
	filename = filename.toLowerCase();
	const extensionRegExp = /(?:\.([^.]+))?$/;
	const extension: string = extensionRegExp.exec(filename)![1];
	if (extension) {
		return extension;
	} else {
		if (filename !== "") {
			return filename;
		} else {
			return "";
		}
	}
}

export function getMimeType(filename: string): string {
	switch (getExtension(filename)) {
		case "jpg":
		case "jpeg":
			return "image/jpeg";
		case "png":
			return "image/png";
		case "gif":
			return "image/gif";
		case "ico":
			return "image/x-icon";
		case "webp":
			return "image/webp";
		default:
			return "text/plain;charset=utf-8";
	}
}

export function formatBytes(bytes: number, decimals = 2) {
	if (bytes === 0) return "0 Bytes";

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export async function getFileData(file: File) {
	try {
		const mimeType: string = getMimeType(file.name);
		// const fileContent: Uint8Array = (await getFileContent(file))!;
		const filename = file.name;
		const extension = getExtension(filename);
		return {
			extension,
			mimeType,
			// fileContent,
			filename,
			success: true as const,
		};
	} catch (err) {
		return { success: false as const };
	}
}
export async function getFileContent(
	file: File
): Promise<Uint8Array | undefined> {
	return new Promise((res, rej) => {
		const reader = new FileReader();
		reader.readAsArrayBuffer(file);
		reader.onload = () => {
			const binary = new Uint8Array(reader.result as ArrayBuffer);
			res(binary);
		};
		reader.onerror = () => {
			rej();
		};
	});
}
