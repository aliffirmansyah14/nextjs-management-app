"use client";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { useWorkspaceModal } from "../stores/use-workspace-modal";

type WorkspaceMenuProps = {
	workspaceId: string;
	workspaceName: string;
};

export default function WorkspaceMenu({
	workspaceId,
	workspaceName,
}: WorkspaceMenuProps) {
	const openModal = useWorkspaceModal(state => state.openModal);
	const data = { id: workspaceId, name: workspaceName };

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button variant="ghost" size="icon" className="shrink-0">
						<EllipsisVertical className="size-4 text-muted-foreground" />
					</Button>
				}
			/>
			<DropdownMenuContent>
				<DropdownMenuItem onClick={() => openModal("edit", data)}>
					Edit
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => openModal("delete", data)}
					variant="destructive"
				>
					Hapus
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
