"use client";

import { useRef, useState } from "react";
import { BottomNav } from "../../components/BottomNav";
import { useFridge } from "../../components/useFridge";
import { t } from "../../lib/i18n";
import { exportFridgeData, importFridgeData } from "../../lib/store";
import { storageGuides } from "../../lib/storageGuide";

export default function SettingsPage() {
  const { language, setLanguage } = useFridge();
  const importInput = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");

  function downloadBackup() {
    const url = URL.createObjectURL(new Blob([exportFridgeData()], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `fridgemate-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setMessage(language === "zh" ? "备份已下载。" : "Backup downloaded.");
  }

  async function restoreBackup(file?: File) {
    if (!file) return;
    try {
      const count = importFridgeData(await file.text());
      setMessage(language === "zh" ? `已恢复 ${count} 个食品。` : `Restored ${count} items.`);
    } catch {
      setMessage(language === "zh" ? "无法读取这个备份文件。" : "This backup file could not be read.");
    } finally {
      if (importInput.current) importInput.current.value = "";
    }
  }

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
        <h2 className="text-lg font-black text-slate-950">{language === "zh" ? "备份与恢复" : "Backup & restore"}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {language === "zh" ? "下载 JSON 备份，或恢复之前的数据。恢复会替换当前清单。" : "Download a JSON backup or restore earlier data. Restoring replaces the current list."}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button onClick={downloadBackup} className="rounded-3xl bg-emerald-600 px-4 py-4 text-sm font-black text-white">{language === "zh" ? "下载备份" : "Download backup"}</button>
          <button onClick={() => importInput.current?.click()} className="rounded-3xl bg-slate-100 px-4 py-4 text-sm font-black text-slate-700">{language === "zh" ? "恢复备份" : "Restore backup"}</button>
          <input ref={importInput} type="file" accept="application/json,.json" className="hidden" onChange={(event) => restoreBackup(event.target.files?.[0])} />
        </div>
        {message ? <p role="status" className="mt-3 text-sm font-bold text-emerald-700">{message}</p> : null}
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
