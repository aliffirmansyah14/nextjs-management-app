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
import { getMyTasks } from "../queries/get-my-tasks";
import { User } from "@/types/user";
import { TaskStatusParams } from "../types/status-params";
import { TaskStatusTab } from "./task-status-tabs";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { delay } from "@/lib/utils";

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
	await delay(3000);
	const statusParams = (await searchhParamsPromise).status;

	const status = validStatus.includes(statusParams as any)
		? (statusParams as TaskStatusParams)
		: "ALL";

	const promiseTask = getMyTasks({ userId: user.id, status });

	return (
		<DashboardCard
			className="overflow-x-auto"
			title="My Task"
			actionUrl="/tasks"
		>
			{/* status tab */}
			<TaskStatusTab defaultValues={status} />
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
					<Suspense
						fallback={
							<TableRow>
								<TableCell colSpan={5}>
									<div className="flex justify-center items-center py-5">
										<div className="bg-muted rounded-full flex gap-2 px-3 py-1 items-center *:text-muted-foreground">
											<Spinner />
											Loading data...
										</div>
									</div>
								</TableCell>
							</TableRow>
						}
					>
						<TaskTableRow key={status} promiseTask={promiseTask} />
					</Suspense>
				</TableBody>
			</Table>
		</DashboardCard>
	);
}
