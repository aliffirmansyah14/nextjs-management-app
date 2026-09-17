"use server";
import { auth } from "./auth";
import { headers } from "next/headers";

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
