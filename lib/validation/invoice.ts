import { z } from "zod";

export const invoiceSchema = z.object({
  clientName: z.string().min(1, "Client name is required."),
  clientEmail: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value ? value : undefined))
    .refine((value) => value === undefined || z.email().safeParse(value).success, {
      message: "Enter a valid email address.",
    }),
  clientLanguage: z.enum(["es", "en"]),
  amount: z.coerce.number().positive("Amount must be greater than 0."),
  currency: z.enum(["USD", "EUR", "VES"]),
  issueDate: z.iso.date("Enter a valid issue date."),
  dueDate: z.iso.date("Enter a valid due date."),
});

export type InvoiceInput = z.infer<typeof invoiceSchema>;

export type InvoiceActionState = {
  error: string | null;
};

export const initialInvoiceActionState: InvoiceActionState = {
  error: null,
};
