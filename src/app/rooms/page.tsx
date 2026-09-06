import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { rooms } from "@/lib/rooms";

export const metadata: Metadata = {
  title:
    "Категории номеров в Отеле Атлантик  - город Алушта - поселок Утес. Номера на берегу моря.",
  description:
    "Категории номеров в отеле Атлантик. Номера с видом на море и горы. Большие номера Vip и Стандарты. Номера люкс. Все для вашего комфортного отдыха.",
};

const order = ["vip-big", "vip-small", "luks-ug", "standart-ug", "standart-sever"];

export default function RoomsPage() {
  const ordered = order
    .map((slug) => rooms.find((r) => r.slug === slug))
    .filter((r): r is (typeof rooms)[number] => Boolean(r));

  return (
    <div className="container-page py-10">
      <h1 className="text-3xl font-bold text-brand-dark">Номера</h1>
      <p className="mt-2 text-foreground/60">Описание и фото всех категорий номеров</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ordered.map((r) => (
          <Link
            key={r.slug}
            href={`/rooms/${r.slug}`}
            className="group overflow-hidden rounded-2xl border border-black/10 shadow-sm transition hover:shadow-md"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={r.previewImage}
                alt={r.listTitle}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-foreground group-hover:text-brand">{r.listTitle}</h2>
              <p className="mt-1 text-sm text-foreground/60">{r.navSubtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
