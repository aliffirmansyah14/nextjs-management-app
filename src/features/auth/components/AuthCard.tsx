import Logo from "@/components/shared/logo";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

type AuthCardProps = {
	title: string;
	children?: React.ReactNode;
};

export default function AuthCard({ title, children }: AuthCardProps) {
	return (
		<Card className="mx-auto w-full max-w-sm min-h-dvh md:min-h-auto ring-0 shadow-none md:ring-1 sm:shadow-lg pt-8">
			<CardHeader className="gap-5">
				<Logo size="lg" />
				<CardTitle className="font-bold text-center">{title}</CardTitle>
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
