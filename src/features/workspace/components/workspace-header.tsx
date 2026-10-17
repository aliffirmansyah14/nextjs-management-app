import WorkspaceIcon from "@/components/shared/workspace-icon";
import { styleColorWorkspace } from "@/lib/utils";
import { ArrowLeft, Folder } from "lucide-react";
import Link from "next/link";
import { CreateProjectTriggerDialog } from "@/features/project/components/create-project-dialog";

type WorkspaceHeaderProps = {
	name: string;
	description?: string | null;
	projectsCount: number;
};

export default function WorkspaceHeader({
	name,
	description,
	projectsCount,
}: WorkspaceHeaderProps) {
	return (
		<div className="w-full flex flex-row md:flex-col gap-3 items-start">
			{/* naavigasi ke workspaces */}
			<Link
				href="/workspaces"
				className="flex items-center pt-1 md:pt-0 gap-2 text-sm text-muted-foreground hover:text-black"
			>
				<ArrowLeft className="size-4" />
				<span className="hidden md:block text-xs">Kembali ke workspaces</span>
			</Link>

			<div className="w-full flex justify-between">
				<div className="flex gap-2">
					<WorkspaceIcon
						styleIcon={`${styleColorWorkspace[1].base} size-20 text-5xl rounded-3xl`}
						text={name}
						className="hidden md:block rounded-4xl bg-zinc-200 p-1.5 shadow overflow-hidden"
					/>

					{/* detail workspace*/}
					<div className="flex flex-col gap-2">
						{/* nama  */}
						<h1 className="text-base md:text-xl font-semibold tracking-tight">
							{name}
						</h1>
						{/* deskripsi */}
						<div className="text-muted-foreground text-xs md:text-sm">
							{description || "belum ada deskripsi"}
						</div>
						{/* informasi ada berapa projects */}
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-2">
								<Folder className="size-4 " />
								<div className="text-xs md:text-sm text-muted-foreground ">
									<span>{projectsCount}</span>
									<span className="ms-1">projects</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* button trigger create project */}
				<CreateProjectTriggerDialog />
			</div>
		</div>
	);
}
