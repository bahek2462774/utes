# Proposal

## Why

The season is over and the hotel does not need booking requests right now. The
owner decided on 2026-10-24 to take the form off the site instead of keeping a
form that collects personal data nobody is answering, and to postpone the
Roskomnadzor notification until bookings are needed again.

## What Changes

- Remove the booking form, the floating "Бронирование" button and every
  "Забронировать номер" button (home hero, /price, room pages).
- Delete the code that only served the form: BookingForm, BookingModal,
  BookNowButton, the booking room options and the booking endpoint setting.
- Keep /privacy, /consent, /cookies, the cookie banner (it covers the embedded
  YouTube video and Yandex map, not the form), the footer legal links and the
  operator requisites placeholder.
- Phone numbers and e-mail stay in the header, footer and /contacts.
- No page text, title, meta description, price or photo changes.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

None. `openspec/specs/` has no capabilities yet, so `skip_specs: true` is set
in `.openspec.yaml` for this change.

## Impact

- Code: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/price/page.tsx`,
  `src/app/rooms/[slug]/page.tsx`, `src/lib/site.ts`, `src/lib/rooms.ts`;
  deleted `src/components/BookingForm.tsx`, `BookingModal.tsx`,
  `BookNowButton.tsx`.
- Docs: `AGENTS.md`, `README.md`, `openspec/config.yaml`, and the parent
  `static-sites/AGENTS.md`.
- The form used to post to `https://utesatlantic.ru/mail2.php`, a PHP file of
  the old Joomla site. With the form gone, nothing on the new site depends on
  that file.
- /privacy and /consent still describe the form. This is deliberate for now.
