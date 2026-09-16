import AuthCard from "@/features/auth/components/AuthCard";
import LoginForm from "@/features/auth/components/LoginForm";

export default async function LoginPage() {
	return (
		<AuthCard title="Masuk ke akun anda">
			<LoginForm />
		</AuthCard>
	);
}
