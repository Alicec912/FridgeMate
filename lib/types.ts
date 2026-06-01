export type Language = "en" | "zh";
export type StorageLocation = "fridge" | "freezer" | "pantry";
export type RiskLevel = "low" | "medium" | "high";
export type FoodStatus = "fresh" | "use_soon" | "expired";

export type FoodItem = {
  id: string;
  name: string;
  category: string;
  storageLocation: StorageLocation;
  photoDataUrl?: string;
  purchaseDate?: string;
  openedDate?: string;
  bestBeforeDate?: string;
  useByDate?: string;
  suggestedStorageDays?: number;
  quantity?: string;
  notes?: string;
  finished?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type StorageGuide = {
  id: string;
  foodNameEn: string;
  foodNameZh: string;
  category: string;
  fridgeMinDays?: number;
  fridgeMaxDays?: number;
  freezerMonths?: number;
  pantryDays?: number;
  riskLevel: RiskLevel;
  notesEn: string;
  notesZh: string;
};
