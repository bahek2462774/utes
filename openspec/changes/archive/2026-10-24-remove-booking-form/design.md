# Design

## Context

The form is a client-only modal: `BookingModal` is mounted in the root layout and
`BookNowButton` opens it through a window event. Everything form-specific sits
in three components plus two data entries, so the removal is mechanical. See
proposal.md for the reason.

## Goals / Non-Goals

**Goals:**
- No dead code left behind.
- The form can be restored from git history.

**Non-Goals:**
- Editing the text of /privacy and /consent (they keep describing a form until
  it returns).
- Touching the footer requisites placeholder or filing anything with
  Roskomnadzor (owner, later).

## Decisions

- Delete the form code instead of leaving it unmounted. Unmounted components
  drift out of date, and git keeps the history. A feature flag was rejected as
  speculative.
- Keep the legal pages and the cookie banner: they cost nothing, were already
  accepted, and the banner is about the video and map.
- To restore: `git log --diff-filter=D --name-only -- src/components/BookingForm.tsx`
  finds the deleting commit; revert it (or check the files out from its
  parent). Then re-read /privacy and /consent, and make sure a mail backend
  exists on the target host.

## Risks / Trade-offs

- /privacy and /consent mention a form that does not exist for now. Acceptable
  for the off-season; revisit the wording if the pause gets long.
- The old mailer URL (`https://utesatlantic.ru/mail2.php`) belongs to the old
  Joomla install. If that install is wiped from the host, restoring the form
  needs a new mail backend.
