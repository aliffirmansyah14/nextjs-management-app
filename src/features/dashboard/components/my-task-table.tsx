import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import DashboardCard from "./dashboard-card";
import TaskTableRow from "./task-table-row";
import { User } from "@/types/user";
import { TaskStatusParams } from "../types/status-params";
import { TaskStatusTab } from "./task-status-tabs";
import { Suspense } from "react";
import TaskTableLoading from "./task-table-loading";

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
			{/* status tab */}
			<TaskStatusTab />
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
