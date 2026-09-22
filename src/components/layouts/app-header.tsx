import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { UserNav } from "./user-nav";

export default function AppHeader() {
	return (
		<header className="bg-background h-16 py-3">
			<div className="flex items-center gap-8 px-6">
				<div className="flex-1 max-w-2xl relative bg-muted">
					<Search className="absolute size-4 top-1/2 -translate-1/2 left-5 text-muted-foreground" />
					<Input
						type="search"
						name="search"
						className="pl-9 h-10 rounded-lg text-muted-foreground focus-visible:border-border focus-visible:ring-border"
						placeholder="Search projects, task, or people..."
					/>
				</div>
				<div className="ms-auto flex items-center gap-3">
					<UserNav />
				</div>
			</div>
		</header>
	);
}
