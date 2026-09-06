import type { Metadata } from "next";
import { priceTable } from "@/lib/site";
import BookNowButton from "@/components/BookNowButton";
import RoomAmenitiesCard from "@/components/RoomAmenitiesCard";

export const metadata: Metadata = {
  title: "Цены  - Отель АТЛАНТИК - Алушта п.Утес. Отель на берегу моря - актуальные цены",
  description:
    "На этой странице вы можете посмотреть актуальные цены на проживание в отеле Атлантик п. Утес г.Алушта.",
};

export default function PricePage() {
  return (
    <div className="container-page py-10">
      <h1 className="text-3xl font-bold text-brand-dark">{priceTable.caption}</h1>
      <h2 className="mt-2 text-lg text-foreground/60">{priceTable.period}</h2>

      {/* Mobile: one card per period, columns stacked as label/value rows */}
      <div className="mt-8 space-y-4 sm:hidden">
        {priceTable.rows.map((row) => (
          <div key={row.label} className="overflow-hidden rounded-2xl border border-black/10">
            <div className="bg-brand px-4 py-3 font-semibold text-white">{row.label}</div>
            <dl className="divide-y divide-black/5">
              {priceTable.columns.map((c, j) => (
                <div key={c} className="flex items-center justify-between px-4 py-2.5 text-sm">
                  <dt className="text-foreground/60">{c}</dt>
                  <dd className="font-medium text-foreground">{row.values[j]}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      {/* Desktop/tablet: full table */}
      <div className="mt-8 hidden overflow-x-auto rounded-2xl border border-black/10 sm:block">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="bg-brand text-white">
              <th scope="col" className="px-4 py-3 font-semibold">Период</th>
              {priceTable.columns.map((c) => (
                <th key={c} scope="col" className="px-4 py-3 font-semibold">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {priceTable.rows.map((row, i) => (
              <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-sand/60"}>
                <th scope="row" className="px-4 py-3 font-semibold text-foreground">{row.label}</th>
                {row.values.map((v, j) => (
                  <td key={j} className="px-4 py-3 text-foreground/80">
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 space-y-1.5 text-foreground/80">
        {priceTable.notes.map((n) => (
          <p key={n}>{n}</p>
        ))}
      </div>

      <BookNowButton />

      <div className="mt-12">
        <RoomAmenitiesCard />
      </div>
    </div>
  );
}
