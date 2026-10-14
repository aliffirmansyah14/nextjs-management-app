import { Card, CardContent } from "@/components/ui/card";

export default function WorkspaceStatsSkeleton() {
	return (
		<div className="grid grid-cols-4 md:gap-3">
			{Array.from({ length: 4 }).map((_, i) => (
				<Card key={i} className="rounded-none ring-0 md:rounded-xl md:py-5">
					<CardContent className="flex items-center flex-col sm:flex-row gap-2 md:gap-4 relative">
						{/* Skeleton Icon Box */}
						<div className="h-9 w-9 md:h-11 md:w-11 rounded-lg md:rounded-xl shrink-0 bg-muted animate-pulse" />

						{/* div Text (Angka & Label) */}
						<div className="space-y-2 flex flex-col items-center sm:items-start w-full">
							{/* div untuk Stat Value (Angka) */}
							<div className="h-4 md:h-5 w-8 sm:w-8 bg-muted animate-pulse" />
							{/* div untuk Label */}
							<div className="h-3.5 md:h-4 w-16 sm:w-20 bg-muted animate-pulse" />
						</div>

						{/* Separator vertical untuk tampilan mobile */}
						{i !== 3 && (
							<div className="block md:hidden absolute top-0 right-0 w-px h-full border-r border-border" />
						)}
					</CardContent>
				</Card>
			))}
		</div>
	);
}
