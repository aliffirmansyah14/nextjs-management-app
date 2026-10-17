import WorkspaceIcon from "@/components/shared/workspace-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn, styleColorWorkspace } from "@/lib/utils";
import { CheckSquare, Ellipsis } from "lucide-react";

type ProjectsCardProps = {
	id: string;
	name: string;
	task: { name: string }[];
	description?: string;
};

export default function ProjectCard({
	id,
	name,
	task,
	description,
}: ProjectsCardProps) {
	const styleKey = Math.floor(Math.random() * styleColorWorkspace.length);
	return (
		<Card className="rounded-none rounde-xl">
			<CardContent
				className={cn(
					"grid gap-x-3 gap-y-2 md:gap-y-4",
					// MOBILE
					"grid-cols-[auto_1fr_auto]",
					"[grid-template-areas:'icon_name_menu''icon_informasi_menu']",
					// DESKTOP
					"md:[grid-template-areas:'icon_name_menu''deskripsi_deskripsi_deskripsi''informasi_informasi_informasi']",
				)}
			>
				{/* 1. Icon */}
				<div className="[grid-area:icon] self-start">
					<WorkspaceIcon
						styleIcon={`${styleColorWorkspace[styleKey].base} size-8 text-base rounded-lg`}
						text={"Website design"}
					/>
				</div>

				{/* 2. Name */}
				<div className="[grid-area:name] self-center">
					<div className="font-semibold text-sm md:text-base capitalize tracking-tight leading-none">
						{name}
					</div>
				</div>

				{/* 3. Menu */}
				<div className="[grid-area:menu] self-start">
					<Button variant="ghost" size="icon" className="size-8">
						<Ellipsis className="size-4 text-muted-foreground" />
					</Button>
				</div>

				{/* 4. Informasi */}
				<div className="[grid-area:informasi] flex items-center gap-2">
					<CheckSquare className="size-4 hidden md:block text-muted-foreground" />
					<div className="text-xs md:text-sm text-muted-foreground">
						<span>{task.length}</span>
						<span className="ms-1">tasks</span>
					</div>
				</div>

				{/* 5. Deskripsi (Sembunyikan di mobile, tampilkan di desktop) */}
				<div className="[grid-area:deskripsi] hidden md:block mt-1">
					<p className="text-muted-foreground tracking-tight text-xs">
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique,
						nemo!
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
