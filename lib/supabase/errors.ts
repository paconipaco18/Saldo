import { isAuthApiError } from "@supabase/supabase-js";

const FRIENDLY_MESSAGES: Record<string, string> = {
  invalid_credentials: "Incorrect email or password.",
  email_exists: "An account with this email already exists.",
  weak_password:
    "That password is too weak. Use at least 8 characters, mixing letters and numbers.",
  email_not_confirmed: "Please confirm your email before signing in.",
  email_address_invalid: "Enter a valid email address.",
  user_banned: "This account is currently disabled.",
  over_email_send_rate_limit:
    "Too many attempts — please wait a moment and try again.",
  over_request_rate_limit:
    "Too many attempts — please wait a moment and try again.",
};

export function friendlyAuthError(error: unknown): string {
  if (isAuthApiError(error) && error.code && FRIENDLY_MESSAGES[error.code]) {
    return FRIENDLY_MESSAGES[error.code];
  }

  return "Something went wrong. Please try again.";
}
