"use client";

import { useEffect, useRef } from "react";
import type videojs from "video.js";
import "video.js/dist/video-js.css";

type Player = ReturnType<typeof videojs>;

export default function VideoPlayer({
  src,
  poster,
  title,
}: {
  src: string;
  poster: string;
  title: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let player: Player | undefined;
    let cancelled = false;

    async function start() {
      const [{ default: videojs }, ru] = await Promise.all([
        import("video.js/core.es.js"),
        import("video.js/dist/lang/ru.json"),
      ]);
      if (cancelled || !host) return;
      videojs.addLanguage("ru", ru.default);
      const el = document.createElement("video-js");
      el.classList.add("vjs-big-play-centered");
      host.appendChild(el);
      player = videojs(el, {
        controls: true,
        fill: true,
        preload: "none",
        playsinline: true,
        language: "ru",
        poster,
        sources: [{ src, type: "video/mp4" }],
      });
    }

    // Load video.js only when the player is about to be seen.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          start();
        }
      },
      { rootMargin: "400px" },
    );
    observer.observe(host);

    return () => {
      cancelled = true;
      observer.disconnect();
      player?.dispose();
    };
  }, [src, poster]);

  return (
    <div
      ref={hostRef}
      role="group"
      aria-label={title}
      className="relative aspect-video overflow-hidden rounded-2xl border border-black/10 bg-black bg-cover bg-center"
      style={{ backgroundImage: `url(${poster})` }}
    />
  );
}
