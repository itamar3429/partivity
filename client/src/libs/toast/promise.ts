import { toast, ToastOptions } from "react-toastify";
import { defaultErrorMessage } from "../../api/constants";

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
					return props.data || defaultErrorMessage;
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
