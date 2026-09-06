"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { rooms } from "@/lib/rooms";
import { site, topBanner } from "@/lib/site";

const navLinks = [
  { href: "/contacts", label: "Контакты", sub: "Телефоны, карта" },
  { href: "/price", label: "Цены", sub: "2026 год" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(false);
  const pathname = usePathname();

  const roomsCol1 = rooms.filter((r) => ["standart-sever", "vip-small", "luks-ug"].includes(r.slug));
  const roomsCol2 = rooms.filter((r) => ["standart-ug", "vip-big"].includes(r.slug));

  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm">
      <div className="bg-brand text-center text-white">
        <Link href={topBanner.href} className="container-page flex flex-col items-center gap-1 py-2 text-sm sm:flex-row sm:justify-center sm:gap-3">
          <span className="font-semibold">{topBanner.title}</span>
          <span className="hidden sm:inline">{topBanner.subtitle}</span>
          <span className="underline underline-offset-2">{topBanner.cta}</span>
        </Link>
      </div>

      <div className="container-page flex items-center justify-between gap-4 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Отель Атлантик"
            width={160}
            height={120}
            className="h-16 w-20 object-contain sm:h-20 sm:w-28 lg:h-24 lg:w-32"
            priority
          />
          <span className="hidden flex-col sm:flex">
            <span className="text-xl font-bold leading-tight tracking-tight text-brand-dark md:text-2xl lg:text-3xl">
              Отель Атлантик
            </span>
            <span className="text-xs font-medium tracking-wide text-foreground/60 md:text-sm">
              п. Утес &middot; Алушта
            </span>
          </span>
        </Link>

        <div className="hidden flex-col items-end text-base text-foreground/80 md:flex lg:text-lg">
          {site.phones.map((p, i) => (
            <a key={p} href={site.phoneHrefs[i]} className="hover:text-brand">
              {p}
            </a>
          ))}
          <a href={`mailto:${site.email}`} className="hover:text-brand">
            {site.email}
          </a>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-foreground md:hidden"
          aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-7 w-7">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      <nav className="container-page hidden border-t border-black/5 pb-3 md:block">
        <ul className="flex gap-8 pt-3 text-sm font-medium">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={`hover:text-brand ${pathname === l.href ? "text-brand" : ""}`}>
                {l.label}
              </Link>
            </li>
          ))}
          <li
            className="relative"
            onMouseEnter={() => setRoomsOpen(true)}
            onMouseLeave={() => setRoomsOpen(false)}
            onFocus={() => setRoomsOpen(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setRoomsOpen(false);
            }}
          >
            <Link
              href="/rooms"
              aria-haspopup="true"
              aria-expanded={roomsOpen}
              className={`hover:text-brand ${pathname.startsWith("/rooms") ? "text-brand" : ""}`}
            >
              Номера
            </Link>
            {roomsOpen && (
              <div className="absolute left-0 top-full z-40 flex gap-8 rounded-xl border border-black/10 bg-white p-5 shadow-lg">
                <ul className="space-y-2 whitespace-nowrap">
                  {roomsCol1.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/rooms/${r.slug}`} className="block hover:text-brand">
                        <span className="font-semibold">{r.navTitle}</span>
                        <span className="ml-2 text-xs text-foreground/50">{r.navSubtitle}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2 whitespace-nowrap">
                  {roomsCol2.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/rooms/${r.slug}`} className="block hover:text-brand">
                        <span className="font-semibold">{r.navTitle}</span>
                        <span className="ml-2 text-xs text-foreground/50">{r.navSubtitle}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
          <li>
            <Link href="/guests" className={`hover:text-brand ${pathname === "/guests" ? "text-brand" : ""}`}>
              Гости
            </Link>
          </li>
        </ul>
      </nav>

      {mobileOpen && (
        <nav className="container-page space-y-1 border-t border-black/5 pb-4 md:hidden">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block rounded-lg px-2 py-2 hover:bg-black/5"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/rooms" className="block rounded-lg px-2 py-2 font-medium hover:bg-black/5" onClick={() => setMobileOpen(false)}>
            Номера
          </Link>
          <ul className="ml-3 space-y-1 border-l border-black/10 pl-3">
            {rooms.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/rooms/${r.slug}`}
                  className="block rounded-lg px-2 py-1.5 text-sm text-foreground/80 hover:bg-black/5"
                  onClick={() => setMobileOpen(false)}
                >
                  {r.navTitle}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/guests" className="block rounded-lg px-2 py-2 hover:bg-black/5" onClick={() => setMobileOpen(false)}>
            Гости
          </Link>
          <div className="mt-2 space-y-1 border-t border-black/5 pt-3 text-sm">
            {site.phones.map((p, i) => (
              <a key={p} href={site.phoneHrefs[i]} className="block text-brand">
                {p}
              </a>
            ))}
            <a href={`mailto:${site.email}`} className="block text-brand">
              {site.email}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
