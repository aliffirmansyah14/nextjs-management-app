export { cn } from "cn";

export const delay = async (ms: number = 1000): Promise<void> => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

export const styleColorWorkspace = [
	{
		base: "bg-purple-600",
		bg: "bg-purple-600/20",
		icon: "text-purple-600",
		dot: "border-purple-600 bg-purple-600/50",
	},
	{
		base: "bg-green-500",
		bg: "bg-green-500/20",
		icon: "text-green-500",
		dot: "border-green-500 bg-green-500/50",
	},
	{
		base: "bg-primary",
		bg: "bg-primary/20",
		icon: "text-primary",
		dot: "border-primary bg-primary/50",
	},
];
