# Prahari NatureCure — Play Store Setup Guide

## ✅ What's Already Done (by Replit Agent)
- `manifest.json` — full PWA manifest with all icons, shortcuts, theme colours
- `sw.js` — service worker for offline support and caching
- `icons/` — all icon sizes: 72, 96, 128, 144, 152, 192, 384, 512, maskable-512
- `.well-known/assetlinks.json` — TWA domain verification file (needs your SHA256 fingerprint)
- All 4 HTML pages updated with PWA meta tags + install banner

---

## 🚀 Step-by-Step: Publish to Google Play Store

### STEP 1 — Deploy Your Web App
1. Click **Deploy** in Replit (top right)
2. Choose **Autoscale** deployment
3. Your app will get a URL like: `https://prahari-naturecure.replit.app`
4. This URL is what the Play Store app will load

### STEP 2 — Use PWABuilder (Free, No Code Needed)
1. Go to: **https://www.pwabuilder.com**
2. Enter your deployed Replit URL
3. Click **Start** — it will validate your PWA (manifest, SW, icons)
4. Click **Package for stores** → choose **Google Play**
5. Fill in:
   - Package name: `com.prahari.naturecure`
   - App name: `Prahari NatureCure`
   - Version: `1.0`
   - Signing key: Generate new (PWABuilder will create one for you)
6. Download the generated `.aab` (Android App Bundle)

### STEP 3 — Get Your SHA256 Fingerprint
After PWABuilder generates your signing key:
1. Open the downloaded ZIP
2. Look for `signing-key-info.txt` — it has your SHA256 fingerprint
3. Paste it in `.well-known/assetlinks.json` replacing `REPLACE_WITH_YOUR_SHA256_FINGERPRINT`
4. Redeploy the app

### STEP 4 — Set Up Google Play Console
1. Go to: **https://play.google.com/console**
2. Pay one-time $25 developer registration fee
3. Create new app → "Prahari NatureCure"
4. Fill in:
   - Category: **Health & Fitness**
   - Content rating: Complete questionnaire (Everyone)
   - Privacy Policy URL: Add your policy page URL

### STEP 5 — Upload to Play Store
1. Go to **Production** → **Create new release**
2. Upload the `.aab` file from PWABuilder
3. Fill in release notes (e.g., "Initial release of Prahari NatureCure")
4. Submit for review (Google takes 3–7 days for first review)

---

## 📱 App Details for Play Store Listing

| Field | Value |
|-------|-------|
| App name | Prahari NatureCure |
| Package | com.prahari.naturecure |
| Category | Health & Fitness |
| Short description | Online naturopathy & yoga consultations with personalised diet plans |
| Full description | Prahari NatureCure brings certified naturopathy and yoga therapy to your phone. Book consultations, get personalised diet charts, and connect with expert doctors from the comfort of your home. |
| Content rating | Everyone |
| Theme colour | #0a5c4d (Forest Green) |

---

## 🔑 Required Assets for Play Store

- [x] App icon 512x512 PNG — `/icons/icon-512.png` ✅
- [x] Maskable icon 512x512 — `/icons/icon-maskable-512.png` ✅
- [ ] Feature graphic 1024x500 PNG — create in Canva/Figma
- [ ] 2-8 screenshots (phone) — take screenshots of your app
- [ ] Privacy Policy URL — add a privacy policy page to your site

---

## ⚡ Quick Install (Without Play Store)
Users on Android can install the app directly:
1. Open your deployed URL in Chrome
2. Tap the **"Install Prahari NatureCure"** banner at the bottom
3. Tap **Install** — the app appears on their home screen!

---

## 🛠 Technical Notes
- TWA (Trusted Web Activity) is used — the app loads your real website in native shell
- Service worker caches key pages for offline access
- All patient/doctor data is stored in browser localStorage (no server DB needed)
- Razorpay payments work inside the TWA exactly like the web
