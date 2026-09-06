import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-16 bg-brand-dark text-white/90">
      <div className="container-page grid gap-8 py-10 sm:grid-cols-3">
        <div>
          <h2 className="mb-3 text-lg font-bold text-white">Отель Атлантик</h2>
          {site.address.map((line) => (
            <p key={line} className="text-sm text-white/70">
              {line}
            </p>
          ))}
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/60">Контакты</h3>
          <div className="space-y-1 text-sm">
            {site.phones.map((p, i) => (
              <a key={p} href={site.phoneHrefs[i]} className="block hover:text-white">
                {p}
              </a>
            ))}
            <a href={`mailto:${site.email}`} className="block hover:text-white">
              {site.email}
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/60">Карта</h3>
          <a
            href={site.yandexMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline decoration-white/40 underline-offset-2 hover:text-white"
          >
            «Отель &quot;Атлантик&quot; п. Утес г. Алушта» на Яндекс.Картах
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 py-4">
        <div className="container-page flex flex-col items-center justify-between gap-2 text-xs text-white/50 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Отель Атлантик</p>
          <Link href="/contacts" className="hover:text-white">
            Контакты
          </Link>
        </div>
      </div>
    </footer>
  );
}
