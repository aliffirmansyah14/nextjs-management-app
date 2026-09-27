"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskStatusParams } from "../types/status-params";
import { startTransition, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const tabs: Record<TaskStatusParams, string> = {
	ALL: "All",
	TODO: "Todo",
	IN_PROGRESS: "In Progress",
	DONE: "Done",
};

export function TaskStatusTab() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const currentStatus =
		(searchParams.get("status") as TaskStatusParams) ?? "ALL";

	const handleValueChange = useCallback(
		(newStatus: string) => {
			// window.history.pushState(null, "", `${pathname}?${params.toString()}`);
			const params = new URLSearchParams(searchParams.toString());
			params.set("status", newStatus);

			startTransition(() => {
				router.replace(`${pathname}?${params.toString()}`, { scroll: false });
			});
		},
		[router, pathname, searchParams],
	);

	return (
		<Tabs value={currentStatus} onValueChange={handleValueChange}>
			<TabsList variant="line">
				{Object.entries(tabs).map(([statusKey, statusLabel]) => (
					<TabsTrigger key={statusKey} value={statusKey}>
						{statusLabel}
					</TabsTrigger>
				))}
			</TabsList>
		</Tabs>
	);
}
