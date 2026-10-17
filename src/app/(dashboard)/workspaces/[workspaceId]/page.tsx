import AppContainer from "@/components/layouts/app-container";
import FilterSearchInput from "@/components/shared/filter-search-input";
import FilterSelect from "@/components/shared/filter-select";
import FilterTabs from "@/components/shared/filter-tabs";
import ButtonTriggerCreateProjectDialog from "@/features/workspace/components/button-trigger-create-project-dialog";
import FilterSkeleton from "@/features/workspace/components/filter-skeleton";
import ProjectList from "@/features/workspace/components/project-list";
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

				<ButtonTriggerCreateProjectDialog className="md:hidden flex w-[90%] mx-auto py-5" />
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
		</AppContainer>
	);
}
