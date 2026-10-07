# Situs Respite (Svelte + Cloudflare Pages)

Company profile — dibangun dengan [Svelte](https://svelte.dev) + Vite.

## Deploy ke Cloudflare Pages

1. Push repo ini ke GitHub.
2. Cloudflare Dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pilih repo ini.
3. Isi:
   - **Project root / Root directory**: `website`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Save and Deploy. Setiap push ke GitHub otomatis memperbarui situs.

## Development lokal

```bash
npm install
npm run dev      # dev server
npm run build    # build produksi → dist/
npm run preview  # preview hasil build
```

## Sebelum publish

Ganti `username` di `src/App.svelte` (konstanta `REPO` di baris paling atas)
dengan username GitHub kamu.
