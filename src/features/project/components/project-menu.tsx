"use client";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, EllipsisIcon, Trash } from "lucide-react";
import { useProjectModal } from "@/features/project/store/use-project-modal";
import { JSXElementConstructor, ReactElement } from "react";
import { ComponentRenderFn, HTMLProps, MenuTriggerState } from "@base-ui/react";

type ProjectMenu = {
	id: string;
	projectName: string;
	projectDescription?: string | null;
	renderTrigger:
		| ReactElement<unknown, string | JSXElementConstructor<any>>
		| ComponentRenderFn<HTMLProps, MenuTriggerState>;
};

export default function ProjectMenu({
	id,
	projectName,
	projectDescription,
	renderTrigger,
}: ProjectMenu) {
	const openModal = useProjectModal(state => state.openModal);
	const data = {
		id,
		name: projectName,
		description: projectDescription,
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger render={renderTrigger} />
			<DropdownMenuContent>
				<DropdownMenuItem
					className="gap-4"
					onClick={() => openModal("edit", data)}
				>
					<Edit /> Edit
				</DropdownMenuItem>
				<DropdownMenuItem
					className="gap-4"
					onClick={() => openModal("delete", data)}
					variant="destructive"
				>
					<Trash />
					Hapus
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
