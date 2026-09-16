import bcrypt from "bcrypt";

export const hashPassword = async (password: string) =>
	await bcrypt.hash(password, 10);

export const verifyPassword = async (data: {
	password: string;
	hash: string;
}) => await bcrypt.compare(data.password, data.hash);
