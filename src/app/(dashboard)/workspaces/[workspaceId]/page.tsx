import AppContainer from "@/components/layouts/app-container";
import WorkspaceIcon from "@/components/shared/workspace-icon";
import { Button } from "@/components/ui/button";
import { getWorkspaceById } from "@/features/workspace/queries/get-workspace-by-id";
import { getCurrentUser } from "@/lib/auth/session";
import { styleColorWorkspace } from "@/lib/utils";
import { ArrowLeft, Folder, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

type WorkspaceDetailPageProps = {
	params: Promise<{ workspaceId: string }>;
};

export default async function WorkspaceDetailPage({
	params,
}: WorkspaceDetailPageProps) {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	const id = (await params).workspaceId;

	const workpace = await getWorkspaceById(id, user.id);

	return (
		<AppContainer>
			<div className="w-full flex flex-row md:flex-col gap-2 items-start">
				<Link
					href="/workspaces"
					className="flex items-center pt-1 md:pt-0 gap-3 text-sm text-muted-foreground hover:text-black"
				>
					<ArrowLeft className="size-4" />
					<span className="hidden md:block"> Kembali ke workspaces</span>
				</Link>

				<div className="w-full 	flex justify-between">
					<div className="flex gap-2">
						<WorkspaceIcon
							styleIcon={`${styleColorWorkspace[1].base} size-20 text-5xl rounded-3xl`}
							text={workpace?.name || "p"}
							className="hidden md:block rounded-4xl bg-zinc-200 p-1.5 shadow overflow-hidden"
						/>

						{/* detail */}
						<div className="flex flex-col gap-2">
							<h1 className="text-base md:text-xl font-semibold tracking-tight">
								{workpace?.name}
							</h1>
							{/* dummy */}
							<div className="text-muted-foreground text-xs md:text-sm">
								Workspace untuk tim desain produk Taskly
							</div>
							<div className="flex items-center gap-4">
								<div className="flex items-center gap-2">
									<Folder className="size-4 " />
									<div className="text-xs md:text-sm text-muted-foreground ">
										<span>5</span>
										<span className="ms-1">projects</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* button trigger create project */}
					<Button
						type="button"
						className="py-4 px-3 [&_span]:hidden md:[&_span]:inline"
					>
						<Plus className="size-4" />
						<span> Buat Project baru </span>
					</Button>
				</div>
			</div>
		</AppContainer>
	);
}
