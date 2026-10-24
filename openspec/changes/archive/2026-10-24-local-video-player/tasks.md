# Tasks

## 1. Assets

- [x] 1.1 Put `utes.mp4` and `utes-poster.jpg` in `public/video/`. Verify: ffprobe shows H.264 and AAC, 720p, duration about 732.9 s, the moov atom comes before mdat, and the file is about 67.5 MB.

## 2. Player

- [x] 2.1 Add `video.js@8.24.1`, the type shim, `VideoPlayer.tsx`, swap the iframe in `src/app/page.tsx`, and replace `videoEmbedId` in `src/lib/site.ts` with `video`. Verify: `npm run build` and `npm run lint` pass and `grep -rni "youtube" src` finds nothing.
- [x] 2.2 Check it in a browser. Verify: before scrolling, the page requests neither a video.js chunk nor the `.mp4`; near the video the player appears with the poster and Russian controls; Play moves `currentTime`; no request goes to youtube.com; the layout is fine at 375 px.

## 3. Texts and docs

- [x] 3.1 Update `/cookies`, `CookieBanner`, `openspec/config.yaml` and the workspace `AGENTS.md`. Verify: grep for "YouTube" in `src` and the docs leaves only historical notes.

## Workflow follow-up

- Archive with `openspec archive local-video-player --yes` (specs are skipped).
- Deploy only after the owner confirms the right to host the video; after the first deploy check that the server answers a Range request with 206.
