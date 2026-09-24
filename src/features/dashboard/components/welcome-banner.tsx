import { User } from "@/types/user";

const getGreeting = () => {
	const hour = new Date().getHours();
	if (hour < 12) return "Selamat pagi";
	if (hour < 15) return "Selamat siang";
	if (hour < 18) return "Selamat sore";

	return "Selamat malam";
};

export default function WelcomeBanner({ user }: { user: User }) {
	return (
		<div className="space-y-2">
			<h1 className="text-3xl font-semibold tracking-tight">
				{getGreeting()},
				<span className="capitalize"> {user?.name || "tanpa nama"}</span>
			</h1>
			<div className="text-muted-foreground tracking-tight">
				Berikut ini apa yang terjadi di project hari ini.
			</div>
		</div>
	);
}
