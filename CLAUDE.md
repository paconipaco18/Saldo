# Saldo

## What this is
Saldo helps small B2B businesses (freelancers, micro-agencies, small wholesalers) get
paid faster. Users track their unpaid invoices; Saldo shows who to chase each day and
uses AI to draft the follow-up message in the right tone and language — polite first,
firmer as the invoice ages. The user approves before anything sends.

## Who it's for
Solo and very small B2B operators who invoice other businesses and hate chasing payments.
Bilingual from day one (English + Spanish).

## Stack
Next.js (App Router) + TypeScript + Tailwind + shadcn/ui. Supabase for database + auth.
Anthropic (Vercel AI SDK) for drafting reminders. Deployed on Vercel.

## Core loop
Add invoice -> app flags it as due/overdue -> AI drafts a reminder -> user approves -> logged.

## Rules
- All model calls go through server route handlers, never the client.
- Validate every input with zod.
- After any change, run `pnpm lint` and `pnpm build` and fix errors before finishing.
- Commit after each working feature with a conventional-commit message.
