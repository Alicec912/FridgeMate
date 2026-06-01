"use client";

import { BottomNav } from "../../components/BottomNav";
import { FoodCard } from "../../components/FoodCard";
import { useFridge } from "../../components/useFridge";
import { getFoodStatus } from "../../lib/dateUtils";
import { t } from "../../lib/i18n";

export default function AlertsPage() {
  const { activeItems, language } = useFridge();
  const expired = activeItems.filter((item) => getFoodStatus(item) === "expired");
  const useSoon = activeItems.filter((item) => getFoodStatus(item) === "use_soon");
  const highRisk = activeItems.filter((item) => ["Meat", "Leftovers", "Dairy"].includes(item.category));

  return (
    <main className="safe-bottom mx-auto min-h-screen max-w-md px-4 pt-6">
      <h1 className="text-3xl font-black text-slate-950">{t(language, "alerts")}</h1>
      <p className="mt-2 text-sm text-slate-600">{t(language, "sourceNote")}</p>

      <section className="mt-6 grid gap-3">
        <h2 className="text-lg font-black text-red-700">{t(language, "expired")}</h2>
        {expired.length ? expired.map((item) => <FoodCard key={item.id} item={item} language={language} />) : <Empty language={language} />}
      </section>

      <section className="mt-6 grid gap-3">
        <h2 className="text-lg font-black text-amber-700">{t(language, "useSoon")}</h2>
        {useSoon.length ? useSoon.map((item) => <FoodCard key={item.id} item={item} language={language} />) : <Empty language={language} />}
      </section>

      <section className="mt-6 grid gap-3">
        <h2 className="text-lg font-black text-slate-950">{t(language, "highRisk")}</h2>
        {highRisk.length ? highRisk.map((item) => <FoodCard key={item.id} item={item} language={language} />) : <Empty language={language} />}
      </section>
      <BottomNav language={language} />
    </main>
  );
}

function Empty({ language }: { language: "en" | "zh" }) {
  return <div className="rounded-3xl bg-white/80 p-4 text-sm font-semibold text-slate-500 shadow-soft">{t(language, "noAlerts")}</div>;
}
