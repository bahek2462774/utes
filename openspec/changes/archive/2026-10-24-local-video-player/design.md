# Design

## Context

The home page ends with a section that embeds a YouTube iframe. The site is a
static export, so the player must be a client component, and everything it
needs has to ship in the build. See proposal.md for the reason.

## Goals / Non-Goals

**Goals:**
- No third-party request for the video.
- No JavaScript cost for visitors who never reach the video.

**Non-Goals:**
- Adaptive streaming (HLS/DASH), several qualities, subtitles.
- Localizing the Yandex map (a separate decision).

## Decisions

- Encode: 720p H.264 High, CRF 31, preset slow, AAC 96 kbps stereo,
  `+faststart`. 152 MB source became 67.5 MB. A 60-second test showed 720p at
  CRF 28 would be about 111 MB, too close to GitHub's 100 MB file limit, and
  480p at CRF 26 gave the same size as 720p at CRF 31 with less detail.
- Player: video.js 8.24.1. The `latest` tag is now 10.x, a rewrite with a
  different API; the 8.x line is the long-established one. Use the core build
  (`video.js/core.es.js`: no HLS/DASH engine, 72 KB gzip against 196 KB for the
  full build) because the site only plays one progressive MP4. The core entry
  ships without typings, so a small module shim reuses the main typings.
  Alternatives: a native `<video controls>` (no JavaScript at all, but the UI
  differs per browser); other open-source players were not requested.
- Lazy start: an IntersectionObserver with a 400 px margin triggers a dynamic
  import. Until then the host box shows the poster as a CSS background, and
  after init `preload: "none"` keeps the MP4 unfetched until Play.
- Controls speak Russian through `video.js/dist/lang/ru.json`.
- The poster is YouTube's own thumbnail (what the old embed showed),
  1280x720, recompressed to about 100 KB.

## Risks / Trade-offs

- A 67.5 MB binary lives in git history, and every re-encode adds that again.
  GitHub warns above 50 MB. If the video changes often, move it to Git LFS.
- The deploy tool re-uploads every file each time, so the video adds about a
  minute per deploy. Skipping unchanged large files can be added if it hurts.
- Seeking needs HTTP Range support on the host; check for a 206 answer after
  the first deploy.
- Rights to the video must be confirmed by the owner (see proposal.md).

## Addendum: final encode

After review the owner asked for a lighter file, so the shipped `utes.mp4` is
480p (854x480), CRF 30, AAC 64 kbps, faststart, 39.5 MB. The 720p numbers above
describe the first attempt.
