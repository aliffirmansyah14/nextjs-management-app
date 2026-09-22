"use server";
import { redirect } from "next/navigation";
import { auth } from "./auth";
import { headers } from "next/headers";
import { User } from "@/types/user";

export const getSession = async () => {
	return auth.api.getSession({
		headers: await headers(),
	});
};

export const invalidateSession = async () => {
	return auth.api.signOut({
		headers: await headers(),
	});
};

export const requireSession = async () => {
	const session = await getSession();

	if (!session) {
		redirect("/login");
	}

	return session;
};

export const getCurrentUser = async (): Promise<User | null> => {
	const session = await getSession();

	return session?.user ?? null;
};
