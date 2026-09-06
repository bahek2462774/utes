import Image from "next/image";
import Link from "next/link";
import Gallery from "@/components/Gallery";
import ExcursionsCard from "@/components/ExcursionsCard";
import { rooms } from "@/lib/rooms";
import { homeContent } from "@/lib/site";
import BookNowButton from "@/components/BookNowButton";

export default function HomePage() {
  return (
    <div>
      <section className="relative flex h-[70vh] min-h-[420px] items-end overflow-hidden sm:items-center">
        <Image
          src="/images/gallery/sea/03.jpg"
          alt="Отель Атлантик - вид на море"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 sm:bg-gradient-to-r" />
        <div className="container-page relative pb-10 text-white sm:pb-0">
          <p className="text-sm font-medium uppercase tracking-widest text-white/80">
            п. Утес &middot; г. Алушта
          </p>
          <h1 className="mt-2 max-w-xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Частный отель &laquo;Атлантик&raquo;
          </h1>
          <p className="mt-4 max-w-lg text-white/85">
            5 метров от моря. Уютные номера, ресторан с видом на море и собственный пляж.
          </p>
          <BookNowButton />
        </div>
      </section>

      <section className="bg-sand">
        <div className="container-page grid grid-cols-2 gap-4 py-8 sm:grid-cols-5">
          {rooms.map((r) => (
            <Link key={r.slug} href={`/rooms/${r.slug}`} className="group text-center">
              <div className="relative aspect-square overflow-hidden rounded-xl shadow-sm">
                <Image
                  src={r.previewImage}
                  alt={r.listTitle}
                  fill
                  sizes="(min-width: 640px) 20vw, 45vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <p className="mt-2 text-sm font-medium text-foreground/80 group-hover:text-brand">
                {r.listTitle}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page space-y-4 py-12">
        <h2 className="text-2xl font-bold text-brand-dark">О нас</h2>
        {homeContent.intro.map((p) => (
          <p key={p.slice(0, 20)} className="leading-relaxed text-foreground/80">
            {p}
          </p>
        ))}
        <p className="leading-relaxed text-foreground/80">
          Вас ждут комфортабельные{" "}
          <Link href="/rooms/standart-ug" className="font-semibold text-brand hover:underline">
            2-х местные номера
          </Link>
          , номера{" "}
          <Link href="/rooms/luks-ug" className="font-semibold text-brand hover:underline">
            класса Люкс
          </Link>
          .
        </p>
      </section>

      <section className="bg-sand py-12">
        <div className="container-page grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-brand-dark">{homeContent.restaurant.title}</h2>
            <div className="mt-4 space-y-3">
              {homeContent.restaurant.paragraphs.map((p) => (
                <p key={p.slice(0, 20)} className="leading-relaxed text-foreground/80">
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-brand-dark">{homeContent.amenities.title}</h2>
            <ul className="mt-4 space-y-2">
              {homeContent.amenities.items.map((item) => (
                <li key={item.slice(0, 20)} className="flex gap-2 leading-relaxed text-foreground/80">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-6">
          <h2 className="text-lg font-bold text-amber-900">{homeContent.notice.title}</h2>
          <ul className="mt-3 space-y-1.5">
            {homeContent.notice.items.map((item) => (
              <li key={item.slice(0, 20)} className="text-sm text-amber-900/90">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page py-10">
        <ExcursionsCard />
      </section>

      <section className="container-page space-y-12 py-10">
        {homeContent.galleries.map((g) => (
          <div key={g.key}>
            <h2 className="mb-4 text-2xl font-bold text-brand-dark">{g.title}</h2>
            <Gallery images={g.images} altPrefix={g.title} />
          </div>
        ))}

        <Link
          href="/video"
          className="group block overflow-hidden rounded-2xl border border-black/10"
        >
          <div className="relative aspect-video">
            <Image
              src="/images/video-cover.png"
              alt="Видео об Утесе"
              fill
              sizes="100vw"
              className="object-cover transition duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-7 w-7 text-brand-dark">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}
