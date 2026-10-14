import { getProjectsTask } from "@/features/project/queries/get-projects-tasks";
import ProjectCard from "./project-card";
import { Card } from "@/components/ui/card";
import EmptyState from "@/components/shared/empty-state";
import { Inbox } from "lucide-react";
import { SortByParams } from "@/types/params";
import { Prisma } from "@/generated/prisma/client";
import { delay } from "@/lib/utils";

type ProjectListProps = {
	workspaceId: string;
	userId: string;
	sort: SortByParams;
	query: string;
};

// Mapping jenis sort ke field Prisma
const sortMapping: Record<
	SortByParams,
	Prisma.ProjectOrderByWithRelationInput
> = {
	name: { name: "asc" },
	created: { createdAt: "desc" },
	updated: { updatedAt: "desc" },
};

export default async function ProjectList({
	workspaceId,
	userId,
	sort,
	query,
}: ProjectListProps) {
	const projects = await getProjectsTask(workspaceId, userId, {
		where: {
			name: {
				contains: query,
				mode: "insensitive",
			},
		},
		orderBy: sortMapping[sort],
	});

	if (projects.length === 0) {
		return (
			<Card className="border-border/40 shadow-sm">
				<EmptyState
					icon={<Inbox className="size-6 text-primary" />}
					title="Tidak ada project ditemukan"
					description={
						query
							? `Tidak ada hasil yang cocok dengan kata kunci "${query}".`
							: "Mulai dengan membuat project untuk mengelola pekerjaan tim anda."
					}
				/>
			</Card>
		);
	}

	return (
		<div className="grid md:grid-cols-3 gap-4">
			{projects.map(project => (
				<ProjectCard
					key={project.id}
					id={project.id}
					name={project.name}
					task={project.tasks.map(t => ({ name: t.name }))}
				/>
			))}
		</div>
	);
}
