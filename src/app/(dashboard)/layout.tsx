import DasahboardLayout from "@/components/layouts/dashboard-layout";

export default async function layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <DasahboardLayout>{children}</DasahboardLayout>;
}
