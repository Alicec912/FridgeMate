import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FridgeMate 冰箱管家",
    short_name: "FridgeMate",
    description: "A mobile-first fridge food tracker with bilingual labels and expiry reminders.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff9f0",
    theme_color: "#16a34a",
    icons: [
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
