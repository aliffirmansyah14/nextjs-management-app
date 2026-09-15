import AuthLayout from "@/features/auth/components/AuthLayout";

export default function layout({ children }: { children?: React.ReactNode }) {
	return <AuthLayout>{children}</AuthLayout>;
}
