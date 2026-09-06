"use client";

import { openBookingModal } from "./BookingModal";

export default function BookNowButton() {
  return (
    <button
      type="button"
      onClick={openBookingModal}
      className="mt-6 rounded-lg bg-brand px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-brand-dark"
    >
      Забронировать номер
    </button>
  );
}
