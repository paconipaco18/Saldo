import { z } from "zod";

export const reminderRequestSchema = z.object({
  invoiceId: z.uuid("Invalid invoice id."),
});
