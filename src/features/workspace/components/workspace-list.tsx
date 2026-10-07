import { getUserWorkspaces } from "@/features/workspace/queries/get-user-workpaces";
import WorkspaceCard from "./workspace-card";

export type WorkspacesListProps = {
	promiseUserWorkspaces: ReturnType<typeof getUserWorkspaces>;
};

export default async function WorkspacesList({
	promiseUserWorkspaces,
}: WorkspacesListProps) {
	const myWorkspaces = await promiseUserWorkspaces;

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
