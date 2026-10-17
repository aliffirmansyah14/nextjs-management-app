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
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { toastError, toastSuccess } from "@/lib/toast";
import { useProjectModal } from "@/features/project/store/use-project-modal";
import { deleteProjectAction } from "@/features/project/actions/delete-project";

type DeleteProjectDialogProps = {
	workspaceId: string;
};

export function DeleteProjectDialog({ workspaceId }: DeleteProjectDialogProps) {
	const { isOpen, type, data, closeModal } = useProjectModal();
	const isModalOpen = isOpen && type === "delete";
	const [isLoading, setIsloading] = useState(false);

	const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		if (!data) return;

		setIsloading(true);
		try {
			const response = await deleteProjectAction(data.id, workspaceId);

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
					<AlertDialogTitle>Hapus Project?</AlertDialogTitle>
					<AlertDialogDescription>
						Tindakan ini tidak dapat dibatalkan. Project
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
