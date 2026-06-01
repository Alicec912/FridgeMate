"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BottomNav } from "../../components/BottomNav";
import { useFridge } from "../../components/useFridge";
import { todayIso } from "../../lib/dateUtils";
import { t } from "../../lib/i18n";
import { addFoodItem } from "../../lib/store";
import { categories, findGuideByName, storageGuides } from "../../lib/storageGuide";
import { StorageLocation } from "../../lib/types";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-700">{label}</span>
      {children}
    </label>
  );
}

export default function AddPage() {
  const router = useRouter();
  const { language } = useFridge();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Vegetables");
  const [storageLocation, setStorageLocation] = useState<StorageLocation>("fridge");
  const [purchaseDate, setPurchaseDate] = useState(todayIso());
  const [openedDate, setOpenedDate] = useState("");
  const [bestBeforeDate, setBestBeforeDate] = useState("");
  const [useByDate, setUseByDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");
  const [photoDataUrl, setPhotoDataUrl] = useState<string | undefined>();

  const guide = useMemo(() => findGuideByName(name), [name]);
  const suggestedDays = guide?.fridgeMaxDays;

  function handlePhoto(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoDataUrl(String(reader.result));
    reader.readAsDataURL(file);
  }

  function pickGuide(guideId: string) {
    const selected = storageGuides.find((item) => item.id === guideId);
    if (!selected) return;
    setName(language === "zh" ? selected.foodNameZh : selected.foodNameEn);
    setCategory(selected.category);
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!name.trim()) return;
    addFoodItem({
      id: crypto.randomUUID(),
      name: name.trim(),
      category,
      storageLocation,
      photoDataUrl,
      purchaseDate: purchaseDate || undefined,
      openedDate: openedDate || undefined,
      bestBeforeDate: bestBeforeDate || undefined,
      useByDate: useByDate || undefined,
      suggestedStorageDays: !bestBeforeDate && !useByDate ? suggestedDays : undefined,
      quantity: quantity || undefined,
      notes: notes || (guide ? (language === "zh" ? guide.notesZh : guide.notesEn) : undefined),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    router.push("/");
  }

  const inputClass = "w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 outline-none focus:border-emerald-400";

  return (
    <main className="safe-bottom mx-auto min-h-screen max-w-md px-4 pt-6">
      <h1 className="text-3xl font-black text-slate-950">{t(language, "addItem")}</h1>
      <p className="mt-2 text-sm text-slate-600">{t(language, "sourceNote")}</p>

      <form onSubmit={submit} className="mt-5 grid gap-4 rounded-[2rem] bg-white/90 p-4 shadow-soft">
        <Field label={t(language, "takePhoto")}>
          <div className="flex items-center gap-3">
            <label className="flex h-28 flex-1 cursor-pointer items-center justify-center rounded-3xl border-2 border-dashed border-emerald-200 bg-emerald-50 text-center text-sm font-bold text-emerald-700">
              {photoDataUrl ? "Change photo" : "📷"}
              <input
                className="hidden"
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(event) => handlePhoto(event.target.files?.[0])}
              />
            </label>
            {photoDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photoDataUrl} alt="Preview" className="h-28 w-28 rounded-3xl object-cover" />
            ) : null}
          </div>
        </Field>

        <Field label={language === "zh" ? "快速选择" : "Quick pick"}>
          <select className={inputClass} defaultValue="" onChange={(event) => pickGuide(event.target.value)}>
            <option value="">{language === "zh" ? "选择常见食品" : "Choose common food"}</option>
            {storageGuides.map((guide) => (
              <option key={guide.id} value={guide.id}>{language === "zh" ? guide.foodNameZh : guide.foodNameEn}</option>
            ))}
          </select>
        </Field>

        <Field label={t(language, "foodName")}>
          <input className={inputClass} value={name} onChange={(event) => setName(event.target.value)} required />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label={t(language, "category")}>
            <select className={inputClass} value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((cat) => <option key={cat}>{cat}</option>)}
            </select>
          </Field>
          <Field label={t(language, "storage")}>
            <select className={inputClass} value={storageLocation} onChange={(event) => setStorageLocation(event.target.value as StorageLocation)}>
              <option value="fridge">{t(language, "fridge")}</option>
              <option value="freezer">{t(language, "freezer")}</option>
              <option value="pantry">{t(language, "pantry")}</option>
            </select>
          </Field>
        </div>

        {guide ? (
          <div className="rounded-3xl bg-emerald-50 p-4 text-sm text-emerald-900">
            <div className="font-black">{t(language, "suggested")}: {guide.fridgeMinDays}-{guide.fridgeMaxDays} days</div>
            <p className="mt-1">{language === "zh" ? guide.notesZh : guide.notesEn}</p>
          </div>
        ) : null}

        <div className="grid grid-cols-2 gap-3">
          <Field label={t(language, "purchaseDate")}>
            <input className={inputClass} type="date" value={purchaseDate} onChange={(event) => setPurchaseDate(event.target.value)} />
          </Field>
          <Field label={t(language, "openedDate")}>
            <input className={inputClass} type="date" value={openedDate} onChange={(event) => setOpenedDate(event.target.value)} />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label={t(language, "bestBefore")}>
            <input className={inputClass} type="date" value={bestBeforeDate} onChange={(event) => setBestBeforeDate(event.target.value)} />
          </Field>
          <Field label={t(language, "useBy")}>
            <input className={inputClass} type="date" value={useByDate} onChange={(event) => setUseByDate(event.target.value)} />
          </Field>
        </div>

        <Field label={t(language, "quantity")}>
          <input className={inputClass} value={quantity} onChange={(event) => setQuantity(event.target.value)} placeholder={language === "zh" ? "例如：半瓶、2 个、一盒" : "e.g. half bottle, 2 pieces"} />
        </Field>

        <Field label={t(language, "notes")}>
          <textarea className={`${inputClass} min-h-24`} value={notes} onChange={(event) => setNotes(event.target.value)} />
        </Field>

        <button className="rounded-3xl bg-emerald-600 px-5 py-4 text-base font-black text-white shadow-soft" type="submit">
          {t(language, "save")}
        </button>
      </form>
      <BottomNav language={language} />
    </main>
  );
}
