import { getAllWorkspaces } from "@/features/workspace/queries/get-all-workspaces";
import WorkspacesItem from "./workspace-item";

type WorkspacesListProps = {
	promiseWorkspaces: ReturnType<typeof getAllWorkspaces>;
};

export default async function WorkspacesList({
	promiseWorkspaces,
}: WorkspacesListProps) {
	const myWorkspaces = await promiseWorkspaces;

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
