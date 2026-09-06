import Link from "next/link";
import { site } from "@/lib/site";
import { operator } from "@/lib/legal";

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
        <div className="container-page flex flex-col items-center gap-3 text-xs text-white/50 sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Отель Атлантик</p>
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <Link href="/contacts" className="hover:text-white">
              Контакты
            </Link>
            <Link href="/privacy" className="hover:text-white">
              Политика конфиденциальности
            </Link>
            <Link href="/consent" className="hover:text-white">
              Согласие на обработку данных
            </Link>
            <Link href="/cookies" className="hover:text-white">
              Cookie
            </Link>
          </nav>
        </div>
        <div className="container-page mt-3 border-t border-white/10 pt-3 text-[11px] leading-relaxed text-white/40">
          <p>
            Исполнитель: {operator.name}, ИНН {operator.inn}, ОГРН/ОГРНИП {operator.ogrn},
            адрес: {operator.legalAddress}.
          </p>
        </div>
      </div>
    </footer>
  );
}
