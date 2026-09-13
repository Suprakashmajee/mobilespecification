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

GitHub does not update [mobilespecific.com](https://mobilespecific.com). Hostinger serves whatever is in `public_html`.

### Automatic deploy (GitHub Actions)

1. In hPanel → Websites → mobilespecific.com → Files → **FTP Accounts**, copy host, username, and password. The username is **not** your Gmail address.
2. In the GitHub repo: Settings → Secrets and variables → Actions, add:
   - `HOSTINGER_FTP_USER`
   - `HOSTINGER_FTP_PASSWORD`
   - optional `HOSTINGER_FTP_HOST` (default `ftp.mobilespecific.com`)
   - optional `HOSTINGER_FTP_DIR` (default `/public_html/`)
3. Push to `main` (or use **Actions → Deploy to Hostinger → Run workflow**).

### Manual deploy

```bash
npm run build
export HOSTINGER_FTP_USER='from-hpanel'
export HOSTINGER_FTP_PASSWORD='from-hpanel'
npm run deploy
```

After a successful upload, https://mobilespecific.com/version.json should show `"build":"2026.09.13-live"`. Purge hCDN in hPanel if the old teal bundle remains.

Import `public/mobilespecific_hostinger_db.sql`. Copy `hostinger/api` to `public_html/api` and edit `config.php` on the server only.

Never commit Hostinger passwords.
