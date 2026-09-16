import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export default async function page() {
	await auth.api.signOut({
		headers: await headers(),
	});
	return <div>page</div>;
}
