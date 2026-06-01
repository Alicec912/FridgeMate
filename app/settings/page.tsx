"use client";

import { BottomNav } from "../../components/BottomNav";
import { useFridge } from "../../components/useFridge";
import { t } from "../../lib/i18n";
import { storageGuides } from "../../lib/storageGuide";

export default function SettingsPage() {
  const { language, setLanguage } = useFridge();

  return (
    <main className="safe-bottom mx-auto min-h-screen max-w-md px-4 pt-6">
      <h1 className="text-3xl font-black text-slate-950">{t(language, "settings")}</h1>

      <section className="mt-5 rounded-[2rem] bg-white/90 p-5 shadow-soft">
        <h2 className="text-lg font-black text-slate-950">{t(language, "language")}</h2>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            onClick={() => setLanguage("en")}
            className={`rounded-3xl px-4 py-4 text-sm font-black ${language === "en" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600"}`}
          >
            {t(language, "english")}
          </button>
          <button
            onClick={() => setLanguage("zh")}
            className={`rounded-3xl px-4 py-4 text-sm font-black ${language === "zh" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600"}`}
          >
            {t(language, "chinese")}
          </button>
        </div>
      </section>

      <section className="mt-5 rounded-[2rem] bg-white/90 p-5 shadow-soft">
        <h2 className="text-lg font-black text-slate-950">{language === "zh" ? "当前版本" : "Current version"}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">{t(language, "localOnly")}</p>
        <p className="mt-3 text-sm leading-6 text-slate-600">{t(language, "sourceNote")}</p>
      </section>

      <section className="mt-5 rounded-[2rem] bg-white/90 p-5 shadow-soft">
        <h2 className="text-lg font-black text-slate-950">{language === "zh" ? "内置食品建议" : "Built-in food guide"}</h2>
        <div className="mt-4 grid gap-2">
          {storageGuides.map((guide) => (
            <div key={guide.id} className="rounded-2xl bg-emerald-50 p-3 text-sm">
              <div className="font-black text-emerald-900">{language === "zh" ? guide.foodNameZh : guide.foodNameEn}</div>
              <div className="text-emerald-800">
                {guide.fridgeMinDays}-{guide.fridgeMaxDays} {language === "zh" ? "天" : "days"} · {guide.riskLevel}
              </div>
            </div>
          ))}
        </div>
      </section>
      <BottomNav language={language} />
    </main>
  );
}
