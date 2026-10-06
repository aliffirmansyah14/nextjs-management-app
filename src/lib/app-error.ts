import { ZodError } from "zod";

export class AppError extends Error {
	public errors?: Record<string, string[]>;

	constructor(messasge: string, errors?: Record<string, string[]>) {
		super(messasge);

		this.errors = errors;
	}

	// helper buat error zod
	static fromZod(error: ZodError): AppError {
		const formattedErrors = error.flatten().fieldErrors;
		return new AppError("Data tidak valid", formattedErrors);
	}
}
