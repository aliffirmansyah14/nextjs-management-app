"use client";
import WorkspaceIcon from "@/components/shared/workspace-icon";
import { Card, CardContent } from "@/components/ui/card";
import { styleColorWorkspace } from "@/lib/utils";
import Link from "next/link";
import WorkspaceMenu from "./workspace-menu";

type WorkspaceCardProps = {
	id: string;
	index: number;
	name: string;
	countProjects: number;
};

export default function WorkspaceCard({
	index,
	name,
	id,
	countProjects,
}: WorkspaceCardProps) {
	return (
		<Card className="hover:bg-card/30 transition-colors">
			<CardContent className="flex justify-between items-center">
				{/* link ke workspace/id */}
				<Link
					href={`/workspaces/${id}`}
					className="flex gap-4 items-center flex-1 min-w-0 pr-2"
				>
					<WorkspaceIcon
						styleIcon={`${styleColorWorkspace[index % styleColorWorkspace.length].base} rounded-full size-10 text-base`}
						text={name.charAt(0).toUpperCase()}
					/>
					<div className="space-y-1 min-w-0">
						<div className="font-semibold text-slate-600 truncate">{name}</div>
						<div className="text-muted-foreground text-xs">
							{countProjects} projects
						</div>
					</div>
				</Link>

				{/* Tombol Menu di luar tag Link */}
				<WorkspaceMenu workspaceId={id} workspaceName={name} />
			</CardContent>
		</Card>
	);
}
