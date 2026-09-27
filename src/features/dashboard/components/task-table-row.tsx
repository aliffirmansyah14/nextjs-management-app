import { TableCell, TableRow } from "@/components/ui/table";
import { getMyTasks } from "../queries/get-my-tasks";
import { delay } from "@/lib/utils";
import { TaskStatusParams } from "../types/status-params";
import EmptyState from "@/components/shared/empty-state";

type TaskTableRowProps = {
	userId: string;
	status: TaskStatusParams;
};

export default async function TaskTableRow({
	status,
	userId,
}: TaskTableRowProps) {
	await delay(5000);
	const tasks = await getMyTasks({ userId: userId, status });

	if (tasks.length === 0) {
		return (
			<TableRow>
				<TableCell colSpan={5}>
					<EmptyState
						title="Belum ada task"
						description="Task akan muncul di sini."
					/>
				</TableCell>
			</TableRow>
		);
	}

	return tasks.map(task => (
		<TableRow key={task.id}>
			<TableCell className="font-medium">{task.name}</TableCell>
			<TableCell>{task.project.name}</TableCell>
			<TableCell>{task.status}</TableCell>
			<TableCell>
				{task.dueDate
					? new Intl.DateTimeFormat("id-ID", {
							day: "numeric",
							month: "short",
							year: "numeric",
						}).format(task.dueDate)
					: "tidak ada masa tenggang"}
			</TableCell>
			<TableCell className="text-right">low</TableCell>
		</TableRow>
	));
}
