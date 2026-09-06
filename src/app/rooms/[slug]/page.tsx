import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import BookNowButton from "@/components/BookNowButton";
import RoomAmenitiesCard from "@/components/RoomAmenitiesCard";
import { getRoom, rooms } from "@/lib/rooms";

export function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) return {};
  return {
    title: room.pageTitle,
    description: room.metaDescription,
  };
}

export default async function RoomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) notFound();

  return (
    <div className="container-page py-10">
      <h1 className="text-3xl font-bold text-brand-dark">{room.heading}</h1>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {room.sections.map((section) => (
          <div key={section.title ?? "section"} className="rounded-2xl border border-black/10 p-5">
            {section.title && <h2 className="mb-3 font-semibold text-foreground">{section.title}</h2>}
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item.slice(0, 24)} className="flex gap-2 text-sm leading-relaxed text-foreground/80">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <BookNowButton />

      <div className="mt-10">
        <RoomAmenitiesCard />
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-2xl font-bold text-brand-dark">Фотографии номера</h2>
        <Gallery images={room.gallery} altPrefix={room.heading} />
      </div>
    </div>
  );
}
