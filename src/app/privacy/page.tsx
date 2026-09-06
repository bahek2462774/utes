import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { operator, lastUpdated } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных — Отель Атлантик",
  description:
    "Политика в отношении обработки персональных данных на сайте отеля Атлантик.",
};

export default function PrivacyPage() {
  return (
    <div className="container-page max-w-3xl py-10">
      <h1 className="text-3xl font-bold text-brand-dark">
        Политика в отношении обработки персональных данных
      </h1>
      <p className="mt-2 text-sm text-foreground/50">Редакция от {lastUpdated}</p>

      <div className="prose-legal mt-8 space-y-6 text-foreground/80">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">1. Общие положения</h2>
          <p>
            Настоящая Политика определяет порядок обработки персональных данных и меры по
            обеспечению их безопасности оператором {operator.name} (ИНН {operator.inn},
            ОГРН/ОГРНИП {operator.ogrn}, адрес: {operator.legalAddress}) (далее — «Оператор»),
            владельцем сайта {site.name}, размещённого по адресу utes2.duckdns.org (далее — «Сайт»).
          </p>
          <p className="mt-2">
            Политика разработана в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ
            «О персональных данных» и действует в отношении всех персональных данных, которые
            Оператор может получить от пользователя Сайта, в том числе через форму заявки на
            бронирование.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">2. Цели обработки персональных данных</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>приём и обработка заявок на бронирование номеров;</li>
            <li>обратная связь с пользователем по его заявке или обращению, включая уточнение деталей бронирования;</li>
            <li>информирование пользователя о статусе его заявки.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">3. Правовые основания обработки</h2>
          <p>
            Обработка осуществляется на основании согласия субъекта персональных данных,
            даваемого при заполнении формы на Сайте (см.{" "}
            <Link href="/consent" className="text-brand hover:underline">
              Согласие на обработку персональных данных
            </Link>
            ), а также Федерального закона № 152-ФЗ и Закона РФ от 07.02.1992 № 2300-I
            «О защите прав потребителей».
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">4. Категории и состав персональных данных</h2>
          <p>Оператор обрабатывает данные, которые пользователь указывает самостоятельно при заполнении формы заявки:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>фамилия, имя, отчество;</li>
            <li>страна, город;</li>
            <li>адрес электронной почты;</li>
            <li>номер телефона;</li>
            <li>сведения о желаемых датах и категории номера, количестве взрослых и детей;</li>
            <li>иные сведения, добровольно указанные пользователем в поле «Примечание».</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">5. Порядок обработки и передачи данных</h2>
          <p>
            Данные, указанные в форме заявки, направляются по электронной почте Оператору и
            обрабатываются его сотрудниками для целей, указанных в разделе 2. Оператор не
            передаёт персональные данные третьим лицам, за исключением случаев, прямо
            предусмотренных законодательством РФ. Обработка данных ведётся на серверах,
            расположенных на территории Российской Федерации.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">6. Сроки хранения</h2>
          <p>
            Персональные данные хранятся не дольше срока, необходимого для достижения целей их
            обработки, указанных в разделе 2, если иной срок не установлен законодательством РФ
            или соглашением с субъектом персональных данных, после чего подлежат уничтожению
            либо обезличиванию.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">7. Меры по обеспечению безопасности данных</h2>
          <p>
            Оператор принимает необходимые организационные и технические меры для защиты
            персональных данных от неправомерного или случайного доступа, уничтожения,
            изменения, блокирования, копирования, распространения, а также от иных
            неправомерных действий третьих лиц.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">8. Права субъекта персональных данных</h2>
          <p>Пользователь вправе:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>получить информацию, касающуюся обработки его персональных данных;</li>
            <li>требовать уточнения, блокирования или уничтожения своих персональных данных, если они неполны, устарели, неточны или незаконно получены;</li>
            <li>отозвать согласие на обработку персональных данных в любой момент — см. раздел «Порядок отзыва» в{" "}
              <Link href="/consent" className="text-brand hover:underline">
                Согласии на обработку персональных данных
              </Link>
              ;</li>
            <li>обратиться с жалобой в Роскомнадзор либо в суд, если считает, что его права нарушены.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">9. Контакты Оператора</h2>
          <p>По вопросам обработки персональных данных можно обратиться:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>по электронной почте: <a href={`mailto:${site.email}`} className="text-brand hover:underline">{site.email}</a></li>
            {site.phones.map((p, i) => (
              <li key={p}>
                по телефону: <a href={site.phoneHrefs[i]} className="text-brand hover:underline">{p}</a>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">10. Использование файлов cookie</h2>
          <p>
            Сведения об использовании файлов cookie на Сайте приведены в отдельном документе —{" "}
            <Link href="/cookies" className="text-brand hover:underline">
              Политика использования cookie
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">11. Заключительные положения</h2>
          <p>
            Оператор вправе вносить изменения в настоящую Политику. Актуальная редакция всегда
            доступна на этой странице.
          </p>
        </section>
      </div>
    </div>
  );
}
