import StatList from "@/features/dashboard/components/stat-list";
import StatSkeleton from "@/features/dashboard/components/stat-skeleton";
import WelcomeBanner from "@/features/dashboard/components/welcome-banner";
import { getCurrentUser } from "@/lib/auth/session";
import { Suspense } from "react";

export default async function DashboardPage() {
	const user = await getCurrentUser();

	return (
		<main className="px-6 py-4">
			<WelcomeBanner user={user} />
			<div className="mt-5">
				<Suspense fallback={<StatSkeleton size={4} />}>
					<StatList user={user} />
				</Suspense>
			</div>
		</main>
	);
}
