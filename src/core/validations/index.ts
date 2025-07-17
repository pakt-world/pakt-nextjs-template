"use client";

/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import * as z from "zod";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

const passwordSchema = z
	.string()
	.min(8, "Password must be at least 8 characters.")
	.regex(/[0-9]/, "Password must contain at least one number.")
	.regex(/[a-z]/, "Password must contain at least one lowercase letter.")
	.regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
	.regex(
		/[^a-zA-Z0-9]/,
		"Password must contain at least one special character."
	);


export { passwordSchema };