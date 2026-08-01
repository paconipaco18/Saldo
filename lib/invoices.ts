export type Invoice = {
  id: string;
  client_name: string;
  client_email: string | null;
  client_language: "es" | "en";
  amount: number;
  currency: "USD" | "EUR" | "VES";
  issue_date: string;
  due_date: string;
  status: "pending" | "paid";
  created_at: string;
};

export type InvoiceStatusLabel = "Paid" | "Overdue" | "Due soon" | "Upcoming";

export function daysUntil(dateStr: string): number {
  const [year, month, day] = dateStr.split("-").map(Number);
  const due = Date.UTC(year, month - 1, day);

  const now = new Date();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

  return Math.round((due - today) / 86_400_000);
}

export function getInvoiceStatusLabel(
  invoice: Pick<Invoice, "status" | "due_date">
): InvoiceStatusLabel {
  if (invoice.status === "paid") return "Paid";

  const days = daysUntil(invoice.due_date);
  if (days < 0) return "Overdue";
  if (days <= 7) return "Due soon";
  return "Upcoming";
}

// Parses the date parts manually and formats in UTC. Passing a "YYYY-MM-DD"
// string to `new Date()` and formatting it locally shifts the day backwards
// for anyone west of UTC — the same reason `daysUntil` parses by hand.
export function formatInvoiceDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function formatInvoiceAmount(
  amount: number,
  currency: Invoice["currency"]
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}
