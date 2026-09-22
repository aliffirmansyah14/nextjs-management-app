import { User } from "@/types/user";

export default function WelcomeBanner({ user }: { user: User | null }) {
	return (
		<div className="space-y-2">
			<h1 className="text-3xl font-semibold tracking-tight">
				Selamat pagi,{" "}
				<span className="capitalize"> {user?.name || "tanpa nama"}</span>
			</h1>
			<div className="text-muted-foreground tracking-tight">
				Berikut ini apa yang terjadi di project hari ini.
			</div>
		</div>
	);
}
