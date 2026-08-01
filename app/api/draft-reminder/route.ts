import { streamText, createTextStreamResponse } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { createClient } from "@/lib/supabase/server";
import { reminderRequestSchema } from "@/lib/validation/reminder";
import { buildReminderPrompt } from "@/lib/prompts";
import type { Invoice } from "@/lib/invoices";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = reminderRequestSchema.safeParse(body);

  if (!parsed.success) {
    return new Response("Invalid request.", { status: 400 });
  }

  const supabase = await createClient();
  const { data: invoice, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", parsed.data.invoiceId)
    .single();

  if (error || !invoice) {
    return new Response("Invoice not found.", { status: 404 });
  }

  const { instructions, prompt } = buildReminderPrompt(invoice as Invoice);

  const result = streamText({
    model: anthropic("claude-sonnet-5"),
    instructions,
    prompt,
    maxOutputTokens: 512,
  });

  return createTextStreamResponse({
    stream: result.textStream,
  });
}
