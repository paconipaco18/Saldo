"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  invoiceSchema,
  type InvoiceActionState,
} from "@/lib/validation/invoice";

export async function createInvoice(
  _prevState: InvoiceActionState,
  formData: FormData
): Promise<InvoiceActionState> {
  const parsed = invoiceSchema.safeParse({
    clientName: formData.get("clientName"),
    clientEmail: formData.get("clientEmail"),
    clientLanguage: formData.get("clientLanguage"),
    amount: formData.get("amount"),
    currency: formData.get("currency"),
    issueDate: formData.get("issueDate"),
    dueDate: formData.get("dueDate"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("invoices").insert({
    client_name: parsed.data.clientName,
    client_email: parsed.data.clientEmail ?? null,
    client_language: parsed.data.clientLanguage,
    amount: parsed.data.amount,
    currency: parsed.data.currency,
    issue_date: parsed.data.issueDate,
    due_date: parsed.data.dueDate,
  });

  if (error) {
    return { error: "Could not save the invoice. Please try again." };
  }

  revalidatePath("/app");
  return { error: null };
}

export async function markInvoicePaid(id: string) {
  const supabase = await createClient();
  await supabase.from("invoices").update({ status: "paid" }).eq("id", id);
  revalidatePath("/app");
}

export async function markInvoicePending(id: string) {
  const supabase = await createClient();
  await supabase.from("invoices").update({ status: "pending" }).eq("id", id);
  revalidatePath("/app");
}

export async function deleteInvoice(id: string) {
  const supabase = await createClient();
  await supabase.from("invoices").delete().eq("id", id);
  revalidatePath("/app");
}
