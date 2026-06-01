"use client";

import { useEffect, useMemo, useState } from "react";
import { loadFoodItems, loadLanguage, saveLanguage } from "../lib/store";
import { FoodItem, Language } from "../lib/types";
import { getFoodStatus } from "../lib/dateUtils";

export function useFridge() {
  const [items, setItems] = useState<FoodItem[]>([]);
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const refreshItems = () => setItems(loadFoodItems());
    const refreshLanguage = () => setLanguageState(loadLanguage());
    refreshItems();
    refreshLanguage();
    window.addEventListener("fridgemate:changed", refreshItems);
    window.addEventListener("storage", refreshItems);
    window.addEventListener("fridgemate:language", refreshLanguage);
    return () => {
      window.removeEventListener("fridgemate:changed", refreshItems);
      window.removeEventListener("storage", refreshItems);
      window.removeEventListener("fridgemate:language", refreshLanguage);
    };
  }, []);

  const activeItems = useMemo(() => items.filter((item) => !item.finished), [items]);
  const urgentItems = useMemo(
    () => activeItems.filter((item) => ["expired", "use_soon"].includes(getFoodStatus(item))),
    [activeItems]
  );

  const setLanguage = (next: Language) => {
    saveLanguage(next);
    setLanguageState(next);
  };

  return { items, activeItems, urgentItems, language, setLanguage };
}
