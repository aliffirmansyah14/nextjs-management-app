import { TableCell, TableRow } from "@/components/ui/table";
import { getMyTasks } from "../queries/get-my-tasks";
import { delay } from "@/lib/utils";

type TaskTableRowProps = {
	promiseTask: ReturnType<typeof getMyTasks>;
};

export default async function TaskTableRow({ promiseTask }: TaskTableRowProps) {
	await delay(5000);
	const tasks = await promiseTask;
	return tasks.map(task => (
		<TableRow key={task.id}>
			<TableCell className="font-medium">{task.name}</TableCell>
			<TableCell>{task.project.name}</TableCell>
			<TableCell>{task.status}</TableCell>
			<TableCell>
				{task.dueDate ? task.dueDate.toDateString() : "tidak ada masa tenggang"}
			</TableCell>
			<TableCell className="text-right">low</TableCell>
		</TableRow>
	));
}
