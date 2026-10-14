import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

type ButtonTriggerCreateProjectDialogProps =
	React.ComponentPropsWithoutRef<"button">;

export default function ButtonTriggerCreateProjectDialog({
	className,
	...props
}: ButtonTriggerCreateProjectDialogProps) {
	return (
		<Button
			type="button"
			className={cn("hidden md:flex py-4 px-3", className)}
			{...props}
		>
			<Plus className="size-4" />
			<span> Buat Project baru </span>
		</Button>
	);
}
