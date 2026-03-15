# AI Support Assistant

A chat-style support assistant that uses OpenAI to classify user inquiries into **Billing**, **Technical**, or **General** categories and returns the appropriate response.

## Tech Stack

- **Framework** — [Next.js 16](https://nextjs.org/) (App Router)
- **Language** — TypeScript (strict mode)
- **Styling** — [Tailwind CSS v4](https://tailwindcss.com/) with a custom design-system token layer
- **AI** — [OpenAI SDK](https://github.com/openai/openai-node) (`gpt-4o-mini`)
- **Theming** — [next-themes](https://github.com/pacocoursey/next-themes) (dark / light)

## Architecture

```
app/                  → Next.js App Router pages & API routes
  api/classify/       → POST endpoint — validates input, classifies, returns response
components/           → Shared UI (ThemeButton, ThemeProvider, icons)
features/support/     → Feature module (components, API client, types, utils)
lib/                  → Server-side logic (OpenAI classify, response mapping)
```

Key decisions:

- **Feature-based structure** — all support-related code lives under `features/support/` for colocation.
- **Discriminated union types** — `SupportMessage` uses a `type` discriminator (`"user" | "assistant"`) for type-safe rendering.
- **Design tokens via CSS custom properties** — semantic colors defined in `app/design-system.css`, consumed by Tailwind utilities. Dark theme overrides via `[data-theme="dark"]`.
- **Server-side classification** — the OpenAI call and response mapping happen in the API route so the API key never reaches the client.

## Getting Started

### Prerequisites

- Node.js 18+
- An [OpenAI API key](https://platform.openai.com/api-keys)

### Setup

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Edit .env.local and add your OPENAI_API_KEY

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `OPENAI_API_KEY` | Yes | OpenAI API key for classification |
