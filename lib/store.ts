"use client";

import { FoodItem, Language } from "./types";

const FOOD_KEY = "fridgemate.foodItems";
const LANGUAGE_KEY = "fridgemate.language";

export function loadFoodItems(): FoodItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(FOOD_KEY);
    return raw ? JSON.parse(raw) : [];
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

export function loadLanguage(): Language {
  if (typeof window === "undefined") return "en";
  const value = window.localStorage.getItem(LANGUAGE_KEY);
  return value === "zh" ? "zh" : "en";
}

export function saveLanguage(language: Language) {
  window.localStorage.setItem(LANGUAGE_KEY, language);
  window.dispatchEvent(new Event("fridgemate:language"));
}
