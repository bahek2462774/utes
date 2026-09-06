import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { operator, lastUpdated } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных — Отель Атлантик",
  description:
    "Текст согласия на обработку персональных данных при отправке заявки на бронирование.",
};

export default function ConsentPage() {
  return (
    <div className="container-page max-w-3xl py-10">
      <h1 className="text-3xl font-bold text-brand-dark">
        Согласие на обработку персональных данных
      </h1>
      <p className="mt-2 text-sm text-foreground/50">Редакция от {lastUpdated}</p>

      <div className="mt-8 space-y-6 text-foreground/80">
        <p>
          Заполняя и отправляя форму заявки на бронирование на сайте {site.name}, я подтверждаю,
          что ознакомлен(а) с условиями настоящего согласия и{" "}
          <Link href="/privacy" className="text-brand hover:underline">
            Политикой в отношении обработки персональных данных
          </Link>
          , и свободно, своей волей и в своём интересе даю согласие оператору{" "}
          {operator.name} (ИНН {operator.inn}, ОГРН/ОГРНИП {operator.ogrn}) на обработку моих
          персональных данных на следующих условиях.
        </p>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Цель обработки</h2>
          <p>Приём и обработка заявки на бронирование номера, обратная связь по указанным в заявке контактам.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Перечень персональных данных</h2>
          <p>
            Фамилия, имя, отчество; страна, город; адрес электронной почты; номер телефона;
            сведения о датах и категории номера, количестве взрослых и детей; сведения,
            добровольно указанные в поле «Примечание».
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Перечень действий с персональными данными</h2>
          <p>Сбор, запись, систематизация, накопление, хранение, уточнение, использование, передача (только оператору обработки заявки), блокирование, удаление, уничтожение.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Срок действия согласия</h2>
          <p>
            Согласие действует до момента его отзыва субъектом персональных данных либо до
            достижения целей обработки, указанных выше, но не дольше срока, необходимого для
            рассмотрения заявки и, при подтверждении бронирования, — исполнения обязательств
            перед гостем.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Порядок отзыва согласия</h2>
          <p>
            Согласие может быть отозвано в любой момент путём направления письменного
            уведомления на адрес электронной почты{" "}
            <a href={`mailto:${site.email}`} className="text-brand hover:underline">
              {site.email}
            </a>{" "}
            с указанием ФИО и контактных данных, ранее переданных при заполнении формы.
          </p>
        </section>
      </div>
    </div>
  );
}
