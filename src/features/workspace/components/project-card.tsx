import WorkspaceIcon from "@/components/shared/workspace-icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProjectMenu from "@/features/project/components/project-menu";
import { cn, styleColorWorkspace } from "@/lib/utils";
import { CheckSquare, Ellipsis, EllipsisIcon } from "lucide-react";

type ProjectsCardProps = {
	id: string;
	workspaceId: string;
	name: string;
	task: { name: string }[];
	description?: string | null;
};

export default function ProjectCard({
	id,
	workspaceId,
	name,
	task,
	description,
}: ProjectsCardProps) {
	const styleKey = Math.floor(Math.random() * styleColorWorkspace.length);
	return (
		<Card className="rounded-none md:rounded-xl">
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
						text={name}
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
					<ProjectMenu
						id={id}
						projectName={name}
						projectDescription={description}
						renderTrigger={
							<Button variant="ghost" size="icon" className="shrink-0">
								<EllipsisIcon className="size-4 text-muted-foreground" />
							</Button>
						}
					/>
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
						{description ?? "Belum ada deskripsi project"}
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
