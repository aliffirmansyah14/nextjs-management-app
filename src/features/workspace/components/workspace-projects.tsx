import FilterSearchInput from "@/components/shared/filter-search-input";
import FilterSelect from "@/components/shared/filter-select";
import { SortByParams } from "@/types/params";
import { Suspense } from "react";
import ProjectList from "./project-list";
import ProjectCardSkeleton from "./project-card-skeleton";
import { delay } from "@/lib/utils";

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
	await delay(3000);
	const { q, sort } = await searchParamsPromise;
	const query = q ?? "";

	// Validasi sort value, fallback ke default index 0 ("created")
	const sortBy =
		sortItems.find(s => s.value === sort)?.value ?? sortItems[0].value;

	return (
		<div className="space-y-4 md:space-y-6">
			{/* Filter Section */}
			<div className="flex md:justify-end gap-1 md:gap-3 items-center">
				<div className="flex-1 md:max-w-64">
					<FilterSearchInput
						paramKey="q"
						debounceTime={500}
						placeholder="Search Projects..."
					/>
				</div>
				<FilterSelect
					items={sortItems}
					paramKey="sort"
					groupName="Sort by"
					className="bg-card tracking-tight "
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
