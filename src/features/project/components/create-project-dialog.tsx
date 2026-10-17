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

export default function CreateProjectDialog({
	workspaceId,
}: CreateProjectDialogProps) {
	const [isLoading, setIsloading] = useState(false);
	const { isOpen, type, closeModal } = useProjectModal();
	const isModalOpen = isOpen && !!workspaceId && type === "create";

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
					<DialogTitle>Buat Project</DialogTitle>
					<DialogDescription>
						Buat project baru untuk mengelompokkan project dan task Anda.
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
