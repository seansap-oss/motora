# Motora — Android build guide (TWA via Bubblewrap)

Produces `app-release-signed.apk` (sideload / QA) and `app-release.aab`
(Play Console upload) from the deployed Motora web app.

---

## 0. Why TWA

Motora is a PWA. A Trusted Web Activity wraps the live site in a native shell
with no browser chrome, so the Play build and the web build never drift. The
alternative — Capacitor — is documented in §7 if you need native plugins.

---

## 1. Prerequisites

| Tool | Version | Check |
| --- | --- | --- |
| Node.js | ≥ 18 | `node -v` |
| JDK | 17 | `java -version` |
| Android SDK | Build-Tools 34+, Platform 34+ | `sdkmanager --list_installed` |
| Bubblewrap CLI | latest | `npx @bubblewrap/cli --version` |

```bash
# JDK 17 + Android command line tools must be on PATH
export JAVA_HOME=/path/to/jdk-17
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/latest/bin

npm install -g @bubblewrap/cli
```

On Windows PowerShell:

```powershell
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:PATH += ";$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\cmdline-tools\latest\bin"
```

---

## 2. Ship the web app first

The TWA loads the live URL, so deploy before building.

```bash
npm ci
npm run build          # vite build -> dist/client
npm run build:vercel   # runtime check + tsc + vite build
```

Verify these are reachable in production:

- `https://motora-five.vercel.app/manifest.webmanifest`
- `https://motora-five.vercel.app/icons/icon-512.png`
- `https://motora-five.vercel.app/icons/maskable-icon-512.png`
- `https://motora-five.vercel.app/privacy-policy`
- `https://motora-five.vercel.app/account-deletion`
- `https://motora-five.vercel.app/.well-known/assetlinks.json`

---

## 3. Create the signing keystore

Do this **once**. Losing this file means you can never update the app.

```bash
keytool -genkeypair -v \
  -keystore android.keystore \
  -alias motora \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -dname "CN=Motora, OU=Engineering, O=Motora, L=Imphal, ST=Manipur, C=IN"
```

Back up `android.keystore` and its passwords in a password manager.
**Never commit it** — confirm it is git-ignored:

```bash
echo "android.keystore" >> .gitignore
echo "*.keystore"       >> .gitignore
echo "android/"         >> .gitignore
```

---

## 4. Initialise and build

`twa-manifest.json` is already committed in the repo root.

```bash
# Pull config from the deployed manifest (uses the committed twa-manifest.json)
bubblewrap init --manifest https://motora-five.vercel.app/manifest.webmanifest

# Build both artefacts
bubblewrap build
```

Outputs:

| File | Use |
| --- | --- |
| `app-release-signed.apk` | Sideload for QA on a device |
| `app-release-bundle.aab` | Upload to Play Console |

Rename the bundle if your process expects `app-release.aab`:

```bash
mv app-release-bundle.aab app-release.aab
```

### Gradle alternative (after `bubblewrap init` generates `./android`)

```bash
cd android
./gradlew assembleRelease   # -> app/build/outputs/apk/release/app-release.apk
./gradlew bundleRelease     # -> app/build/outputs/bundle/release/app-release.aab
```

Sign manually if Gradle produced an unsigned artefact:

```bash
# APK
zipalign -v -p 4 app-release-unsigned.apk app-release-aligned.apk
apksigner sign --ks ../android.keystore --ks-key-alias motora \
  --out app-release-signed.apk app-release-aligned.apk
apksigner verify --verbose app-release-signed.apk

# AAB
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 \
  -keystore ../android.keystore app-release.aab motora
```

---

## 5. Digital Asset Links — the step that breaks most builds

If this is wrong the app opens with a **browser address bar** instead of
full screen. Two fingerprints must be listed.

### 5.1 Upload-key fingerprint

```bash
keytool -list -v -keystore android.keystore -alias motora | grep SHA256
```

### 5.2 Play App Signing fingerprint

Play re-signs your bundle. Get the second fingerprint from
**Play Console → Test and release → Setup → App signing**.

### 5.3 Publish both

Edit `public/.well-known/assetlinks.json` and replace both placeholders, then
redeploy the site.

```bash
bubblewrap fingerprint generateAssetLinks   # convenience generator
```

Verify after deploy:

```bash
curl -s https://motora-five.vercel.app/.well-known/assetlinks.json | jq .
```

Google's validator:

```
https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://motora-five.vercel.app&relation=delegate_permission/common.handle_all_urls
```

> `assetlinks.json` must be served over HTTPS as `application/json`, with no
> redirect. Vercel serves `public/.well-known/` correctly by default.

---

## 6. Install and smoke-test

```bash
adb install -r app-release-signed.apk
adb logcat | grep -i "TWA\|AssetLink"
```

Device checklist:

- [ ] Launches full screen with **no URL bar** (proves asset links work)
- [ ] Splash screen uses the cream background `#FBFAF7`
- [ ] Android back button navigates within the app, not straight out
- [ ] Home, Explore, Sell, Saved, Profile all reachable
- [ ] Sign-in works with `test20@motora.in` / PIN `5962`
- [ ] Camera and microphone prompts appear only when adding media
- [ ] `/privacy-policy`, `/terms`, `/account-deletion` all render
- [ ] Offline: app shell still loads via the service worker

---

## 7. Capacitor alternative

Use this only if you need native APIs a TWA cannot reach.

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "Motora" "in.motora.app" --web-dir=dist/client
npm run build
npx cap add android
npx cap sync android
npx cap open android      # then Build > Generate Signed Bundle / APK
```

CLI equivalent:

```bash
cd android && ./gradlew bundleRelease
```

---

## 8. Version bumps

Play rejects a re-used `versionCode`. Increment both fields in
`twa-manifest.json` before every upload:

```json
"appVersionName": "1.0.1",
"appVersionCode": 2
```

Then `bubblewrap update && bubblewrap build`.

---

## 9. Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| URL bar visible in app | Asset links invalid | Add **both** SHA-256 fingerprints, redeploy, reinstall |
| `Package name already exists` | `packageId` clash | Change `packageId` in `twa-manifest.json` |
| White screen on launch | Site unreachable or CSP blocks framing | Check `startUrl` returns 200 |
| Deep link opens Chrome | Host mismatch | `host` must equal the production domain exactly |
| Play rejects AAB: target API | SDK too old | Update `compileSdk`/`targetSdk` to the current Play minimum |
| Upload rejected: debug signed | Wrong keystore | Rebuild with the release keystore |
| Icon looks cropped on device | Missing safe zone | Keep maskable art inside the central 80% |

---

## 10. Release sequence

1. `npm run build` — confirm zero errors
2. Deploy to production and verify the URLs in §2
3. Bump `appVersionCode`
4. `bubblewrap build`
5. Verify `apksigner verify app-release-signed.apk`
6. Upload `app-release.aab` to the **closed testing** track
7. Copy the App access credentials from `docs/PLAY_STORE_LISTING.md` §5
8. Confirm asset links resolve, then invite the 20 testers
