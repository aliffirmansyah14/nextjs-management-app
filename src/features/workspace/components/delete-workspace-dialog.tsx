"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useWorkspaceModal } from "../stores/use-workspace-modal";
import { useState } from "react";
import { deleteWorkspaceAction } from "../actions/delete-workspace";
import { Spinner } from "@/components/ui/spinner";
import { toastError, toastSuccess } from "@/lib/toast";

export function DeleteWorkspaceDialog() {
	const { isOpen, type, data, closeModal } = useWorkspaceModal();
	const isModalOpen = isOpen && type === "delete";
	const [isLoading, setIsloading] = useState(false);

	const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		if (!data) return;

		setIsloading(true);
		try {
			const response = await deleteWorkspaceAction(data.id);

			if (!response.success) {
				toastError(response.message);
			}

			toastSuccess(response.message);
			closeModal();
		} finally {
			setIsloading(false);
		}
	};

	return (
		<AlertDialog
			open={isModalOpen}
			onOpenChange={open => {
				if (!open && !isLoading) {
					closeModal();
				}
			}}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Hapus Workspace?</AlertDialogTitle>
					<AlertDialogDescription>
						Tindakan ini tidak dapat dibatalkan. Workspace{" "}
						<strong>{data?.name}</strong> akan dihapus permanen.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isLoading} aria-disabled={isLoading}>
						Batal
					</AlertDialogCancel>
					<AlertDialogAction
						disabled={isLoading}
						aria-disabled={isLoading}
						variant="destructive"
						onClick={handleDelete}
					>
						{isLoading ? (
							<>
								<Spinner /> <span>Menghapus...</span>
							</>
						) : (
							"Hapus"
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
