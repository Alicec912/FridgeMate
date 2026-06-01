import { FoodItem, FoodStatus } from "./types";

export function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export function addDays(dateIso: string, days: number) {
  const date = new Date(`${dateIso}T00:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

export function diffDays(dateIso: string) {
  const today = new Date(`${todayIso()}T00:00:00`).getTime();
  const target = new Date(`${dateIso}T00:00:00`).getTime();
  return Math.ceil((target - today) / 86400000);
}

export function getEatByDate(item: FoodItem) {
  if (item.useByDate) return item.useByDate;
  if (item.bestBeforeDate) return item.bestBeforeDate;
  const baseDate = item.openedDate || item.purchaseDate || item.createdAt.slice(0, 10);
  if (item.suggestedStorageDays) return addDays(baseDate, item.suggestedStorageDays);
  return undefined;
}

export function getFoodStatus(item: FoodItem): FoodStatus {
  const eatBy = getEatByDate(item);
  if (!eatBy) return "fresh";
  const left = diffDays(eatBy);
  if (left < 0) return "expired";
  if (left <= 2) return "use_soon";
  return "fresh";
}

export function formatDate(dateIso?: string) {
  if (!dateIso) return "";
  const date = new Date(`${dateIso}T00:00:00`);
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(date);
}
