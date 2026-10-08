"use client";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import { useWorkspaceModal } from "@//features/workspace/stores/use-workspace-modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import WorkspaceForm from "./workspace-form";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export function UpdateWorkspaceDialog() {
	const [isLoading, setIsloading] = useState(false);
	const { isOpen, type, closeModal, data } = useWorkspaceModal();
	const isModalOpen = isOpen && type === "edit";

	return (
		<Dialog
			open={isModalOpen}
			onOpenChange={open => {
				if (!open && !isLoading) {
					closeModal();
				}
			}}
		>
			<DialogContent className="md:max-w-sm">
				<DialogHeader>
					<DialogTitle>Edit Workspace</DialogTitle>
					<DialogDescription>
						Ubah nama workspace <strong>{data?.name}</strong> di bawah ini.
					</DialogDescription>
				</DialogHeader>
				<WorkspaceForm onLoadingChange={setIsloading} />
			</DialogContent>
		</Dialog>
	);
}
