import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
} from "@/components/ui/card";
import { Fragment } from "react/jsx-runtime";

export default function MyTableSkeleton() {
	return (
		<Card>
			<CardHeader>
				<div className="h-5 w-20  bg-muted animate-pulse" />
				<CardAction>
					<div className="h-3 w-10 bg-muted animate-pulse" />
				</CardAction>
			</CardHeader>
			<CardContent className="space-y-3">
				<div className="flex w-1/4 items-center gap-3">
					{Array.from({ length: 4 }).map((_, i) => (
						<Fragment key={i}>
							<div className="h-5 flex-1 bg-muted animate-pulse" />
						</Fragment>
					))}
				</div>
				<div className="grid gap-3">
					{Array.from({ length: 4 }).map((_, i) => (
						<div key={i} className="flex items-center gap-4">
							<div className="h-8 w-4/12 bg-muted animate-pulse" />
							<div className="h-8 flex-1 bg-muted animate-pulse" />
							<div className="h-8 flex-1 bg-muted animate-pulse" />
							<div className="h-8 flex-1 bg-muted animate-pulse" />
							<div className="h-8 flex-1 bg-muted animate-pulse" />
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
