# mobilespecific

Specification-only hardware lab for phones, laptops, watches, and tablets. No price tags.

Live domain target: [mobilespecific.com](https://mobilespecific.com)

## Features

- Catalogs with calibrated nits, sensors, LUFS, Silicon-Carbon batteries, NPU TOPS
- Compare arena with difference highlighting and category winners
- Optics split slider, battery/silicon leaderboards, millimetric pocket-fit visualizer
- Phone finder (silicon vendor, IP rating, periscope, battery capacity)
- Lab news, login/sign up, bookmarks
- Google AdSense spaces: leaderboard, in-feed, sidebar rectangle, sticky anchor
- Hostinger MySQL schema + PHP API stubs

## AdSense

1. Create an AdSense account and add `mobilespecific.com`.
2. Put `ca-pub-XXXXXXXXXXXXXXXX` in `.env` as `VITE_ADSENSE_CLIENT_ID`.
3. Replace `pub-XXXXXXXXXXXXXXXX` in `public/ads.txt`.
4. After approval, replace the placeholder `data-ad-slot` values in `src/components/AdSenseUnit.tsx` usages with real slot IDs from AdSense.

Until a real publisher ID is set, slots render labeled advertisement placeholders so layout is reserved.

## Develop

```bash
npm install
npm run dev
```

Demo account: `owner@mobilespecific.com` / `lab-owner`

## Build & Hostinger

```bash
npm run build
```

Upload `dist/` to `public_html`. Import `public/mobilespecific_hostinger_db.sql`. Copy `hostinger/api` to `public_html/api` and edit `config.php` on the server only.

Never commit Hostinger passwords.
