# CLAUDE.md

## Project Overview

Myanmar Software Engineers (MMSWE) — a community platform showcasing Myanmar software engineers with profile listings and blog functionality. Static site deployed to GitHub Pages at mmswe.com.

## Tech Stack

- **Framework**: Next.js 13.5.4 (App Router, TypeScript, static export)
- **Package Manager**: Bun (primary)
- **Styling**: Tailwind CSS + DaisyUI + Sass
- **Content**: Contentlayer with MDX (profiles and blogs)
- **Animation**: Framer Motion, Three.js / React Three Fiber
- **Path alias**: `@/*` → `./src/*`

## Commands

```bash
bun install          # Install dependencies
bun dev              # Dev server
bun run build        # Build static site (output: ./out)
bun run serve        # Serve static build locally
bun run lint         # ESLint
bun run content:build # Build contentlayer content
bun run commit       # Interactive gitmoji commit helper
```

## Project Structure

```
src/
  app/               # Next.js App Router pages (blog, profile, contact-us)
  components/        # Reusable React components (Animate, Common, Profile, Ui)
  config/            # App configuration
  data/              # Static data (animation variants, icon list)
  hooks/             # Custom React hooks
  styles/            # Global styles (SCSS)
  utils/             # Utilities (profileHelper.ts for filtering/search)
content/
  profile/           # Developer profiles (.mdx files)
  blog/              # Blog posts (.mdx files)
```

## Content Schemas

**Profile** (`content/profile/*.mdx`):
```yaml
name: string (required)
description: string
tags: string[]         # Technology tags
image: string          # GitHub avatar URL
```

**Blog** (`content/blog/*.mdx`):
```yaml
title: string (required)
description: string
date: date (required)
published: boolean (default: true)
```

## Commit Convention

Uses **gitmoji** commits enforced by commitlint + Husky. Format: `:emoji: type(scope): message`

Key types:
- `:fire: build(profile): add <name> profile` — new profiles
- `:beers: build(blog): add <name> blog` — new blogs
- `:sparkles: feat: <description>` — new features
- `:bug: fix: <description>` — bug fixes
- `:lipstick: style: <description>` — UI/UX changes
- `:recycle: refactor: <description>` — refactoring

## Screenshots

Save all screenshots (including Playwright MCP captures) to the `screen-shot/` folder in the project root.

## CI/CD

GitHub Actions (`.github/workflows/build.yml`): on push/PR to `main`, installs with Bun, builds, deploys to GitHub Pages.
