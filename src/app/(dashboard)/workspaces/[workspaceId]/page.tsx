import AppContainer from "@/components/layouts/app-container";
import CreateProjectDialog, {
	CreateProjectTriggerDialog,
} from "@/features/project/components/create-project-dialog";
import { DeleteProjectDialog } from "@/features/project/components/delete-project-dialog";
import UpdateProjectDialog from "@/features/project/components/update-project-dialog";
import FilterSkeleton from "@/features/workspace/components/filter-skeleton";
import WorkspaceHeader from "@/features/workspace/components/workspace-header";
import WorkspaceProjects from "@/features/workspace/components/workspace-projects";
import WorkspaceStats from "@/features/workspace/components/workspace-stats";
import WorkspaceStatsSkeleton from "@/features/workspace/components/workspace-stats-skeleton";
import { getWorkspaceById } from "@/features/workspace/queries/get-workspace-by-id";
import { getWorkspaceStats } from "@/features/workspace/queries/get-workspace-stats";
import { getCurrentUser } from "@/lib/auth/session";
import { SortByParams } from "@/types/params";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

type WorkspaceDetailPageProps = {
	params: Promise<{ workspaceId: string }>;
	searchParams: Promise<{ q?: string; sort?: SortByParams }>;
};

export default async function WorkspaceDetailPage({
	params,
	searchParams,
}: WorkspaceDetailPageProps) {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	const id = (await params).workspaceId;

	const workpace = await getWorkspaceById(id, user.id);

	if (!workpace) {
		notFound();
	}
	const promiseWorkspaceStats = getWorkspaceStats(id, user.id);

	return (
		<AppContainer>
			<WorkspaceHeader
				name={workpace.name}
				projectsCount={workpace.projects.length}
				description={workpace.description}
			/>
			<div className="mt-8 pb-4 md:pb-0 rounded-md bg-card md:bg-transparent shadow md:shadow-none space-y-1">
				<Suspense fallback={<WorkspaceStatsSkeleton />}>
					<WorkspaceStats promiseWorkspaceStats={promiseWorkspaceStats} />
				</Suspense>

				<CreateProjectTriggerDialog className="md:hidden flex w-[90%] mx-auto py-5" />
			</div>
			{/* projects */}
			<div className="py-6 space-y-2">
				<h2 className="hidden md:block text-xl font-semibold tracking-tight">
					Projects
				</h2>

				<Suspense fallback={<FilterSkeleton />}>
					<WorkspaceProjects
						searchParamsPromise={searchParams}
						userId={user.id}
						workspaceId={workpace.id}
					/>
				</Suspense>
			</div>

			{/* dialog form project */}
			<CreateProjectDialog workspaceId={id} />
			<UpdateProjectDialog workspaceId={id} />
			<DeleteProjectDialog workspaceId={id} />
		</AppContainer>
	);
}
