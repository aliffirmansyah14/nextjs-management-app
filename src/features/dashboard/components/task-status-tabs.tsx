"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskStatusParams } from "../types/status-params";
import { startTransition, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type TaskStatusTabProps = {
	defaultValues: TaskStatusParams;
};
const tabs: Record<TaskStatusParams, string> = {
	ALL: "All",
	TODO: "Todo",
	IN_PROGRESS: "In Progress",
	DONE: "Done",
};

export function TaskStatusTab({ defaultValues }: TaskStatusTabProps) {
	const searchParams = useSearchParams();

	const createQueryStatus = useCallback(
		(status: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set("status", status);

			return params.toString();
		},
		[searchParams],
	);

	return (
		<Tabs defaultValue={defaultValues}>
			<TabsList variant="line">
				{Object.keys(tabs).map(tab => (
					<TabsTrigger
						onClick={e => {
							e.preventDefault();
							window.history.pushState(null, "", `?${createQueryStatus(tab)}`);
							// router.push("/dashboard?" + createQueryStatus(tab), {
							// 	scroll: false,
							// });
						}}
						key={tabs[tab as keyof typeof tabs]}
						value={tab}
					>
						{tabs[tab as keyof typeof tabs]}
					</TabsTrigger>
				))}
			</TabsList>
		</Tabs>
	);
}
