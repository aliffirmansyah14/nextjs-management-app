import AuthLayout from "@/features/auth/components/AuthLayout";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function layout({
	children,
}: {
	children?: React.ReactNode;
}) {
	const session = await getSession();

	if (session) {
		redirect("/dashboard");
	}
	return <AuthLayout>{children}</AuthLayout>;
}
