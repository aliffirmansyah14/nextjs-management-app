"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

import { useState } from "react";
import { useProjectModal } from "@/features/project/store/use-project-modal";
import ProjectForm from "@/features/project/components/project-form";

type CreateProjectDialogProps = {
	workspaceId: string;
};

export default function UpdateProjectDialog({
	workspaceId,
}: CreateProjectDialogProps) {
	const [isLoading, setIsloading] = useState(false);
	const { isOpen, type, closeModal, data } = useProjectModal();
	const isModalOpen = isOpen && !!workspaceId && type === "edit";

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
					<DialogTitle>Edit Project</DialogTitle>
					<DialogDescription>
						Ubah nama workspace <strong>{data?.name}</strong> di bawah ini.
					</DialogDescription>
				</DialogHeader>
				<ProjectForm workspaceId={workspaceId} onLoadingChange={setIsloading} />
			</DialogContent>
		</Dialog>
	);
}

type CreateProjectDialogTriggerProps = React.ComponentPropsWithoutRef<"button">;

export function CreateProjectTriggerDialog({
	className,
	...props
}: CreateProjectDialogTriggerProps) {
	const openModal = useProjectModal(state => state.openModal);

	return (
		<Button
			type="button"
			className={cn("hidden md:flex py-4 px-3", className)}
			onClick={() => openModal("create")}
			{...props}
		>
			<Plus className="size-4" />
			<span> Buat Project baru </span>
		</Button>
	);
}
