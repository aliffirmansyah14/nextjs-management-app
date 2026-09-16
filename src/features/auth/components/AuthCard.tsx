import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

type AuthCardProps = {
	title: string;
	children?: React.ReactNode;
};

export default function AuthCard({ title, children }: AuthCardProps) {
	return (
		<Card className="w-full max-w-sm ring-0 shadow-none md:ring-1 md:shadow-lg pt-8">
			<CardHeader className="justify-center">
				<CardTitle className="font-bold">{title}</CardTitle>
			</CardHeader>
			<CardContent>{children}</CardContent>
			<CardFooter className="bg-card">
				<div className="border-t-2 w-full">
					<div className="text-center text-xs text-muted-foreground pt-2 hover:underline">
						Dengan melanjutkan, Anda menyetujui Syarat & Ketentuan dan Kebijakan
						Privasi kami.
					</div>
				</div>
			</CardFooter>
		</Card>
	);
}
