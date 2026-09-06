"use client";

import { useState } from "react";
import { site } from "@/lib/site";

export default function YandexMap() {
  const [loaded, setLoaded] = useState(false);
  const [lat, lon] = site.mapCoords;
  const src = `https://yandex.ru/map-widget/v1/?ll=${lon}%2C${lat}&z=17&pt=${lon},${lat},pm2rdl`;

  if (!loaded) {
    return (
      <button
        type="button"
        onClick={() => setLoaded(true)}
        className="flex h-full min-h-[320px] w-full flex-col items-center justify-center gap-3 rounded-2xl border border-black/10 bg-sand/60 p-6 text-center transition hover:bg-sand"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-10 w-10 text-brand">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75L4.5 9v10.5L9 17.25m0-10.5l6 3m-6-3v10.5m6-7.5l4.5-2.25v10.5L15 19.5m0-10.5v10.5m0 0l-6-3" />
        </svg>
        <span className="font-medium text-foreground">Показать карту</span>
        <span className="text-sm text-foreground/60">п. Утес, ул. Княгини Гагариной 25/1</span>
      </button>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10">
      <iframe
        src={src}
        title="Отель Атлантик на карте"
        width="100%"
        height="420"
        loading="lazy"
        className="block"
      />
    </div>
  );
}
