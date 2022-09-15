import { toast, ToastOptions } from "react-toastify";

export function successToast(message: string, options: ToastOptions = {}) {
	toast.success(message, {
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
