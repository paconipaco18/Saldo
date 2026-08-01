import { getInvoiceStatusLabel, type Invoice } from "@/lib/invoices";

// Counts, not summed amounts: invoices can mix USD/EUR/VES, so a single
// combined total would be arithmetically meaningless.
export function InvoiceStats({ invoices }: { invoices: Invoice[] }) {
  const pending = invoices.filter((invoice) => invoice.status !== "paid");
  const overdue = pending.filter(
    (invoice) => getInvoiceStatusLabel(invoice) === "Overdue"
  ).length;
  const dueSoon = pending.filter(
    (invoice) => getInvoiceStatusLabel(invoice) === "Due soon"
  ).length;

  const stats = [
    { label: "Overdue", value: overdue, accent: "text-destructive" },
    { label: "Due soon", value: dueSoon, accent: "text-amber-400" },
    { label: "Pending", value: pending.length, accent: "text-foreground" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      {stats.map(({ label, value, accent }) => (
        <div
          key={label}
          className="rounded-2xl border border-border bg-card px-4 py-4 sm:px-5 sm:py-5"
        >
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {label}
          </p>
          <p
            className={`mt-2 font-mono text-2xl font-semibold tabular-nums sm:text-3xl ${accent}`}
          >
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}
