"use client";
import { Input } from "@/components/ui/input";
import { memo, useCallback, useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PasswordInput({
	className,
	type,
	...props
}: React.ComponentProps<"input">) {
	const [isPasswordVisivle, setIsPasswordVisible] = useState(false);

	const handleOnclick = useCallback(() => {
		setIsPasswordVisible(prev => !prev);
	}, []);

	return (
		<div className="relative ">
			<Input
				type={isPasswordVisivle ? "text" : "password"}
				className={`aria-invalid:[&>div]:[&>button]:text-destructive pr-12 overflow-hidden ${className}`}
				{...props}
			/>
			<div className="absolute top-1/2 -translate-y-1/2 right-2.5">
				<ToogleVisibleButton
					onClick={handleOnclick}
					isVisible={isPasswordVisivle}
				/>
			</div>
		</div>
	);
}

const ToogleVisibleButton = memo(
	({ onClick, isVisible }: { onClick?: () => void; isVisible: boolean }) => {
		return (
			<Button
				variant="ghost"
				size={"icon-sm"}
				className="rounded-full"
				onClick={onClick}
			>
				{isVisible ? <EyeClosed size={24} /> : <Eye size={24} />}
			</Button>
		);
	},
);
