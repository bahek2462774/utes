"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { bookingRoomOptions } from "@/lib/rooms";
import { site } from "@/lib/site";

function toDateInputValue(d: Date) {
  return d.toISOString().slice(0, 10);
}

function todayLocal() {
  const now = new Date();
  return toDateInputValue(new Date(now.getTime() - now.getTimezoneOffset() * 60000));
}

function nightsBetween(from: string, to: string) {
  const a = new Date(`${from}T00:00:00Z`);
  const b = new Date(`${to}T00:00:00Z`);
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

function pluralNights(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "ночь";
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return "ночи";
  return "ночей";
}

export default function BookingForm() {
  const [action, setAction] = useState<string | undefined>(undefined);
  // BookingForm only ever mounts client-side (BookingModal gates it behind
  // `open`, which starts false), so there's no server/client render to
  // mismatch here — safe to compute directly instead of via effect+state.
  const [minDate1] = useState(todayLocal);
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [minDate2, setMinDate2] = useState<string | undefined>(undefined);

  useEffect(() => {
    const t = setTimeout(() => setAction(site.bookingEndpoint), 5000);
    return () => clearTimeout(t);
  }, []);

  function handleDate1Change(value: string) {
    setDate1(value);
    if (!value) return;
    const min = new Date(`${value}T00:00:00Z`);
    min.setUTCDate(min.getUTCDate() + 1);
    const minStr = toDateInputValue(min);
    setMinDate2(minStr);
    if (!date2 || date2 < minStr) {
      setDate2(minStr);
    }
  }

  const nights = date1 && date2 ? nightsBetween(date1, date2) : 0;

  function stampConsentTime(e: React.FormEvent<HTMLFormElement>) {
    const field = e.currentTarget.elements.namedItem("consent_datetime");
    if (field instanceof HTMLInputElement) field.value = new Date().toISOString();
  }

  return (
    <form
      className="myf box space-y-4"
      id="myform"
      method="post"
      action={action}
      onSubmit={stampConsentTime}
    >
      <div>
        <label htmlFor="fio" className="mb-1 block text-sm font-medium text-foreground/80">
          Ф.И.О:
        </label>
        <input
          id="fio"
          name="fio"
          type="text"
          required
          className="w-full rounded-lg border border-black/15 px-3 py-2 focus:border-brand focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="strana" className="mb-1 block text-sm font-medium text-foreground/80">
            Страна:
          </label>
          <input
            id="strana"
            name="strana"
            type="text"
            className="w-full rounded-lg border border-black/15 px-3 py-2 focus:border-brand focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="gorod" className="mb-1 block text-sm font-medium text-foreground/80">
            Город:
          </label>
          <input
            id="gorod"
            name="gorod"
            type="text"
            className="w-full rounded-lg border border-black/15 px-3 py-2 focus:border-brand focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="nomer" className="mb-1 block text-sm font-medium text-foreground/80">
          Категория номера:
        </label>
        <select
          id="nomer"
          name="nomer"
          className="w-full rounded-lg border border-black/15 px-3 py-2 focus:border-brand focus:outline-none"
        >
          {bookingRoomOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="count_rooms" className="mb-1 block text-sm font-medium text-foreground/80">
          Количество номеров:
        </label>
        <select
          id="count_rooms"
          name="count_rooms"
          className="w-full rounded-lg border border-black/15 px-3 py-2 focus:border-brand focus:outline-none"
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="date1" className="mb-1 block text-sm font-medium text-foreground/80">
            Дата заезда:
          </label>
          <input
            id="date1"
            name="date1"
            type="date"
            min={minDate1}
            value={date1}
            onChange={(e) => handleDate1Change(e.target.value)}
            className="w-full rounded-lg border border-black/15 px-3 py-2 focus:border-brand focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="date2" className="mb-1 block text-sm font-medium text-foreground/80">
            Дата выезда:
          </label>
          <input
            id="date2"
            name="date2"
            type="date"
            min={minDate2}
            value={date2}
            onChange={(e) => setDate2(e.target.value)}
            className="w-full rounded-lg border border-black/15 px-3 py-2 focus:border-brand focus:outline-none"
          />
        </div>
      </div>

      {nights > 0 && (
        <p className="text-sm font-medium text-brand-dark">
          {nights} {pluralNights(nights)}
        </p>
      )}

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-foreground/80">
          Ваш e-mail:
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-black/15 px-3 py-2 focus:border-brand focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="kol_v" className="mb-1 block text-sm font-medium text-foreground/80">
            Кол-во взрослых:
          </label>
          <input
            id="kol_v"
            name="kol_v"
            type="number"
            min={1}
            className="w-full rounded-lg border border-black/15 px-3 py-2 focus:border-brand focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="kol_d" className="mb-1 block text-sm font-medium text-foreground/80">
            Кол-во детей:
          </label>
          <input
            id="kol_d"
            name="kol_d"
            type="number"
            min={0}
            className="w-full rounded-lg border border-black/15 px-3 py-2 focus:border-brand focus:outline-none"
          />
          <p className="mt-1 text-xs text-foreground/50">
            * Если Вы бронируете номер с детьми, просьба указывать их возраст в примечании
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium text-foreground/80">
          Телефон:
        </label>
        <input
          id="phone"
          name="phone"
          type="text"
          required
          className="w-full rounded-lg border border-black/15 px-3 py-2 focus:border-brand focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="text2" className="mb-1 block text-sm font-medium text-foreground/80">
          Примечание:
        </label>
        <textarea
          id="text2"
          name="text2"
          rows={3}
          className="w-full rounded-lg border border-black/15 px-3 py-2 focus:border-brand focus:outline-none"
        />
      </div>

      <input type="hidden" name="consent_datetime" defaultValue="" />

      <div className="flex items-start gap-2">
        <input
          autoComplete="off"
          id="politics"
          name="politics"
          required
          type="checkbox"
          className="mt-1"
        />
        <label htmlFor="politics" className="text-sm text-foreground/70">
          Нажимая на кнопку &quot;Отправить&quot;, я даю{" "}
          <Link href="/consent" target="_blank" className="text-brand hover:underline">
            согласие на обработку персональных данных
          </Link>{" "}
          в соответствии с{" "}
          <Link href="/privacy" target="_blank" className="text-brand hover:underline">
            Политикой конфиденциальности
          </Link>
          .
        </label>
      </div>

      <p className="text-xs text-foreground/50">
        Это заявка на бронирование, а не подтверждённая бронь: мы свяжемся с Вами по указанным
        контактам, чтобы подтвердить наличие номера и детали. Оплата через сайт не производится.
      </p>

      <button
        type="submit"
        className="w-full rounded-lg bg-brand px-4 py-3 font-semibold text-white transition hover:bg-brand-dark"
      >
        Отправить
      </button>
    </form>
  );
}
