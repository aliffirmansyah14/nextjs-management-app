import AppContainer from "@/components/layouts/app-container";
import { AppPageHeader } from "@/components/layouts/app-page-header";
import { Button } from "@/components/ui/button";
import { CreateWorkspaceDialogTrigger } from "@/features/workspace/components/create-workspace-dialog";
import { WorkspaceDialogProvider } from "@/features/workspace/components/workspace-dialog-provider";
import WorkspacesList from "@/features/workspace/components/workspace-list";
import { getUserWorkspaces } from "@/features/workspace/queries/get-user-workpaces";
import { getCurrentUser } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function WorkspacesPage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	const promiseUserWorkspaces = getUserWorkspaces(user.id);

	return (
		<AppContainer clasName="md:py-6">
			<AppPageHeader
				title="Workspaces"
				description="Kelola dan pantau semua proyek aktif dalam workspace Anda."
				actions={<CreateWorkspaceDialogTrigger />}
			/>
			{/* list */}
			<div>
				<Suspense fallback={<div>loading...</div>}>
					<WorkspacesList promiseUserWorkspaces={promiseUserWorkspaces} />
				</Suspense>
			</div>

			{/* provider  workspace dialog  */}
			<WorkspaceDialogProvider />
		</AppContainer>
	);
}
