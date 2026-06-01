import { StorageGuide } from "./types";

export const storageGuides: StorageGuide[] = [
  {
    id: "milk",
    foodNameEn: "Milk",
    foodNameZh: "牛奶",
    category: "Dairy",
    fridgeMinDays: 5,
    fridgeMaxDays: 7,
    riskLevel: "medium",
    notesEn: "Use the package date first. Once opened, use within about a week.",
    notesZh: "优先看包装日期。开封后通常建议一周内喝完。"
  },
  {
    id: "yogurt",
    foodNameEn: "Yogurt",
    foodNameZh: "酸奶",
    category: "Dairy",
    fridgeMinDays: 7,
    fridgeMaxDays: 14,
    riskLevel: "medium",
    notesEn: "Use the printed date where available.",
    notesZh: "有包装日期时优先使用包装日期。"
  },
  {
    id: "raw-chicken",
    foodNameEn: "Raw chicken",
    foodNameZh: "生鸡肉",
    category: "Meat",
    fridgeMinDays: 1,
    fridgeMaxDays: 2,
    freezerMonths: 9,
    riskLevel: "high",
    notesEn: "High-risk food. Cook or freeze quickly.",
    notesZh: "高风险食品，尽快烹饪或冷冻。"
  },
  {
    id: "raw-beef-steak",
    foodNameEn: "Raw beef / steak",
    foodNameZh: "生牛肉 / 牛排",
    category: "Meat",
    fridgeMinDays: 3,
    fridgeMaxDays: 5,
    freezerMonths: 6,
    riskLevel: "high",
    notesEn: "Keep sealed and cold. Freeze if you will not cook it soon.",
    notesZh: "保持密封冷藏。如果不马上做，建议冷冻。"
  },
  {
    id: "cooked-leftovers",
    foodNameEn: "Cooked leftovers",
    foodNameZh: "剩饭剩菜",
    category: "Leftovers",
    fridgeMinDays: 2,
    fridgeMaxDays: 3,
    riskLevel: "high",
    notesEn: "Cool quickly, refrigerate, and reheat thoroughly.",
    notesZh: "尽快冷却后冷藏，吃前彻底加热。"
  },
  {
    id: "cooked-rice",
    foodNameEn: "Cooked rice",
    foodNameZh: "熟米饭",
    category: "Leftovers",
    fridgeMinDays: 1,
    fridgeMaxDays: 2,
    riskLevel: "high",
    notesEn: "Rice is easy to forget but can be risky. Eat soon.",
    notesZh: "熟米饭容易被忽略，但风险较高，建议尽快吃。"
  },
  {
    id: "leafy-greens",
    foodNameEn: "Leafy greens",
    foodNameZh: "绿叶菜",
    category: "Vegetables",
    fridgeMinDays: 3,
    fridgeMaxDays: 5,
    riskLevel: "low",
    notesEn: "Keep dry and loosely wrapped.",
    notesZh: "保持干燥，轻轻包好冷藏。"
  },
  {
    id: "berries",
    foodNameEn: "Berries",
    foodNameZh: "浆果",
    category: "Fruit",
    fridgeMinDays: 2,
    fridgeMaxDays: 3,
    riskLevel: "low",
    notesEn: "Very perishable. Check for mold daily.",
    notesZh: "很容易坏，建议每天检查是否发霉。"
  },
  {
    id: "carrots",
    foodNameEn: "Carrots",
    foodNameZh: "胡萝卜",
    category: "Vegetables",
    fridgeMinDays: 14,
    fridgeMaxDays: 21,
    riskLevel: "low",
    notesEn: "Usually lasts longer if kept dry and cold.",
    notesZh: "保持干燥冷藏通常能放更久。"
  },
  {
    id: "eggs",
    foodNameEn: "Eggs",
    foodNameZh: "鸡蛋",
    category: "Dairy",
    fridgeMinDays: 21,
    fridgeMaxDays: 35,
    riskLevel: "medium",
    notesEn: "Use the carton date if available.",
    notesZh: "有包装日期时优先看包装日期。"
  },
  {
    id: "cheese",
    foodNameEn: "Cheese",
    foodNameZh: "奶酪",
    category: "Dairy",
    fridgeMinDays: 7,
    fridgeMaxDays: 21,
    riskLevel: "medium",
    notesEn: "Shelf life varies a lot. Use the package date when possible.",
    notesZh: "不同奶酪差异很大，优先按包装日期。"
  },
  {
    id: "opened-juice",
    foodNameEn: "Opened juice",
    foodNameZh: "开封果汁",
    category: "Drinks",
    fridgeMinDays: 5,
    fridgeMaxDays: 7,
    riskLevel: "medium",
    notesEn: "Keep refrigerated after opening.",
    notesZh: "开封后需要冷藏。"
  }
];

export const categories = ["Dairy", "Meat", "Vegetables", "Fruit", "Leftovers", "Drinks", "Frozen", "Other"];

export function findGuideByName(name: string): StorageGuide | undefined {
  const text = name.trim().toLowerCase();
  if (!text) return undefined;
  return storageGuides.find((guide) => {
    return (
      text.includes(guide.foodNameEn.toLowerCase()) ||
      guide.foodNameZh.includes(name.trim()) ||
      name.trim().includes(guide.foodNameZh)
    );
  });
}
