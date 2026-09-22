import { cn } from "@/lib/utils";
import { requireSession } from "@/lib/auth/session";
import WorkspacesList from "./workspace-list";
import { Suspense } from "react";
import { getAllWorkspaces } from "@/features/workspace/queries/get-all-workspaces";
import AppSidebar from "./app-sidebar";
import WorkspacesSkeleton from "./workspace-skeleton";
import AppHeader from "./app-header";

type DasahboardLayout = React.ComponentPropsWithoutRef<"div">;

export default async function DasahboardLayout({
	className,
	children,
	...props
}: DasahboardLayout) {
	const session = await requireSession();

	const promiseWorkspaces = getAllWorkspaces(session.user.id);

	return (
		<div className={cn("min-h-dvh flex bg-muted", className)} {...props}>
			<AppSidebar
				workspacesList={
					<Suspense fallback={<WorkspacesSkeleton />}>
						<WorkspacesList promiseWorkspaces={promiseWorkspaces} />
					</Suspense>
				}
			/>

			<main className="flex-1">
				<AppHeader />
				{children}
			</main>
		</div>
	);
}
