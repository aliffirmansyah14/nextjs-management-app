import DasahboardLayout from "@/features/dashboard/components/DashboardLayout";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getSession();

	if (!session) {
		redirect("/login");
	}

	return <DasahboardLayout>{children}</DasahboardLayout>;
}
