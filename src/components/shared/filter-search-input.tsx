"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
	useParams,
	usePathname,
	useRouter,
	useSearchParams,
} from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { cn } from "cn";
import { useDebounce } from "@/hooks/use-debounce";

type FilterSearchInputProps = {
	paramKey: string;
	debounceTime?: number;
} & React.ComponentPropsWithoutRef<"input">;

export default function FilterSearchInput({
	paramKey,
	debounceTime = 300,
	className,
	...props
}: FilterSearchInputProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// Ambil nilai awal dari URL search params agar state sinkron jika halaman di-refresh
	const [query, setQuery] = useState(searchParams.get(paramKey) || "");

	const debounceQuery = useDebounce(query, debounceTime);

	useEffect(() => {
		const params = new URLSearchParams(searchParams.toString());

		if (!debounceQuery.trim()) {
			params.delete(paramKey);
		} else {
			params.set(paramKey, debounceQuery);
		}

		const newUrl = `${pathname}?${params.toString()}`;

		window.history.replaceState(null, "", newUrl);

		// Hindari replace URL jika nilainya sama persis dengan yang ada di URL saat ini
		startTransition(() => {
			router.replace(newUrl, { scroll: false });
		});
	}, [
		debounceQuery,
		paramKey,
		pathname,
		router,
		searchParams.entries.toString(),
	]);

	return (
		<div className="w-full relative">
			<Search className="absolute size-4 top-1/2 -translate-y-1/2 left-4 text-muted-foreground" />
			<Input
				name={paramKey}
				type="search"
				value={query}
				onChange={e => setQuery(e.target.value)}
				className={cn(
					"pl-10 h-10",
					"bg-card rounded-lg border",
					"text-muted-foreground",
					"focus-visible:border-border focus-visible:ring-border",
					"no-search-x",
					className,
				)}
				placeholder="Search projects, task, or people..."
				{...props}
			/>
		</div>
	);
}
