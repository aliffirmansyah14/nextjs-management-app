import { authClient } from "./auth-client";

export const signInWithGoogle = async (callbackURL: string = "/dashboard") => {
	return authClient.signIn.social({
		provider: "google",
		callbackURL,
	});
};
