"use client";
import { ChevronUp, Folder } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SidebarItem } from "./app-sidebar";

type WorkspacesItemProps = {
	index: number;
	name: string;
	projects: Array<{ link: string; name: string }>;
};

export default function WorkspacesItem({
	name,
	projects,
	index,
}: WorkspacesItemProps) {
	const [isExtends, setIsExtends] = useState(false);

	const hasChildren = projects.length > 0;

	const bgColors = ["bg-purple-600", "bg-green-500", "bg-cyan-600"];

	const handleOnLick = () => {
		if (!hasChildren) return;
		setIsExtends(prev => !prev);
	};

	return (
		<div className="flex flex-col gap-2 relative">
			<SidebarItem
				as="div"
				className="justify-between"
				isActive={isExtends}
				onClick={handleOnLick}
				icon={
					<div className="flex gap-4">
						<div
							className={`size-6 aspect-square flex justify-center items-center rounded-md text-white ${bgColors[index % bgColors.length]}`}
						>
							{name[0].toLocaleUpperCase()}
						</div>
						<span className="font-medium tracking-tighter text-muted-foreground">
							{name}
						</span>
					</div>
				}
			>
				{/* jiikka ada children render icon  */}
				{hasChildren && (
					<div className="shrink-0">
						<ChevronUp
							className={`size-6 text-muted-foreground ${isExtends ? "rotate-0" : "rotate-180"}`}
						/>
					</div>
				)}
			</SidebarItem>
			{/* jika ada children dan extends makaa render chidren */}
			{isExtends && hasChildren && (
				<div className="flex flex-col min-h-0 relative">
					{projects.map(p => (
						<Link
							key={p.link}
							href={p.link}
							className="ml-12 hover:bg-muted px-2 py-1 rounded-lg flex items-center gap-3 relative"
						>
							<Folder className="size-4" />
							<span>{p.name}</span>
						</Link>
					))}
				</div>
			)}
		</div>
	);
}
