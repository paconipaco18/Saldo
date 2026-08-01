"use client";

import { deleteInvoice } from "@/app/app/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DeleteInvoiceDialog({
  invoiceId,
  clientName,
}: {
  invoiceId: string;
  clientName: string;
}) {
  return (
    <Dialog>
      <DialogTrigger
        render={<Button type="button" variant="destructive" size="sm" />}
      >
        Delete
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete invoice for {clientName}?</DialogTitle>
          <DialogDescription>This can&apos;t be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>
            Cancel
          </DialogClose>
          <form action={deleteInvoice.bind(null, invoiceId)}>
            <Button type="submit" variant="destructive" className="w-full">
              Delete
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
