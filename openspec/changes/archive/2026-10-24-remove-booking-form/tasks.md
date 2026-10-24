# Tasks

## 1. Remove the form from the site

- [x] 1.1 Remove `BookingModal` from `src/app/layout.tsx` and `BookNowButton` from `src/app/page.tsx`, `src/app/price/page.tsx` and `src/app/rooms/[slug]/page.tsx`. Verify: `grep -rn "BookNowButton\|BookingModal" src` finds only the component files themselves.
- [x] 1.2 Delete `src/components/BookingForm.tsx`, `BookingModal.tsx`, `BookNowButton.tsx`; remove `bookingEndpoint` from `src/lib/site.ts` and `bookingRoomOptions` from `src/lib/rooms.ts`. Verify: `npm run build` and `npm run lint` pass, and `grep -rniE "booking|mail2.php|open-booking" src` finds nothing.
- [x] 1.3 Check the built site. Verify: `out/` contains no `myform` and no `mail2.php`; home, /price and a room page show no booking button on desktop and mobile widths; the cookie banner still appears.

## 2. Update the docs

- [x] 2.1 Correct statements that are no longer true in `AGENTS.md`, `README.md`, `openspec/config.yaml` and the parent `static-sites/AGENTS.md`. Verify: grep for "booking form" leaves only mentions that say it was removed or describe how to restore it.

## Workflow follow-up

- Archive with `openspec archive remove-booking-form --yes` (specs are skipped).
- A redeploy is needed to put this on a live host; it is not part of this change.
