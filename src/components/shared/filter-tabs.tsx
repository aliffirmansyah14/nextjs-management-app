"use client";

import {
	Tabs,
	TabsList,
	tabsListVariants,
	TabsTrigger,
} from "@/components/ui/tabs";
import { startTransition, useCallback, useOptimistic } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { VariantProps } from "class-variance-authority";

type FilterTabs<T extends string> = {
	tabs: Record<T, string>;
	queryKey: string;
	allValues?: T;
};

export default function FilterTabs<T extends string>({
	tabs,
	queryKey,
	allValues = "All" as T,
	variant = "default",
}: FilterTabs<T> & VariantProps<typeof tabsListVariants>) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const currentParams = (searchParams.get(queryKey) as T) ?? allValues;

	const [optimisticParams, setOptimisticParams] = useOptimistic(
		currentParams,
		(_, newStatus: T) => newStatus,
	);

	const handleValueChange = useCallback(
		(newStatus: string) => {
			const status = newStatus as T;

			// 2. Buat URL baru
			const params = new URLSearchParams(searchParams.toString());
			if (status === allValues) {
				params.delete(queryKey);
			} else {
				params.set(queryKey, status);
			}

			const newUrl = `${pathname}?${params.toString()}`;

			// 3. Update URL di browser address bar langsung tanpa menunggu Next.js
			window.history.replaceState(null, "", newUrl);

			// 4. Minta Next.js memperbarui data server di background
			startTransition(() => {
				// 5. Update UI secara optimis (Seketika/Instan)
				setOptimisticParams(status);

				router.replace(newUrl, { scroll: false });
			});
		},
		[router, pathname, searchParams.toString()],
	);

	return (
		<Tabs value={optimisticParams} onValueChange={handleValueChange}>
			<TabsList variant={variant}>
				{(Object.entries(tabs) as [T, string][]).map(
					([statusKey, statusLabel]) => (
						<TabsTrigger key={statusKey} value={statusKey}>
							{statusLabel}
						</TabsTrigger>
					),
				)}
			</TabsList>
		</Tabs>
	);
}
