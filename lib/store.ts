"use client";

import { FoodItem, Language } from "./types";

const FOOD_KEY = "fridgemate.foodItems";
const LANGUAGE_KEY = "fridgemate.language";

function isFoodItem(value: unknown): value is FoodItem {
  if (typeof value !== "object" || value === null) return false;

  const item = value as Partial<FoodItem>;
  return (
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    typeof item.category === "string" &&
    ["fridge", "freezer", "pantry"].includes(item.storageLocation ?? "") &&
    typeof item.createdAt === "string" &&
    typeof item.updatedAt === "string"
  );
}

function isFoodItemList(value: unknown): value is FoodItem[] {
  return Array.isArray(value) && value.every(isFoodItem);
}

export function loadFoodItems(): FoodItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(FOOD_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return isFoodItemList(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveFoodItems(items: FoodItem[]) {
  window.localStorage.setItem(FOOD_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("fridgemate:changed"));
}

export function addFoodItem(item: FoodItem) {
  const items = loadFoodItems();
  saveFoodItems([item, ...items]);
}

export function updateFoodItem(id: string, patch: Partial<FoodItem>) {
  const items = loadFoodItems().map((item) =>
    item.id === id ? { ...item, ...patch, updatedAt: new Date().toISOString() } : item
  );
  saveFoodItems(items);
}

export function removeFoodItem(id: string) {
  saveFoodItems(loadFoodItems().filter((item) => item.id !== id));
}

export function exportFridgeData() {
  return JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), items: loadFoodItems() }, null, 2);
}

export function importFridgeData(raw: string) {
  const parsed: unknown = JSON.parse(raw);
  const items = Array.isArray(parsed)
    ? parsed
    : typeof parsed === "object" && parsed !== null && "items" in parsed
      ? (parsed as { items: unknown }).items
      : null;
  if (!isFoodItemList(items)) throw new Error("Backup contains invalid food items");
  saveFoodItems(items);
  return items.length;
}

export function loadLanguage(): Language {
  if (typeof window === "undefined") return "en";
  const value = window.localStorage.getItem(LANGUAGE_KEY);
  return value === "zh" ? "zh" : "en";
}

export function saveLanguage(language: Language) {
  window.localStorage.setItem(LANGUAGE_KEY, language);
  window.dispatchEvent(new Event("fridgemate:language"));
}
