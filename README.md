# FridgeMate / 冰箱管家

A mobile-first fridge food tracker MVP.

## Features

- Add fridge items by photo upload or manual input
- Best before / use by date tracking
- Suggested storage duration for common foods
- Bilingual UI: English and Chinese
- Mobile-first responsive design
- Bottom navigation like a mobile app
- Local browser storage for MVP data
- PWA manifest included

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Import the repository in Vercel.
3. Use the default Next.js settings.
4. Deploy.

## Notes

This MVP stores data in localStorage. That means the data only exists in the current browser/device.

Recommended next upgrade:

- Supabase Auth
- Supabase Postgres for food items
- Supabase Storage for photos
- Push notifications
- OCR for best-before labels
- AI image recognition for food name suggestions

## Food safety note

The included storage guide uses practical defaults. Package dates, storage conditions, smell, texture, visible mould, and local food safety guidance should still be considered.
