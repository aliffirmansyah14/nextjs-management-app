import WorkspacesItem from "./workspace-item";
import { getUserWorkspacesProjects } from "@/features/workspace/queries/get-user-workspaces-projects";

export type WorkspacesListProps = {
	promiseWorkspacesProjects: ReturnType<typeof getUserWorkspacesProjects>;
};

export default async function WorkspacesList({
	promiseWorkspacesProjects,
}: WorkspacesListProps) {
	const myWorkspaces = await promiseWorkspacesProjects;

	return (
		// harus dikasih h-full biar tahu heightnya agar bisa di overflow-auto
		<div className="flex flex-col gap-3 min-h-0 h-full">
			<div className="text-muted-foreground tracking-tight text-sm">
				Workspaces
			</div>
			{/* list workspace */}
			<div className="grid gap-2 overflow-y-auto">
				{myWorkspaces.map((w, i) => (
					<WorkspacesItem
						key={w.id}
						index={i}
						name={w.name}
						projects={w.projects.map(d => ({
							name: d.name,
							link: `/projects/${d.id}`,
						}))}
					/>
				))}
			</div>
		</div>
	);
}
