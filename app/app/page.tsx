import { createClient } from "@/lib/supabase/server";
import type { Invoice } from "@/lib/invoices";
import { InvoiceForm } from "@/components/invoices/invoice-form";
import { InvoiceStats } from "@/components/invoices/invoice-stats";
import { InvoiceTable } from "@/components/invoices/invoice-table";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: invoices } = await supabase
    .from("invoices")
    .select("*")
    .order("due_date", { ascending: true });

  const rows = (invoices as Invoice[]) ?? [];

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Track unpaid invoices and follow up on the ones that need it.
        </p>
      </div>

      <InvoiceStats invoices={rows} />

      <InvoiceForm />

      <section className="flex flex-col gap-4">
        <h2 className="text-base font-medium tracking-tight">Invoices</h2>
        <InvoiceTable invoices={rows} />
      </section>
    </div>
  );
}
