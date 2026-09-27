export default function WorkspacesSkeleton() {
	return (
		<div className="flex flex-col gap-3 min-h-0 h-full">
			<div className="text-muted-foreground tracking-tight text-sm">
				Workspaces
			</div>
			<div className="grid gap-2 overflow-y-auto">
				{[...Array.from({ length: 3 })].map((_, i) => (
					<div key={i} className="h-8 bg-muted animate-pulse" />
				))}
			</div>
		</div>
	);
}
