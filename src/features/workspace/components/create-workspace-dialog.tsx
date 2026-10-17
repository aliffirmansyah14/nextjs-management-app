"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import { useWorkspaceModal } from "@//features/workspace/stores/use-workspace-modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import WorkspaceForm from "./workspace-form";
import { useState } from "react";

export function CreateWorkspaceDialog() {
	const [isLoading, setIsloading] = useState(false);
	const { isOpen, type, closeModal } = useWorkspaceModal();
	const isModalOpen = isOpen && type === "create";

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
					<DialogTitle>Buat Workspace</DialogTitle>
					<DialogDescription>
						Buat workspace baru untuk mengelompokkan project dan task Anda.
					</DialogDescription>
				</DialogHeader>
				<WorkspaceForm onLoadingChange={setIsloading} />
			</DialogContent>
		</Dialog>
	);
}

export function CreateWorkspaceDialogTrigger() {
	const openModal = useWorkspaceModal(state => state.openModal);

	const handleClick = () => {
		openModal("create");
	};

	return (
		<Button
			onClick={handleClick}
			type="button"
			className="[&_span]:hidden md:[&_span]:inline"
		>
			<Plus className="size-4" />
			<span> Buat Workspaces baru </span>
		</Button>
	);
}
