# Saldo

Saldo helps small B2B businesses (freelancers, micro-agencies, small wholesalers) get
paid faster. Users track their unpaid invoices; Saldo shows who to chase each day and
uses AI to draft the follow-up message in the right tone and language — polite first,
firmer as the invoice ages. The user approves before anything sends.

Bilingual from day one (English + Spanish).

**Core loop:** Add invoice → app flags it as due/overdue → AI drafts a reminder → user
approves → logged.

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4 + [shadcn/ui](https://ui.shadcn.com) (`base-nova` preset, built on
  [Base UI](https://base-ui.com) rather than Radix)
- [Supabase](https://supabase.com) — database + auth
- [Vercel AI SDK](https://sdk.vercel.ai) with Anthropic — drafts reminder messages
- pnpm

## Local setup

```bash
pnpm install
cp .env.local.example .env.local
# fill in the values below, then:
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Scope | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Client-exposed | Supabase project URL. Supabase dashboard → Project Settings → API. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Client-exposed | Supabase publishable/anon key. Same page as above. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only | Supabase service role key. Same page — keep this secret, never expose it to the client. |
| `ANTHROPIC_API_KEY` | Server-only | Needed for the AI draft-reminder feature. Get one at [console.anthropic.com](https://console.anthropic.com). The app builds and runs without it, but "Draft reminder" won't work until it's set. |

All model calls run only inside server route handlers (`app/api/**/route.ts`) — never
in a client component.

## Scripts

```bash
pnpm dev      # start the dev server
pnpm lint     # eslint
pnpm build    # production build
pnpm start    # run the production build
```

## Deployment

Deployed on [Vercel](https://vercel.com), connected to this repo's `main` branch. Set
the environment variables above in the Vercel project settings before deploying.
