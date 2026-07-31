import { markInvoicePaid } from "@/app/app/actions";
import {
  formatInvoiceAmount,
  getInvoiceStatusLabel,
  type Invoice,
} from "@/lib/invoices";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const STATUS_BADGE_CLASSNAME: Record<string, string> = {
  Overdue: "",
  "Due soon":
    "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  Upcoming: "",
  Paid: "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
};

export function InvoiceTable({ invoices }: { invoices: Invoice[] }) {
  if (invoices.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No invoices yet — add your first one above.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Client</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Due date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => {
          const label = getInvoiceStatusLabel(invoice);
          const variant = label === "Overdue" ? "destructive" : "outline";

          return (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.client_name}</TableCell>
              <TableCell>
                {formatInvoiceAmount(invoice.amount, invoice.currency)}
              </TableCell>
              <TableCell>{invoice.due_date}</TableCell>
              <TableCell>
                <Badge
                  variant={variant}
                  className={STATUS_BADGE_CLASSNAME[label]}
                >
                  {label}
                </Badge>
              </TableCell>
              <TableCell>
                {invoice.status !== "paid" && (
                  <form action={markInvoicePaid.bind(null, invoice.id)}>
                    <Button type="submit" variant="outline" size="sm">
                      Mark as paid
                    </Button>
                  </form>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
