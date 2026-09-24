import DashboardCard from "@/features/dashboard/components/dashboard-card";
import RecentList from "@/features/dashboard/components/recent-list";
import RecentSkeleton from "@/features/dashboard/components/recent-skeleton";
import StatList from "@/features/dashboard/components/stat-list";
import StatSkeleton from "@/features/dashboard/components/stat-skeleton";
import WelcomeBanner from "@/features/dashboard/components/welcome-banner";
import { getCurrentUser } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function DashboardPage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<main className="px-6 py-4">
			{/* ucapan selamat datang */}
			<WelcomeBanner user={user} />

			<div className="mt-5">
				{/* daftar statisik data */}
				<Suspense fallback={<StatSkeleton size={4} />}>
					<StatList user={user} />
				</Suspense>
			</div>

			{/* daftar data terbaru */}
			<div className="mt-4 ">
				<Suspense fallback={<RecentSkeleton />}>
					<RecentList user={user} />
				</Suspense>

				{/* table data my task */}
				<div className="mt-4">
					<DashboardCard title="My Task" actionUrl="/tasks"></DashboardCard>
				</div>
			</div>
		</main>
	);
}
