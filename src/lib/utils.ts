export { cn } from "cn";

export const delay = async (ms: number = 1000): Promise<void> => {
	return new Promise(resolve => setTimeout(resolve, ms));
};
