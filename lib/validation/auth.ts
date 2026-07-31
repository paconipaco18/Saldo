import { z } from "zod";

export const authCredentialsSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters."),
});

export type AuthCredentials = z.infer<typeof authCredentialsSchema>;

export type AuthActionState = {
  error: string | null;
  message?: string | null;
};

export const initialAuthActionState: AuthActionState = {
  error: null,
  message: null,
};
