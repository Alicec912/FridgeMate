"use client";

import { getEatByDate, getFoodStatus, diffDays, formatDate } from "../lib/dateUtils";
import { t } from "../lib/i18n";
import { removeFoodItem, updateFoodItem } from "../lib/store";
import { FoodItem, Language } from "../lib/types";

export function FoodCard({ item, language }: { item: FoodItem; language: Language }) {
  const status = getFoodStatus(item);
  const eatBy = getEatByDate(item);
  const days = eatBy ? diffDays(eatBy) : undefined;
  const statusClass =
    status === "expired"
      ? "border-red-200 bg-red-50"
      : status === "use_soon"
        ? "border-amber-200 bg-amber-50"
        : "border-emerald-100 bg-white";
  const badgeClass =
    status === "expired"
      ? "bg-red-100 text-red-700"
      : status === "use_soon"
        ? "bg-amber-100 text-amber-800"
        : "bg-emerald-100 text-emerald-700";

  const dayText =
    typeof days !== "number"
      ? t(language, "fresh")
      : days < 0
        ? `${Math.abs(days)} ${t(language, "overdue")}`
        : days === 0
          ? language === "zh" ? "今天到期" : "Due today"
          : `${days} ${days === 1 ? t(language, "dayLeft") : t(language, "daysLeft")}`;

  return (
    <article className={`overflow-hidden rounded-3xl border p-3 shadow-soft ${statusClass}`}>
      <div className="flex gap-3">
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-emerald-100">
          {item.photoDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.photoDataUrl} alt={item.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-3xl">🥬</div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="truncate text-base font-bold text-slate-900">{item.name}</h3>
              <p className="text-xs text-slate-500">
                {item.category} · {t(language, item.storageLocation)}
              </p>
            </div>
            <span className={`shrink-0 rounded-full px-2 py-1 text-[11px] font-bold ${badgeClass}`}>{dayText}</span>
          </div>
          <div className="mt-2 text-sm text-slate-700">
            {eatBy ? `${t(language, "eatBy")}: ${formatDate(eatBy)}` : t(language, "sourceNote")}
          </div>
          {item.notes ? <p className="mt-1 line-clamp-2 text-xs text-slate-500">{item.notes}</p> : null}
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <button
          className="flex-1 rounded-2xl bg-emerald-600 px-3 py-2 text-sm font-bold text-white"
          onClick={() => updateFoodItem(item.id, { finished: true })}
        >
          {t(language, "finish")}
        </button>
        <button
          className="rounded-2xl bg-slate-100 px-3 py-2 text-sm font-bold text-slate-600"
          onClick={() => removeFoodItem(item.id)}
        >
          {t(language, "remove")}
        </button>
      </div>
    </article>
  );
}
