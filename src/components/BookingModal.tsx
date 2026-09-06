"use client";

import { useEffect, useRef, useState } from "react";
import BookingForm from "./BookingForm";

export const OPEN_BOOKING_EVENT = "open-booking";

export function openBookingModal() {
  window.dispatchEvent(new Event(OPEN_BOOKING_EVENT));
}

export default function BookingModal() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(OPEN_BOOKING_EVENT, handler);
    return () => window.removeEventListener(OPEN_BOOKING_EVENT, handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previousFocusRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full bg-brand px-5 py-3 font-semibold text-white shadow-lg shadow-black/20 transition hover:bg-brand-dark sm:right-6 sm:bottom-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3.75 8.25h16.5M4.5 6h15a.75.75 0 01.75.75v12A2.25 2.25 0 0118 21H6a2.25 2.25 0 01-2.25-2.25v-12A.75.75 0 014.5 6z" />
        </svg>
        Бронирование
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 sm:items-center" onClick={() => setOpen(false)}>
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            tabIndex={-1}
            className="my-8 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 id="booking-modal-title" className="text-xl font-bold text-foreground">Забронировать номер</h2>
              <button
                type="button"
                aria-label="Закрыть"
                onClick={() => setOpen(false)}
                className="rounded-full p-1 text-foreground/50 transition hover:bg-black/5 hover:text-foreground"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <BookingForm />
          </div>
        </div>
      )}
    </>
  );
}
