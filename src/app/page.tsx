import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";

export default async function HomePage() {
	const session = await auth.api.getSession({
		headers: await headers(), // you need to pass the headers object.
	});

	console.log(session);
	return (
		<div>
			<h1>home</h1>
		</div>
	);
}
