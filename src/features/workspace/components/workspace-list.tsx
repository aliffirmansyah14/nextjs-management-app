import { getUserWorkspaces } from "@/features/workspace/queries/get-user-workpaces";
import WorkspaceCard from "./workspace-card";
import EmptyState from "@/components/shared/empty-state";
import { Inbox } from "lucide-react";
import { Card } from "@/components/ui/card";

export type WorkspacesListProps = {
	promiseUserWorkspaces: ReturnType<typeof getUserWorkspaces>;
};

export default async function WorkspacesList({
	promiseUserWorkspaces,
}: WorkspacesListProps) {
	const myWorkspaces = await promiseUserWorkspaces;

	if (myWorkspaces.length === 0) {
		return (
			<Card>
				<EmptyState
					icon={<Inbox className="size-12 text-primary" />}
					title="Belum ada workspace"
					description="Buat workspace pertama untuk mulai mengelola project."
				/>
			</Card>
		);
	}

	return (
		<div className="grid md:grid-cols-2 gap-2">
			{myWorkspaces.map((workspace, i) => (
				<WorkspaceCard
					key={workspace.id}
					index={i}
					id={workspace.id}
					name={workspace.name}
					countProjects={workspace._count.projects}
				/>
			))}
		</div>
	);
}
