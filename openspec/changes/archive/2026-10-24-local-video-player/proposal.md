# Proposal

## Why

YouTube is blocked in Russia, so the video embedded on the home page does not
play for most of the audience. The embed also pulls Google resources and sets
third-party cookies. On 2026-10-24 the owner asked to host the video ourselves
with a popular open-source player and to keep the site free of third-party
scripts and CSS where possible.

## What Changes

- Download the video "Отдых в Утёсе" (YouTube id kGZJUxxRH8c, channel Crystal,
  12:13) and publish a web-optimized copy as `public/video/utes.mp4` with a
  poster `public/video/utes-poster.jpg`.
- Replace the YouTube iframe on the home page with a `VideoPlayer` component
  built on video.js, installed from npm and bundled with the site. It is loaded
  only when the player section nears the viewport and uses `preload: "none"`,
  so the file is not fetched until Play.
- Update `/cookies` and the cookie banner text: the video no longer involves a
  third party. Only the Yandex map on /contacts (loaded on click) remains.
- Record the audit result: the site loads no third-party scripts, CSS or fonts
  at runtime (the Inter font is downloaded at build time by next/font and
  served from our own host).

## Capabilities

### New Capabilities

None.

### Modified Capabilities

None. `openspec/specs/` has no capabilities yet, so `skip_specs: true` is set
in `.openspec.yaml`.

## Impact

- Code: `src/app/page.tsx`, `src/lib/site.ts`, `src/app/cookies/page.tsx`,
  `src/components/CookieBanner.tsx`; new `src/components/VideoPlayer.tsx` and
  `src/types/videojs-core.d.ts`; new dependency `video.js@8.24.1`.
- Repo and deploy: +67.5 MB in git, and the deploy uploads the file.
- Docs: `openspec/config.yaml`, the workspace `AGENTS.md`.
- Rights: the video belongs to the channel "Crystal" (standard YouTube
  license). Hosting a copy is for the owner to confirm before it goes live.
