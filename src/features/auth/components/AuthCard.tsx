import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

type AuthCardProps = {
	title: string;
	content?: React.ReactNode;
	footer?: React.ReactNode;
};

export default function AuthCard({ title, content, footer }: AuthCardProps) {
	return (
		<Card className="w-full max-w-sm ring-0 shadow-none md:ring-1 md:shadow-lg pt-8">
			<CardHeader className="justify-center">
				<CardTitle className="font-bold">{title}</CardTitle>
			</CardHeader>
			{content && <CardContent>{content}</CardContent>}
			{footer && (
				<CardFooter className="grid gap-6 bg-card pb-8">{footer}</CardFooter>
			)}
		</Card>
	);
}
