import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
} from "@/components/ui/card";

export default function RecentSkeleton({ size = 3 }: { size?: number }) {
	return (
		<div className="grid md:grid-cols-3 gap-4">
			{Array.from({ length: size }).map((_, i) => (
				<Card key={i}>
					<CardHeader>
						<div className="h-5 w-4/6  bg-muted animate-pulse" />
						<CardAction>
							<div className="h-3 w-9 bg-muted animate-pulse" />
						</CardAction>
					</CardHeader>
					<CardContent className="grid gap-3">
						<div className="h-8 w-full bg-muted animate-pulse" />
						<div className="h-8 w-full bg-muted animate-pulse" />
						<div className="h-8 w-full bg-muted animate-pulse" />
					</CardContent>
				</Card>
			))}
		</div>
	);
}
