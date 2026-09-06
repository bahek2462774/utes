"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Gallery({
  images,
  altPrefix,
}: {
  images: string[];
  altPrefix: string;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (index === null) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") setIndex((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previousFocusRef.current?.focus();
    };
  }, [index, images.length]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setIndex(i)}
            className="group relative aspect-square overflow-hidden rounded-lg bg-black/5"
          >
            <Image
              src={src}
              alt={`${altPrefix} ${i + 1}`}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${altPrefix} — просмотр фотографий`}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4"
          onClick={() => setIndex(null)}
        >
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Закрыть"
            onClick={() => setIndex(null)}
            className="absolute top-4 right-4 rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-7 w-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Предыдущее фото"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white sm:left-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-8 w-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="relative h-[75vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[index]}
              alt={`${altPrefix} ${index + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <button
            type="button"
            aria-label="Следующее фото"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((i) => (i === null ? i : (i + 1) % images.length));
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white sm:right-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-8 w-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <p className="mt-3 text-sm text-white/60">
            {index + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}
