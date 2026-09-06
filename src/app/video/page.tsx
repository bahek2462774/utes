import type { Metadata } from "next";
import ExcursionsCard from "@/components/ExcursionsCard";
import { videoEmbedId } from "@/lib/site";

export const metadata: Metadata = {
  title: "Видео об Утесе г. Алушта АР Крым. Отдых в Утесе",
  description:
    "Отель Атлантик расположенный в городе Алушта в небольшом поселке Утес. Это официальный сайт. Актуальные цены, свежие фотографии, описание, отзывы отдыхающих",
};

export default function VideoPage() {
  return (
    <div className="container-page py-10">
      <h1 className="text-3xl font-bold text-brand-dark">Видео об Утесе</h1>
      <div className="mt-6 overflow-hidden rounded-2xl border border-black/10">
        <div className="relative aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${videoEmbedId}`}
            title="Видео об Утесе - Отель Атлантик"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
      <div className="mt-10">
        <ExcursionsCard />
      </div>
    </div>
  );
}
