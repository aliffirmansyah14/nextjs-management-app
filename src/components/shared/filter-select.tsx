"use client";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "cn";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { startTransition, useCallback, useOptimistic } from "react";

type FilterSelectProps<T extends string> = {
	items: { label: string; value: T }[];
	paramKey: string;
	allValues?: T;
	placeholder: string;
	className?: string;
};
export default function FilterSelect<T extends string>({
	items,
	paramKey,
	allValues = "All" as T,
	placeholder,
	className,
}: FilterSelectProps<T>) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const currentFilter = searchParams.get(paramKey) ?? allValues;

	const [optimisticFilter, setOptimisticFilter] = useOptimistic(
		currentFilter,
		(_, newParams: T) => newParams,
	);

	const handleValueChange = useCallback(
		(newValue: string | null) => {
			if (newValue === null) return;

			const isValidValue =
				newValue === allValues || items.some(item => item.value === newValue);

			if (!isValidValue) return;

			const value = newValue as T;
			const params = new URLSearchParams(searchParams.toString());

			if (value === allValues) {
				params.delete(paramKey);
			} else {
				params.set(paramKey, value);
			}

			const newUrl = `${pathname}?${params.toString()}`;

			window.history.replaceState(null, "", newUrl);

			startTransition(() => {
				setOptimisticFilter(value);

				router.replace(newUrl, { scroll: false });
			});
		},
		[router, pathname, searchParams.toString(), paramKey, allValues],
	);

	return (
		<Select
			items={items}
			value={optimisticFilter}
			onValueChange={handleValueChange}
		>
			<SelectTrigger className={cn("w-40 h-10 ", className)}>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>{placeholder}</SelectLabel>
					{items.map(item => (
						<SelectItem key={item.value} value={item.value}>
							{item.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
