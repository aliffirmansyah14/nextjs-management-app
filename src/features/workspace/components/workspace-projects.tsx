import FilterSearchInput from "@/components/shared/filter-search-input";
import FilterSelect from "@/components/shared/filter-select";
import { SortByParams } from "@/types/params";
import { Suspense } from "react";
import ProjectList from "./project-list";
import ProjectCardSkeleton from "./project-card-skeleton";

type WorkspaceProjectsProps = {
	workspaceId: string;
	userId: string;
	searchParamsPromise: Promise<{ q?: string; sort?: SortByParams }>;
};

const sortItems: { label: string; value: SortByParams }[] = [
	{
		label: "Project Terbaru",
		value: "created",
	},
	{
		label: "Update Terbaru",
		value: "updated",
	},
	{
		label: "Nama A-Z",
		value: "name",
	},
];

export default async function WorkspaceProjects({
	workspaceId,
	userId,
	searchParamsPromise,
}: WorkspaceProjectsProps) {
	const { q, sort } = await searchParamsPromise;
	const query = q ?? "";

	// Validasi sort value, fallback ke default index 0 ("created")
	const sortBy =
		sortItems.find(s => s.value === sort)?.value ?? sortItems[0].value;

	return (
		<div className="space-y-4 md:space-y-6">
			{/* Filter Section */}
			<div className="flex justify-end gap-4 items-center">
				<div className="w-full max-w-sm">
					<FilterSearchInput
						paramKey="q"
						debounceTime={500}
						placeholder="Search Projects..."
						className="md:text-sm text-xs"
					/>
				</div>
				<FilterSelect
					items={sortItems}
					paramKey="sort"
					placeholder="Sort by"
					className="bg-card"
				/>
			</div>

			{/* Suspense dengan Key Dinamis */}
			<Suspense key={`${query}:${sortBy}`} fallback={<ProjectListSkeleton />}>
				<ProjectList
					userId={userId}
					workspaceId={workspaceId}
					query={query}
					sort={sortBy}
				/>
			</Suspense>
		</div>
	);
}

function ProjectListSkeleton() {
	return (
		<div className="grid md:grid-cols-3 gap-4">
			{Array.from({ length: 6 }).map((_, i) => (
				<ProjectCardSkeleton key={i} />
			))}
		</div>
	);
}
