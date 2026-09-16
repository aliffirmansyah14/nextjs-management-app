import AuthCard from "@/features/auth/components/AuthCard";
import SignUpForm from "@/features/auth/components/SignUpForm";

export default async function RegisterPage() {
	return (
		<AuthCard title="Registrasi akun">
			<SignUpForm />
		</AuthCard>
	);
}
