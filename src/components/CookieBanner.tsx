"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie-consent-accepted";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Reads localStorage (unavailable during the static export's server
    // render), so this can't be derived at render time without a
    // hydration mismatch — an effect is the correct tool here despite the
    // lint rule's default preference for deriving state during render.
    if (!window.localStorage.getItem(STORAGE_KEY)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    }
  }, []);

  function accept() {
    window.localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 p-4 backdrop-blur">
      <div className="container-page flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-sm text-foreground/80">
          Сайт использует cookie встроенных сервисов (видео, карта). Подробнее —{" "}
          <Link href="/cookies" className="text-brand hover:underline">
            Политика использования cookie
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={accept}
          className="shrink-0 rounded-lg bg-brand px-5 py-2 font-semibold text-white transition hover:bg-brand-dark"
        >
          Понятно
        </button>
      </div>
    </div>
  );
}
