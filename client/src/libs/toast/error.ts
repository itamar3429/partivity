import { toast, ToastOptions } from "react-toastify";

export function errorToast(
	message: string | string[],
	options: ToastOptions = {}
) {
	if (typeof message == "string")
		toast.error(message, {
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
			...options,
		});
	if (typeof message == "object") {
		message.forEach((message) => {
			errorToast(message, options);
		});
	}
}
