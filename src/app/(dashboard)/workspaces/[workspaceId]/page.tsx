type WorkspaceDetailPageProps = {
	params: Promise<{ workspaceId: string }>;
};

export default async function WorkspaceDetailPage({
	params,
}: WorkspaceDetailPageProps) {
	const id = (await params).workspaceId;
	return <div>WorkspaceDetailPage {id}</div>;
}
