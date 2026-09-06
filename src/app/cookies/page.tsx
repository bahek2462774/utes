import type { Metadata } from "next";
import { site } from "@/lib/site";
import { lastUpdated } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Политика использования cookie — Отель Атлантик",
  description: "Какие файлы cookie использует сайт отеля Атлантик и зачем.",
};

export default function CookiesPage() {
  return (
    <div className="container-page max-w-3xl py-10">
      <h1 className="text-3xl font-bold text-brand-dark">Политика использования cookie</h1>
      <p className="mt-2 text-sm text-foreground/50">Редакция от {lastUpdated}</p>

      <div className="mt-8 space-y-6 text-foreground/80">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Что такое cookie</h2>
          <p>
            Cookie — небольшие текстовые файлы, которые сайт или встроенные на него сторонние
            сервисы сохраняют в браузере при посещении, чтобы обеспечить корректную работу
            отдельных функций.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Какие cookie использует этот сайт</h2>
          <p>
            Сам сайт {site.name} не устанавливает рекламных или трекинговых cookie и не ведёт
            собственную аналитику посетителей. На отдельных страницах используются встроенные
            сторонние сервисы, которые могут устанавливать собственные cookie согласно своим
            политикам конфиденциальности:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              видео YouTube (Google) — встроено на главной странице;
            </li>
            <li>
              Яндекс.Карты — загружается на странице «Контакты» только после нажатия кнопки
              «Показать карту», то есть по явному действию пользователя.
            </li>
          </ul>
          <p className="mt-2">
            Эти cookie устанавливаются самими сервисами (Google, Яндекс), а не владельцем сайта,
            и регулируются их собственными политиками конфиденциальности.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Как отключить cookie</h2>
          <p>
            Большинство браузеров позволяют ограничить или полностью запретить использование
            cookie в настройках. Обратите внимание, что отключение cookie сторонних сервисов
            (например, YouTube) может сделать недоступным просмотр встроенного видео.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Согласие</h2>
          <p>
            Продолжая использовать сайт после появления уведомления о cookie, вы соглашаетесь с
            условиями настоящей политики.
          </p>
        </section>
      </div>
    </div>
  );
}
