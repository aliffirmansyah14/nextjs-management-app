import { cn } from "@/lib/utils";
import { requireSession } from "@/lib/auth/session";
import { Suspense } from "react";
import { getUserWorkspaces } from "@/features/workspace/queries/get-user-workpaces";
import AppSidebar from "./app-sidebar";
import AppHeader from "./app-header";
import WorkspacesSkeleton from "./sidebar/workspace-skeleton";
import WorkspacesList from "./sidebar/workspace-list";
import MobilenNav from "./mobile-nav";

type DasahboardLayout = React.ComponentPropsWithoutRef<"div">;

export default async function DasahboardLayout({
	className,
	children,
	...props
}: DasahboardLayout) {
	const session = await requireSession();

	const promiseWorkspaces = getUserWorkspaces(session.user.id);

	return (
		<div className={cn("min-h-dvh flex bg-muted", className)} {...props}>
			<AppSidebar>
				<Suspense fallback={<WorkspacesSkeleton />}>
					<WorkspacesList promiseWorkspaces={promiseWorkspaces} />
				</Suspense>
			</AppSidebar>

			<MobilenNav>
				<Suspense fallback={<WorkspacesSkeleton />}>
					<WorkspacesList promiseWorkspaces={promiseWorkspaces} />
				</Suspense>
			</MobilenNav>

			<main className="flex-1">
				<AppHeader />
				{children}
			</main>
		</div>
	);
}
