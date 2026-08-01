"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Status = "idle" | "streaming" | "done" | "error";

export function DraftReminderDialog({
  invoiceId,
  clientName,
}: {
  invoiceId: string;
  clientName: string;
}) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  async function draft() {
    setText("");
    setCopied(false);
    setStatus("streaming");

    try {
      const response = await fetch("/api/draft-reminder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId }),
      });

      if (!response.ok || !response.body) {
        setStatus("error");
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setText(full);
      }

      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (nextOpen) {
      draft();
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button type="button" variant="outline" size="sm" />}>
        Draft reminder
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reminder for {clientName}</DialogTitle>
        </DialogHeader>
        <div className="min-h-32 whitespace-pre-wrap rounded-md border bg-muted/30 p-3 text-sm">
          {text || (status === "streaming" ? "Drafting..." : "")}
        </div>
        {status === "error" && (
          <p className="text-sm text-destructive">
            Something went wrong. Please try again.
          </p>
        )}
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!text}
            onClick={handleCopy}
          >
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
