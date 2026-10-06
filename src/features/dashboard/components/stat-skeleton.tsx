import { Card, CardContent } from "@/components/ui/card";

export default function StatSkeleton({ size = 4 }: { size?: number }) {
	return (
		<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
			{Array.from({ length: size }).map((_, i) => (
				<Card key={i}>
					<CardContent className="flex flex-col gap-2">
						<div className="bg-muted size-8 rounded-full animate-pulse" />
						<div className="bg-muted h-5 w-1/3 animate-pulse" />
						<div className="bg-muted size-5 animate-pulse" />
						<div className="bg-muted h-4 w-1/2 animate-pulse" />
					</CardContent>
				</Card>
			))}
		</div>
	);
}
