import {
	Table,
	TableBody,
	TableCaption,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import DashboardCard from "./dashboard-card";
import TaskTableRow from "./task-table-row";
import { User } from "@/types/user";
import { TaskStatusParams } from "../types/status-params";
import { Suspense } from "react";
import TaskTableLoading from "./task-table-loading";
import FilterTabs from "@/components/shared/filter-tabs";

type MyTaskTableProps = {
	searchhParamsPromise: Promise<{
		status?: string;
	}>;
	user: User;
};

const validStatus: TaskStatusParams[] = [
	"ALL",
	"TODO",
	"IN_PROGRESS",
	"DONE",
] as const;

export async function MyTaskTable({
	searchhParamsPromise,
	user,
}: MyTaskTableProps) {
	const statusParams = (await searchhParamsPromise).status;

	const status = validStatus.find(status => statusParams === status) ?? "ALL";

	return (
		<DashboardCard
			className="overflow-x-auto"
			title="My Task"
			actionUrl="/tasks"
		>
			{/*filter status tab dengna params*/}
			<FilterTabs
				queryKey="status"
				tabs={
					{
						ALL: "All",
						TODO: "Todo",
						IN_PROGRESS: "In Progress",
						DONE: "Done",
					} as Record<TaskStatusParams, string>
				}
				allValues="ALL"
				variant={"line"}
			/>
			{/* table */}
			<Table>
				<TableCaption>Daftar task yang dikerjakan</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-5	/12">Task</TableHead>
						<TableHead>Project</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Due Date</TableHead>
						<TableHead className="text-right">Priority</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<Suspense key={status} fallback={<TaskTableLoading />}>
						<TaskTableRow userId={user.id} status={status} />
					</Suspense>
				</TableBody>
			</Table>
		</DashboardCard>
	);
}
