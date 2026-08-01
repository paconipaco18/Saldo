import { markInvoicePaid, markInvoicePending } from "@/app/app/actions";
import {
  formatInvoiceAmount,
  formatInvoiceDate,
  getInvoiceStatusLabel,
  type Invoice,
  type InvoiceStatusLabel,
} from "@/lib/invoices";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeleteInvoiceDialog } from "@/components/invoices/delete-invoice-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const STATUS_BADGE_CLASSNAME: Record<InvoiceStatusLabel, string> = {
  Overdue: "border-destructive/40 bg-destructive/10 text-destructive",
  "Due soon": "border-amber-500/40 bg-amber-500/10 text-amber-400",
  Upcoming: "border-border bg-muted/40 text-muted-foreground",
  Paid: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
};

function StatusBadge({ label }: { label: InvoiceStatusLabel }) {
  return (
    <Badge variant="outline" className={STATUS_BADGE_CLASSNAME[label]}>
      {label}
    </Badge>
  );
}

function InvoiceActions({ invoice }: { invoice: Invoice }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {invoice.status === "paid" ? (
        <form action={markInvoicePending.bind(null, invoice.id)}>
          <Button type="submit" variant="outline" size="sm">
            Mark as pending
          </Button>
        </form>
      ) : (
        <form action={markInvoicePaid.bind(null, invoice.id)}>
          <Button type="submit" variant="outline" size="sm">
            Mark as paid
          </Button>
        </form>
      )}
      <DeleteInvoiceDialog
        invoiceId={invoice.id}
        clientName={invoice.client_name}
      />
      <Button type="button" variant="ghost" size="sm" disabled>
        Draft reminder
      </Button>
    </div>
  );
}

export function InvoiceTable({ invoices }: { invoices: Invoice[] }) {
  if (invoices.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border px-6 py-14 text-center">
        <p className="text-sm font-medium">No invoices yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Add your first one above to start tracking it.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile: stacked cards */}
      <div className="flex flex-col gap-3 sm:hidden">
        {invoices.map((invoice) => {
          const label = getInvoiceStatusLabel(invoice);

          return (
            <div
              key={invoice.id}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-medium">{invoice.client_name}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Due {formatInvoiceDate(invoice.due_date)}
                  </p>
                </div>
                <StatusBadge label={label} />
              </div>
              <p className="mt-4 font-mono text-xl font-semibold tabular-nums">
                {formatInvoiceAmount(invoice.amount, invoice.currency)}
              </p>
              <div className="mt-4">
                <InvoiceActions invoice={invoice} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop: table */}
      <div className="hidden overflow-hidden rounded-2xl border border-border sm:block">
        <Table>
          <TableHeader>
            <TableRow className="border-border bg-muted/30 hover:bg-muted/30">
              <TableHead className="h-11 px-5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Client
              </TableHead>
              <TableHead className="h-11 px-5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Amount
              </TableHead>
              <TableHead className="h-11 px-5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Due date
              </TableHead>
              <TableHead className="h-11 px-5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Status
              </TableHead>
              <TableHead className="h-11 px-5" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => {
              const label = getInvoiceStatusLabel(invoice);

              return (
                <TableRow key={invoice.id} className="border-border">
                  <TableCell className="px-5 py-4 font-medium">
                    {invoice.client_name}
                  </TableCell>
                  <TableCell className="px-5 py-4 font-mono tabular-nums">
                    {formatInvoiceAmount(invoice.amount, invoice.currency)}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-muted-foreground">
                    {formatInvoiceDate(invoice.due_date)}
                  </TableCell>
                  <TableCell className="px-5 py-4">
                    <StatusBadge label={label} />
                  </TableCell>
                  <TableCell className="px-5 py-4">
                    <InvoiceActions invoice={invoice} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
