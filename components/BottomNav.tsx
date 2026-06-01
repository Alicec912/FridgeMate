"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Language } from "../lib/types";

const labels = {
  en: { home: "Fridge", add: "Add", alerts: "Alerts", settings: "Settings" },
  zh: { home: "冰箱", add: "添加", alerts: "提醒", settings: "设置" }
};

export function BottomNav({ language }: { language: Language }) {
  const pathname = usePathname();
  const nav = [
    { href: "/", icon: "🏠", label: labels[language].home },
    { href: "/add", icon: "➕", label: labels[language].add },
    { href: "/alerts", icon: "🔔", label: labels[language].alerts },
    { href: "/settings", icon: "⚙️", label: labels[language].settings }
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-md border-t border-emerald-100 bg-white/95 px-3 pb-[calc(env(safe-area-inset-bottom)+10px)] pt-2 shadow-soft backdrop-blur">
      <div className="grid grid-cols-4 gap-1">
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-2xl px-2 py-2 text-center text-xs font-semibold transition ${
                active ? "bg-emerald-100 text-emerald-700" : "text-slate-500"
              }`}
            >
              <div className="text-lg">{item.icon}</div>
              <div>{item.label}</div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
