"use client";

import { useActionState } from "react";
import { createInvoice } from "@/app/app/actions";
import { initialInvoiceActionState } from "@/lib/validation/invoice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

export function InvoiceForm() {
  const [state, formAction, pending] = useActionState(
    createInvoice,
    initialInvoiceActionState
  );

  return (
    <form
      action={formAction}
      className="grid grid-cols-1 gap-4 rounded-lg border p-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="clientName">Client name</Label>
        <Input id="clientName" name="clientName" required />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="clientEmail">Client email (optional)</Label>
        <Input id="clientEmail" name="clientEmail" type="email" />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="clientLanguage">Client language</Label>
        <NativeSelect
          id="clientLanguage"
          name="clientLanguage"
          defaultValue="es"
        >
          <NativeSelectOption value="es">Español</NativeSelectOption>
          <NativeSelectOption value="en">English</NativeSelectOption>
        </NativeSelect>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          min="0"
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="currency">Currency</Label>
        <NativeSelect id="currency" name="currency" defaultValue="USD">
          <NativeSelectOption value="USD">USD</NativeSelectOption>
          <NativeSelectOption value="EUR">EUR</NativeSelectOption>
          <NativeSelectOption value="VES">VES</NativeSelectOption>
        </NativeSelect>
      </div>

      <div />

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="issueDate">Issue date</Label>
        <Input id="issueDate" name="issueDate" type="date" required />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="dueDate">Due date</Label>
        <Input id="dueDate" name="dueDate" type="date" required />
      </div>

      <div className="flex items-end">
        <Button type="submit" disabled={pending}>
          {pending ? "Adding..." : "Add invoice"}
        </Button>
      </div>

      {state.error && (
        <p className="text-sm text-destructive sm:col-span-2 lg:col-span-3">
          {state.error}
        </p>
      )}
    </form>
  );
}
