import { toast, ToastOptions } from "react-toastify";

export function promiseToast<T>(
	promise: Promise<T>,
	pending: string,
	success: string,
	options: ToastOptions = {}
) {
	toast.promise(
		promise,
		{
			pending,
			success,
			error: {
				render(props) {
					return props.data || "something went wrong";
				},
			},
		},
		{
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
			...options,
		}
	);
}
