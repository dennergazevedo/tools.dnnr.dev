# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev        # Start dev server at localhost:3000
yarn build      # Production build
yarn lint       # ESLint via next lint
```

No test suite is configured.

## Architecture

**Next.js 14 App Router** project using TypeScript, Tailwind CSS, Radix UI primitives, and shadcn/ui-style components. The app is a collection of developer utilities.

### Route structure

- `src/app/(home)/` — Landing page (separate layout, no sidebar)
- `src/app/tools/` — All tools, wrapped in a sidebar layout (`layout.tsx` renders `<Sidebar>` + `<main>`)
- `src/app/auth/` — Login/register pages with their own layout
- `src/app/api/` — Next.js Route Handlers (REST endpoints for auth, todo, bookmark, color-palette)

### Adding a new tool

Each tool lives at `src/app/tools/<tool-name>/` and follows a consistent pattern:

1. `page.tsx` — renders `<PageHeader>` + a `<MenuTabs>` component
2. `tabs.tsx` — Radix `<Tabs.Root>` with `<TabItem>` per sub-tool; reads active tab from `?tab=` search param
3. `tabContent.tsx` — switch/render based on `currentTab`
4. `tools/<ToolName>.tsx` — the actual tool UI component

Register the new route in `src/components/Sidebar/Navigation/index.tsx` by adding a `<NavItem>`.

### Auth & persistence

- **Auth**: JWT stored as HTTP-only cookie `@dnnr:authToken`. `AuthContextProvider` (wraps entire app in `src/app/layout.tsx`) exposes `useAuth()` hook for login/logout/register.
- **Middleware** (`src/middleware.ts`): guards `/api/todo/*` and `/api/auth/user` — returns 401 if cookie is missing.
- **Database**: Neon serverless Postgres via `src/lib/db.ts`. Requires `DATABASE_URL` env var. Schema is at `src/db/schema.sql` (tables: `users`, `todos`, `bookmarks`, `color_palettes`).
- Most tools are **purely client-side** (no DB). Only To Do, Bookmarks, and Color Palettes have server persistence.

### Shared UI conventions

- `src/components/ui/` — base design-system components (Button, Alert, Popover, etc.)
- `src/components/Form/` — composite form primitives: `Input`, `Select`, `FileInput`, `Textarea`
- `src/components/Sidebar/` — app shell sidebar with navigation
- `src/components/TabItem.tsx` — styled Radix tab trigger used across all tool pages
- `src/components/ui/page-header.tsx` — standard header used at the top of every tool page (icon + title + description + separator)
- Toasts use `sonner` (`toast(...)`)
- Dark theme only — background is `zinc-900`, accents are `sky-500`

### Utilities

- `src/utils/request.ts` — axios instance pointing to `https://api.dnnr.dev`
- `src/utils/cookie.ts` — cookie helpers
- `src/utils/constants.ts` — `API_URL`
- `src/lib/utils.ts` — `cn()` (clsx + tailwind-merge)
