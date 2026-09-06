import { roomAmenitiesInfo } from "@/lib/rooms";

export default function RoomAmenitiesCard() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-2xl border border-black/10 p-5">
        <h2 className="font-semibold text-foreground">Во всех номерах</h2>
        <ul className="mt-3 space-y-1.5">
          {roomAmenitiesInfo.allRooms.map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-relaxed text-foreground/80">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-black/10 p-5">
        <h2 className="font-semibold text-foreground">В стоимость номера входит</h2>
        <ul className="mt-3 space-y-1.5">
          {roomAmenitiesInfo.included.map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-relaxed text-foreground/80">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-black/10 p-5">
        <h2 className="font-semibold text-foreground">Платные услуги</h2>
        <ul className="mt-3 space-y-1.5">
          {roomAmenitiesInfo.paid.map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-relaxed text-foreground/80">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-foreground/60">{roomAmenitiesInfo.earlyCheckin}</p>
      </div>
    </div>
  );
}
