import { createClient } from "@/lib/supabase/server";
import type { Invoice } from "@/lib/invoices";
import { InvoiceForm } from "@/components/invoices/invoice-form";
import { InvoiceTable } from "@/components/invoices/invoice-table";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: invoices } = await supabase
    .from("invoices")
    .select("*")
    .order("due_date", { ascending: true });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
      <InvoiceForm />
      <InvoiceTable invoices={(invoices as Invoice[]) ?? []} />
    </div>
  );
}
