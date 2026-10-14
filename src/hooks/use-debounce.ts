"use client";

import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number = 300) {
	const [debounceValue, setDebounceValue] = useState<T>(value);

	useEffect(() => {
		const timeOut = setTimeout(() => {
			setDebounceValue(value);
		}, delay);

		return () => clearTimeout(timeOut);
	}, [value, delay]);

	return debounceValue;
}
