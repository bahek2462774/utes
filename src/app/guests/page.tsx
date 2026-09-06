import type { Metadata } from "next";
import Gallery from "@/components/Gallery";
import ExcursionsCard from "@/components/ExcursionsCard";
import { guestsGallery } from "@/lib/site";

export const metadata: Metadata = {
  title: "Гости отеля Атлантик. Отель на берегу моря г. Алушта - п. Утес.",
  description: "Фотографии знаменитых гостей отеля Атлантик г. Алушта.",
};

export default function GuestsPage() {
  return (
    <div className="container-page py-10">
      <h1 className="text-center text-3xl font-bold text-brand-dark">Гости отеля &laquo;Атлантик&raquo;</h1>
      <div className="mt-8">
        <Gallery images={guestsGallery} altPrefix="Гость отеля Атлантик" />
      </div>
      <div className="mt-10">
        <ExcursionsCard />
      </div>
    </div>
  );
}
