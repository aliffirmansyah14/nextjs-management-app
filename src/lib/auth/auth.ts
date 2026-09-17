import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../prisma";
import { hashPassword, verifyPassword } from "./password";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	emailAndPassword: {
		enabled: true,
		password: {
			hash: hashPassword,
			verify: verifyPassword,
		},
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			prompt: "select_account",
		},
	},
	advanced: {
		database: {
			joins: true,
		},
	},
	plugins: [nextCookies()],
});
