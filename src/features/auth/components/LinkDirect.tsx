import Link from "next/link";

type LinkDirectProps = {
	text: string;
	label: string;
	href: string;
};

export default function LinkDirect({ href, label, text }: LinkDirectProps) {
	return (
		<div className="text-zinc-600 font-medium text-center">
			{text}{" "}
			<Link href={href} className="hover:text-foreground underline">
				{label}
			</Link>
		</div>
	);
}
