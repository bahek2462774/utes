import { excursions } from "@/lib/site";

export default function ExcursionsCard() {
  return (
    <div className="rounded-2xl border border-black/10 bg-sand/60 p-6">
      <h2 className="text-lg font-bold text-brand-dark">{excursions.title}</h2>
      <ul className="mt-3 space-y-1.5">
        {excursions.nearby.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-relaxed text-foreground/80">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
            {item}
          </li>
        ))}
      </ul>

      <h3 className="mt-5 font-semibold text-foreground">{excursions.toursTitle}</h3>
      <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
        {excursions.tours.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-relaxed text-foreground/80">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
