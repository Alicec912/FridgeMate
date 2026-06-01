"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BottomNav } from "../components/BottomNav";
import { FoodCard } from "../components/FoodCard";
import { useFridge } from "../components/useFridge";
import { t } from "../lib/i18n";

export default function HomePage() {
  const { activeItems, urgentItems, language } = useFridge();
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return activeItems;
    return activeItems.filter((item) => `${item.name} ${item.category}`.toLowerCase().includes(q));
  }, [activeItems, query]);

  return (
    <main className="safe-bottom mx-auto min-h-screen max-w-md px-4 pt-6">
      <section className="rounded-[2rem] bg-white/90 p-5 shadow-soft backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-emerald-700">{t(language, "appName")} · {t(language, "appNameZh")}</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">{t(language, "greeting")}</h1>
          </div>
          <Link href="/add" className="rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-black text-white shadow-soft">
            {t(language, "add")}
          </Link>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">{t(language, "subtitle")}</p>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t(language, "search")}
          className="mt-4 w-full rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-base outline-none focus:border-emerald-400"
        />
      </section>

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-950">{t(language, "useSoon")}</h2>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">{urgentItems.length}</span>
        </div>
        {urgentItems.length ? (
          <div className="grid gap-3">
            {urgentItems.slice(0, 3).map((item) => <FoodCard key={item.id} item={item} language={language} />)}
          </div>
        ) : (
          <div className="rounded-3xl bg-white/80 p-4 text-sm font-semibold text-slate-500 shadow-soft">{t(language, "noAlerts")}</div>
        )}
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-lg font-black text-slate-950">{t(language, "allItems")}</h2>
        {filtered.length ? (
          <div className="grid gap-3">
            {filtered.map((item) => <FoodCard key={item.id} item={item} language={language} />)}
          </div>
        ) : (
          <div className="rounded-3xl bg-white/80 p-6 text-center text-sm font-semibold text-slate-500 shadow-soft">
            {t(language, "empty")}
          </div>
        )}
      </section>
      <BottomNav language={language} />
    </main>
  );
}
