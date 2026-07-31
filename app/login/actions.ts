"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { friendlyAuthError } from "@/lib/supabase/errors";
import {
  authCredentialsSchema,
  type AuthActionState,
} from "@/lib/validation/auth";

export async function login(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const parsed = authCredentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { error: friendlyAuthError(error) };
  }

  redirect("/app");
}
