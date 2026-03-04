# NoPrompt — Project Guide

## What This Is
A research/educational website exploring **prompt hashing** — transforming LLM prompts into compact, privacy-preserving representations. Built with Next.js 16 (App Router) + Tailwind CSS v4. No real LLM API calls — all self-contained.

## Tech Stack
- **Next.js 16** with App Router, TypeScript, `src/` directory
- **Tailwind CSS v4** — config is in `src/app/globals.css` via `@theme inline` (NOT tailwind.config.ts)
- **Node 20+** required (use `nvm use 22` on this machine)
- Fonts: Inter (body) + JetBrains Mono (code) via `next/font/google`

## Project Structure
```
src/
├── app/                    # Pages (6 routes)
│   ├── page.tsx            # Landing page
│   ├── how-it-works/       # 7 techniques explained
│   ├── demo/               # Interactive demo (5 tabs)
│   ├── service/            # Conceptual service architecture
│   ├── limitations/        # Limitations + FAQ
│   └── papers/             # 52 research papers
├── components/
│   ├── ui/                 # Reusable: Button, Card, CodeBlock, SectionHeading, Badge, Select
│   ├── layout/             # Navbar, Footer
│   ├── shared/             # AnimatedBackground
│   ├── landing/            # Hero, Features, HowItWorksPreview, CTA, ResearchBanner, ResearchContext
│   ├── how-it-works/       # TechniqueCard, ProcessDiagram, MetricsTable
│   ├── demo/               # PromptInput, HashingAnimation, HashOutput, ResponseComparison,
│   │                       # MetricsDisplay, ObfuscationPanel, PeftSimulation, RealHashPanel, LSHDemo
│   ├── service/            # PricingCard, IntegrationExample, ModelsList
│   ├── limitations/        # LimitationCard, ComparisonTable, FAQAccordion
│   └── papers/             # PaperCard, PaperFilters
├── lib/
│   ├── constants.ts        # Nav links, features, pricing, limitations, FAQs
│   ├── techniques.ts       # 7 technique definitions
│   ├── demo-data.ts        # Pre-built prompt-response pairs
│   ├── hash-utils.ts       # Deterministic fake hash generation + scramble animation
│   ├── crypto-utils.ts     # Real SHA-256, FNV hash, LSH implementation, tokenizer
│   ├── obfuscation.ts      # Real obfuscation: tokenShuffle, synonymReplace, semanticCompress, charEncode/Decode
│   └── papers-data.ts      # 52 research papers data
├── hooks/                  # useTypingAnimation, useIntersectionObserver, useHashAnimation
└── types/index.ts          # All TypeScript interfaces
```

## Design System
- **Colors**: `neon-cyan` (#00FFFF), `neon-purple` (#A855F7), `surface` (#0A0A0F), `surface-1` (#111118), `surface-2` (#1A1A24), `border` (#2A2A3A), `muted` (#8888AA)
- **Style**: Dark, techy, minimal (Vercel/Linear aesthetic)
- **Animations**: CSS only — fade-in, slide-up, pulse-glow, grid-flow, hash-scramble, typing-cursor

## Key Conventions
- Server components by default; add `'use client'` only when needed (state, effects, event handlers)
- All client-side algorithms are real and deterministic (same input = same output)
- Research framing: this is educational, not a production service
- No external UI libraries — Tailwind only
- Import alias: `@/*` maps to `./src/*`

## Commands
```bash
nvm use 22          # Required on this machine (Node 16 is default but too old)
npm run dev         # Dev server at localhost:3000
npm run build       # Production build
npm run lint        # ESLint
```

## Exposing Locally via Cloudflare Tunnel
No account needed. Creates a temporary public HTTPS URL tunneling to localhost.

```bash
# 1. Download cloudflared (one-time)
curl -L --output /tmp/cloudflared https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64
chmod +x /tmp/cloudflared

# 2. Start the dev server
nvm use 22
npm run dev    # runs on localhost:3000

# 3. In another terminal, start the tunnel
/tmp/cloudflared tunnel --url http://localhost:3000
```

Cloudflared will print a public URL like `https://random-words.trycloudflare.com`. Share that URL — it works as long as both the dev server and the tunnel are running. Kill either to stop exposing.

## GitHub
- Repo: https://github.com/opcastil11/NoPrompt
- Branch: `main`
