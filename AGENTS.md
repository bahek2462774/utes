<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Agent instructions — Отель Атлантик site

Read this before doing anything in this repo. It's short on purpose — the full
project context (tech stack, content-fidelity rules, deployment) lives in
`openspec/config.yaml` and is loaded automatically by OpenSpec tooling; this
file is the map to find things, not a duplicate of them.

## What this repo is, in one paragraph

A static (Next.js `output: "export"`) rebuild of the real hotel site
https://utesatlantic.ru/, styled with Tailwind, deployed by FTP to
http://utes2.duckdns.org/. There is no backend here — the booking form posts
straight to the original site's PHP mailer. Full detail: `openspec/config.yaml`
(`context:` field) and `README.md`.

## Before you touch content

This project has one hard rule: content must stay faithful to the live site
(text, prices, phone numbers, titles — including the original's existing typos
and odd whitespace in `<title>`/meta tags, which were intentionally preserved,
not missed). If you're changing anything user-visible, check it against the
matching page on https://utesatlantic.ru/ first. See "Content-fidelity rules"
in `openspec/config.yaml` for the specifics.

## How we use OpenSpec here

This repo uses [OpenSpec](https://github.com/Fission-AI/OpenSpec)
(`@fission-ai/openspec`) for spec-driven planning of anything beyond a trivial
one-line fix. Claude Code integration is installed (`.claude/commands/opsx/*`,
`.claude/skills/openspec-*`), so the `/opsx:*` slash commands work directly;
everything below also has a plain `openspec <command>` CLI equivalent for
non-Claude agents.

**Layout:**

- `openspec/config.yaml` — project context + per-artifact rules the agent
  should apply automatically (read this once per session).
- `openspec/specs/` — the current, accepted specification of the system,
  organized by capability. This is the source of truth for "how it's supposed
  to work today."
- `openspec/changes/<change-name>/` — an in-progress or proposed change:
  `proposal.md` (what & why), `specs/<capability>/spec.md` (the delta against
  the main spec), `design.md` (how), `tasks.md` (implementation checklist).
- `openspec/changes/archive/` — completed changes, after their delta specs
  have been merged into `openspec/specs/`.

**Workflow — when to create a change vs. just editing:**

- Trivial fix (typo, one price, a broken link): just fix it, no change needed.
- Anything else (a new page/section, a behavior change, a content overhaul, a
  redesign of a component, changing the deploy process): open a change first.

**Commands** (slash form first, CLI form in parens):

1. `/opsx:propose "<description>"` (`openspec new change <kebab-name> ...`) —
   creates `openspec/changes/<name>/` with proposal/spec-delta/design/tasks.
   This step is planning only — it must not touch project code.
2. Get explicit go-ahead from the user on the proposal before implementing.
3. `/opsx:apply <name>` (`openspec instructions apply --change <name>`) —
   implement the tasks. Follow the `operations.apply.guidance` in
   `openspec/config.yaml` (build + lint after any change; diff content changes
   against the live site).
4. `/opsx:archive <name>` (`openspec archive <name>`) — merges the delta spec
   into `openspec/specs/` and files the change under `changes/archive/`. Note
   whether the change needs a redeploy (see below).

Use `openspec status --change <name>` any time to see what's left in a change,
and `openspec validate` to sanity-check artifacts before archiving.

## Build & verify

```bash
npm run build   # required before every deploy — this ships as a static export
npm run lint
```

`npm run dev` for local iteration. There is no test suite (small static
brochure site) — `build` + `lint` + a manual check against the live original
is the verification loop.

## Deploying

Manual, no CI: `npm run build` produces `out/`; upload its contents over FTP to
the host's document root. Credentials and the exact upload command are in
`deploy/README.md` (yes, the password is committed there, base64-encoded and
temporary — that file explains why; don't "fix" it by removing it without
asking).
