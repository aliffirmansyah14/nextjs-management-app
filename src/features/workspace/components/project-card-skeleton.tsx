import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ProjectCardSkeleton() {
	return (
		<Card className="border-border/40 shadow-sm">
			<CardContent
				className={cn(
					"grid gap-x-3 gap-y-2 md:gap-y-4 p-6",

					"grid-cols-[auto_1fr_auto]",
					"[grid-template-areas:'icon_name_menu''icon_informasi_menu']",
					"md:[grid-template-areas:'icon_name_menu''deskripsi_deskripsi_deskripsi''informasi_informasi_informasi']",
				)}
			>
				{/* 1. Icon Skeleton */}
				<div className="[grid-area:icon] self-start">
					<div className="size-8 rounded-lg bg-muted animate-pulse" />
				</div>

				{/* 2. Name Skeleton */}
				<div className="[grid-area:name] self-center">
					<div className="h-4 w-32 rounded bg-muted animate-pulse" />
				</div>

				{/* 3. Menu Skeleton */}
				<div className="[grid-area:menu] self-start">
					<div className="size-8 rounded-md bg-muted animate-pulse" />
				</div>

				{/* 4. Informasi (Task count) Skeleton */}
				<div className="[grid-area:informasi] flex items-center gap-2">
					<div className="size-4 rounded bg-muted animate-pulse hidden md:block" />
					<div className="h-3 w-16 rounded bg-muted animate-pulse" />
				</div>

				{/* 5. Deskripsi Skeleton (Desktop) */}
				<div className="[grid-area:deskripsi] hidden md:block mt-1 space-y-1.5">
					<div className="h-3 w-full rounded bg-muted animate-pulse" />
					<div className="h-3 w-2/3 rounded bg-muted animate-pulse" />
				</div>
			</CardContent>
		</Card>
	);
}
