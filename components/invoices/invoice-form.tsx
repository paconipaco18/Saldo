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
      className="rounded-2xl border border-border bg-card p-5 sm:p-7"
    >
      <div className="mb-6">
        <h2 className="text-base font-medium tracking-tight">Add invoice</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Record a new invoice to start tracking it.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="clientName">Client name</Label>
          <Input id="clientName" name="clientName" required />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="clientEmail">Client email</Label>
          <Input
            id="clientEmail"
            name="clientEmail"
            type="email"
            placeholder="Optional"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="clientLanguage">Client language</Label>
          <NativeSelect
            id="clientLanguage"
            name="clientLanguage"
            defaultValue="es"
            className="w-full"
          >
            <NativeSelectOption value="es">Español</NativeSelectOption>
            <NativeSelectOption value="en">English</NativeSelectOption>
          </NativeSelect>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="currency">Currency</Label>
          <NativeSelect
            id="currency"
            name="currency"
            defaultValue="USD"
            className="w-full"
          >
            <NativeSelectOption value="USD">USD</NativeSelectOption>
            <NativeSelectOption value="EUR">EUR</NativeSelectOption>
            <NativeSelectOption value="VES">VES</NativeSelectOption>
          </NativeSelect>
        </div>

        <div className="hidden lg:block" />

        <div className="flex flex-col gap-2">
          <Label htmlFor="issueDate">Issue date</Label>
          <Input id="issueDate" name="issueDate" type="date" required />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="dueDate">Due date</Label>
          <Input id="dueDate" name="dueDate" type="date" required />
        </div>

        <div className="flex items-end">
          <Button type="submit" disabled={pending} className="w-full sm:w-auto">
            {pending ? "Adding..." : "Add invoice"}
          </Button>
        </div>

        {state.error && (
          <p className="text-sm text-destructive sm:col-span-2 lg:col-span-3">
            {state.error}
          </p>
        )}
      </div>
    </form>
  );
}
