import { cn } from "@/lib/utils";

type AppContainerProps = {
	children: React.ReactNode;
	clasName?: string;
};

export default function AppContainer({
	clasName,
	children,
}: AppContainerProps) {
	return <div className={cn("px-4 md:px-6 py-4", clasName)}>{children}</div>;
}
