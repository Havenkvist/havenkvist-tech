# Havenkvist Tech

Marketing site and contact funnel for Havenkvist Tech, a freelance fullstack
web development business based in Haslev, Denmark. Built with Next.js
(App Router) and TypeScript.

## Domain-based i18n

There are no `/da/` or `/en/` URL prefixes. Language is selected by hostname
and rewritten internally by `src/proxy.ts`:

- `havenkvist-tech.dk` → Danish (`da`), localized slugs (e.g. `/priser`)
- `havenkvist-tech.com` → English (`en`), localized slugs (e.g. `/pricing`)

Locally (or on any other hostname), the locale falls back to a `NEXT_LOCALE`
cookie so both languages can still be previewed. Locale config, route slugs,
and canonical URL helpers live in `src/i18n/config.ts`; translated strings are
in `src/i18n/dictionaries/{da,en}.json`.

Pages live under `src/app/[lang]/` (home, about, services, portfolio,
pricing, contact) and are reached only via the rewritten paths above.

## Tech stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Email:** [Resend](https://resend.com), via the route handler at
  `src/app/api/contact/route.ts`
- **Analytics:** `@vercel/analytics`
- **Deployment:** Vercel (Hobby plan)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use the language
switcher or the `NEXT_LOCALE` cookie to preview the other locale, since
domain-based routing doesn't apply on localhost.

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Required to send contact form emails via Resend. |
| `CONTACT_TO_EMAIL` | Inbox the contact form delivers to. |
| `CONTACT_FROM_EMAIL` | Verified "from" address (use Resend's shared `onboarding@resend.dev` sender until a custom domain is verified). |
| `GOOGLE_SITE_VERIFICATION` | Optional Google Search Console verification token. |

Secrets are never committed; in production they're managed via the Vercel
dashboard.

## Deployment

Automatic production deployments are disabled. Pushes to `main` build as
Vercel **Preview** deployments; a build is manually promoted to Production
from the Vercel dashboard once a feature is complete.

## Scripts

```bash
npm run dev     # start the dev server
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```
