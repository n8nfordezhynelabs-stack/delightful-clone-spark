# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**delightful-clone-spark** is a React + TypeScript website built with Vite, Tailwind CSS, and shadcn/ui. Generated via Lovable, it serves as a portfolio/business website for Dezhyne Labs with integrated N8n chat automation.

**Key tech**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Router v6, TanStack Query (React Query), Zod form validation, Supabase integration.

## Build & Development Commands

```bash
# Development server (hot reload on port 8080)
npm run dev

# Production build
npm build

# Development build (unminified, faster for debugging)
npm run build:dev

# Preview production build locally
npm run preview

# Lint check
npm run lint

# Run all tests (one-shot)
npm run test

# Run tests in watch mode (auto-rerun on changes)
npm run test:watch
```

## Architecture & Code Organization

### Directory Structure
- **src/pages/** — Page components (Index, Services, Portfolio, Blog, Contact, NotFound). Each is a full-page route.
- **src/components/home/** — Home page sections (HeroSection, ApproachSection, ServicesPreview, BlogPreview, CTASection).
- **src/components/layout/** — Reusable layout components (Layout, Navbar, Footer).
- **src/components/ui/** — shadcn/ui primitive components (auto-generated; do not edit directly).
- **src/components/N8nChat.tsx** — **Critical:** n8n webhook-based chat widget. Injected into DOM on mount; contains webhook URL and branding. ⚠️ Comment says "KEEP THIS EXACTLY HERE" — do not move or refactor without understanding its DOM injection side effects.
- **src/hooks/** — Custom React hooks.
- **src/integrations/supabase/** — Supabase client setup.
- **src/lib/** — Utility functions (e.g., `cn()` for Tailwind class merging).
- **src/test/** — Test setup and helpers.
- **src/styles/** — Global CSS and theme variables.

### Routing & Pages

React Router v6 (BrowserRouter at App level). Routes:
- `/` → Index (home)
- `/services` → Services page
- `/portfolio` → Portfolio showcase
- `/blog` → Blog listing
- `/contact` → Contact form
- `/*` → NotFound (catch-all)

All pages are wrapped in `<Layout>` which includes Navbar + Footer.

### Design System & Styling

- **Tailwind CSS** with CSS variables for theming (defined in index.css, referenced in tailwind.config.ts).
- **shadcn/ui** for accessible, unstyled-by-default components (Button, Dialog, Form, Select, etc.).
- **Prefix**: Empty (no tw- prefix).
- **Dark mode**: Class-based (`darkMode: ["class"]`).
- **Custom colors & animations**: See tailwind.config.ts for sidebar, accent, and accordion animations.
- Tailwind scope: src/**/*.{ts,tsx}, pages/**, components/** — ensure all CSS files are in these paths.

### State Management & Data Fetching

- **TanStack Query (React Query)** for server state (QueryClient configured in App.tsx).
- **React Hook Form** + **Zod** for form validation and submission (see contact form if exists).
- **Supabase JS SDK** for real-time database & auth (client initialized in src/integrations/supabase/).

### N8n Chat Widget (Special)

The `<N8nChat />` component must remain at the top level of App.tsx (inside QueryClientProvider but before BrowserRouter). It:
- Injects a DOM widget on first mount (detects via `window.__DEXHYNE_CHAT__` flag to prevent duplication).
- Posts to a hardcoded webhook: `https://n8n.srv1082505.hstgr.cloud/webhook/9dbadb91-434e-4c43-8c1b-a797ec107646/chat`.
- Generates UUIDs for session management.
- Sanitizes HTML responses (converts markdown links, bold, bullet points, line breaks).
- Renders a floating chat icon + expandable chat box.
- **Do not move, remove, or heavily refactor without testing the DOM widget behavior.**

## Testing

- **Framework**: Vitest (configured in vitest.config.ts).
- **Test files**: Include `.test.ts`, `.test.tsx`, `.spec.ts`, `.spec.tsx` anywhere in src/.
- **Setup**: src/test/setup.ts runs before all tests; configure testing-library globals there.
- **Environment**: jsdom (for DOM testing in Node.js).
- **Libraries**: Testing Library (React), Jest DOM matchers.

Run `npm run test:watch` during development; use `npm run test` before commits.

## Build & Deploy Checklist

- Build succeeds: `npm run build` (chunk size warning at 1500KB — acceptable).
- Lint passes: `npm run lint`.
- Tests pass: `npm run test`.
- N8n webhook URL and branding are correct in src/components/N8nChat.tsx.
- Environment variables: `.env` file exists (not in repo; configure per environment).
- Lovable tagger: `lovable-tagger` is a dev dependency; triggers in dev mode to track components for Lovable editor.

## Type Safety & Linting

- **TypeScript**: Strict mode disabled (noImplicitAny, strictNullChecks off) for flexibility; baseUrl & path aliases configured.
- **ESLint**: Recommended config with React Hooks and React Refresh plugins. Rule: `react-refresh/only-export-components` warns if non-component exports are in .tsx files.
- **Alias**: `@/*` → `src/*` (used throughout for clean imports).

## Key Dependencies & Notes

- **@n8n/chat** (v1.4.0) — N8n chat widget library (separate from custom N8nChat component; may be deprecated in favor of N8nChat.tsx).
- **@radix-ui** — Headless component primitives (27+ packages; fully integrated with shadcn/ui).
- **next-themes** — Dark mode provider (integrates with Tailwind dark mode).
- **embla-carousel-react** — Carousel component for image galleries.
- **recharts** — Charts library (if used for analytics/visualizations).
- **sonner** — Toast notifications (alternative to shadcn Toaster).

## IDE & Editor Setup

- Path alias `@/` is configured in tsconfig.json and Vite (vite.config.ts). Most IDEs respect this; ensure intellisense works for `@/components`, etc.
- Use SWC for faster TypeScript transpilation (via @vitejs/plugin-react-swc).

## Common Pitfalls

1. **Moving N8nChat**: The widget uses DOM injection. If moved or removed, chat functionality breaks. Test DOM carefully.
2. **Tailwind scoping**: Add new CSS files to tailwind.config.ts `content` array if they contain CSS classes.
3. **shadcn/ui upgrades**: Run `npx shadcn-ui@latest add <component>` to add new components; do not manually copy from docs.
4. **Form validation**: Use React Hook Form + Zod together; see contact page for example pattern.
5. **Dark mode**: Use `dark:` prefix in Tailwind; ensure theme variables are defined in CSS.

## Further Customization

- **Lovable editor**: Original design is in Lovable (URL in README). Changes via IDE will sync back to Lovable on push.
- **Supabase**: Set up real-time subscriptions in hooks if needed; ensure RLS policies are correct.
- **Environment variables**: Add to `.env` and reference via `import.meta.env.VITE_*` (Vite convention).
