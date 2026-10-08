import { type ExternalToast, toast } from "sonner";

export function toastSuccess(message: string, options?: ExternalToast) {
	return toast.success(message, {
		position: "top-center",
		...options,
	});
}

export function toastError(message: string, options?: ExternalToast) {
	return toast.success(message, {
		position: "top-center",
		...options,
	});
}
