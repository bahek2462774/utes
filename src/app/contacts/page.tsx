import type { Metadata } from "next";
import YandexMap from "@/components/YandexMap";
import ExcursionsCard from "@/components/ExcursionsCard";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Контакты Отеля Атлантик п. Утес - г.Алушта . Телефоны. Как добраться",
  description: "Отель Атлантик - контакты. Как добраться . Телефоны.",
};

export default function ContactsPage() {
  return (
    <div className="container-page py-10">
      <h1 className="text-3xl font-bold text-brand-dark">Контакты</h1>

      <div className="mt-8 grid gap-10 sm:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/50">Адрес</h2>
            {site.address.map((line) => (
              <p key={line} className="text-lg text-foreground/80">
                {line}
              </p>
            ))}
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/50">Телефоны</h2>
            {site.phones.map((p, i) => (
              <a key={p} href={site.phoneHrefs[i]} className="block text-lg font-medium text-brand hover:underline">
                {p}
              </a>
            ))}
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/50">E-mail</h2>
            <a href={`mailto:${site.email}`} className="text-lg font-medium text-brand hover:underline">
              {site.email}
            </a>
          </div>
        </div>

        <YandexMap />
      </div>

      <a
        href={site.yandexMapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block text-sm text-brand hover:underline"
      >
        «Отель &quot;Атлантик&quot; п. Утес г. Алушта» на Яндекс.Картах
      </a>

      <div className="mt-10">
        <ExcursionsCard />
      </div>
    </div>
  );
}
