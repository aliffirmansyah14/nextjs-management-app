import { Button } from "@/components/ui/button";
import { useMobileNav } from "@/features/dashboard/stores/use-mobile-nav";
import { X } from "lucide-react";

export default function ButtonCloseMobileNav() {
	const closeNav = useMobileNav(state => state.closeNav);
	return (
		<Button
			onClick={closeNav}
			type="button"
			variant="ghost"
			className={"rounded"}
			size="icon"
		>
			<X className="size-6" />
		</Button>
	);
}
