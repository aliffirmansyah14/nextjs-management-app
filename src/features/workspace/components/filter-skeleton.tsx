export default function FilterSkeleton() {
	return (
		<div className="flex md:justify-end gap-1 md:gap-3 items-center">
			<div className="rounded-lg flex-1 md:max-w-64 h-10 bg-muted animate-pulse" />
			<div className="rounded-lg w-12 h-10 bg-muted animate-pulse" />
		</div>
	);
}
