import { toast, ToastOptions } from "react-toastify";

export function infoToast(message: string, options: ToastOptions = {}) {
	toast.info(message, {
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "colored",
		...options,
	});
}
