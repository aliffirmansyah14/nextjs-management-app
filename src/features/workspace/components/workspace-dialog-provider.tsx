import { CreateWorkspaceDialog } from "@/features/workspace/components/create-workspace-dialog";
import { DeleteWorkspaceDialog } from "./delete-workspace-dialog";
import { UpdateWorkspaceDialog } from "./update-workspace-dialog";

export function WorkspaceDialogProvider() {
	return (
		<>
			<CreateWorkspaceDialog />
			<DeleteWorkspaceDialog />
			<UpdateWorkspaceDialog />
		</>
	);
}
