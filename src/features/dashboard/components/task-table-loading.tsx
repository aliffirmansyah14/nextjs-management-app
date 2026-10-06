import { Spinner } from "@/components/ui/spinner";
import { TableCell, TableRow } from "@/components/ui/table";

export default function TaskTableLoading() {
	return (
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
	);
}
