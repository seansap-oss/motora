========================================================================
MOTORA - GOOGLE PLAY SUBMISSION PACKAGE
========================================================================

Everything needed to publish Motora to the Google Play Store is in this
folder. Read section 1 to install the app on a phone right now, and
section 5 for the upload walkthrough.

Built: 8 August 2026
Package ID: in.motora.app
Version: 1.0.0 (versionCode 1)
Live site: https://motora-five.vercel.app


========================================================================
1. INSTALL THE APP ON YOUR PHONE
========================================================================

APK FILE - COPY THIS TO YOUR PHONE:

    D:\Motora\Google Publish\APK\app-release-signed.apk

    Size:       0.92 MB
    Signed:     Yes (v1 + v2 + v3 signature schemes verified)
    Min phone:  Android 6.0 (API 23) or newer
    Target:     Android 16 (API 36)

HOW TO INSTALL:

    Option A - USB cable
      1. Connect your phone to this PC with a USB cable.
      2. Copy app-release-signed.apk to the phone's Downloads folder.
      3. On the phone, open Files > Downloads and tap the APK.
      4. Android will warn about installing from an unknown source.
         Tap "Settings" and allow installation for your file manager,
         then tap Install.

    Option B - ADB (developer)
      adb install -r "D:\Motora\Google Publish\APK\app-release-signed.apk"

    Option C - Cloud
      Upload the APK to Google Drive, open the link on your phone and
      tap the file to install.

PLAY CONSOLE UPLOAD FILE (do NOT sideload this one):

    D:\Motora\Google Publish\APK\app-release.aab

    Size: 1.04 MB
    This is the Android App Bundle. Google Play only accepts .aab for
    new apps. The .apk above is for direct phone installation and QA.


========================================================================
2. LOGIN DETAILS
========================================================================

>>> ADMIN ACCESS - FULL ACCESS TO EVERY SCREEN <<<

    EMAIL:  test20@motora.in
    PIN:    5962

    This unlocks the Owner Super-Admin panel: dealer approvals,
    catalogue model injection, category duplication and the listing
    moderation queue.

HOW TO SIGN IN:

    1. Open the app.
    2. Tap "Sell" or "Profile" in the bottom navigation bar.
       (Browsing and search work without signing in.)
    3. Type the email address above.
    4. Type the 4-digit PIN.
    5. Tap "Sign in".

    There is no OTP, no SMS and no password reset. This is deliberate
    for closed testing.

OTHER TEST ACCOUNTS:

    All 20 accounts, PINs and roles are listed in:
    Google Publish\Testing Credentials\TEST_ACCOUNTS.txt

    Quick reference:
      test01-test05  Private Sellers   (Free tier)
      test06-test10  Verified Dealers  (Comprehensive tier)
      test11-test19  Buyers / Testers  (Free tier)
      test20         Super Admin       (Dealer tier)


========================================================================
3. GOOGLE PLAY CHARACTER LIMITS - IMPORTANT
========================================================================

Google Play enforces hard character limits. Two of the originally
requested strings were too long and WOULD HAVE BEEN REJECTED. Use the
compliant versions below.

  FIELD              LIMIT   USE THIS                            COUNT
  ------------------ ------- ----------------------------------- -----
  App name           30      Motora: Vehicle Marketplace         27
  Short description  80      India's marketplace for cars,       68
                             bikes, scooters & commercial
                             vehicles.
  Full description   4000    See PLAY_STORE_LISTING.txt          ~3730

WHAT WAS TOO LONG:

  * Requested title "Motora - Vehicles & Transport Marketplace"
    is 44 characters. The 30-character limit means it cannot be used
    as the store name. It IS used as the in-app label and as the
    opening line of the full description, which is allowed.

  * Requested short description
    "India's mobile-first marketplace for cars, bikes, scooters &
    commercial vehicles." is 82 characters, 2 over the limit.
    The 68-character version keeps the meaning.

  Alternative short description at 79/80 characters if you prefer to
  keep the words "mobile-first":
    Mobile-first India marketplace for cars, bikes, scooters & commercial vehicles.


========================================================================
4. WHAT IS IN THIS FOLDER
========================================================================

  Google Publish\
   |
   +-- README.txt                     <- you are here
   |
   +-- APK\
   |    +-- app-release-signed.apk    Install on a phone (0.92 MB)
   |    +-- app-release.aab           Upload to Play Console (1.04 MB)
   |
   +-- Legal Documents\
   |    +-- PRIVACY_POLICY.txt        896 words
   |    +-- TERMS_OF_SERVICE.txt      1001 words
   |    +-- ACCOUNT_DELETION.txt      276 words
   |
   +-- Store Listing & Metadata\
   |    +-- PLAY_STORE_LISTING.txt    All Play Console copy
   |    +-- BUILD_APK.txt             How to rebuild the APK
   |    +-- assetlinks.json           Digital Asset Links
   |    +-- icon-512.png              App icon
   |    +-- maskable-icon-512.png     Adaptive icon
   |    +-- icon-192.png              Small icon
   |
   +-- Testing Credentials\
        +-- TEST_ACCOUNTS.txt         All 20 accounts and PINs


========================================================================
5. STEP-BY-STEP: WHERE TO UPLOAD EACH ITEM
========================================================================

Sign in at https://play.google.com/console and create the app
(App name "Motora: Vehicle Marketplace", language English (India),
type App, Free).

--- STEP 1: UPLOAD THE APP BUNDLE -------------------------------------

  Where:  Test and release > Testing > Closed testing > Create release
  Upload: Google Publish\APK\app-release.aab

  Release name: 1.0.0
  Release notes: First closed testing release of Motora.

  NOTE: Upload the .aab, NOT the .apk. Play rejects APKs for new apps.

--- STEP 2: ADD YOUR 20 TESTERS ---------------------------------------

  Where:  Test and release > Testing > Closed testing > Testers
  Action: Create an email list, paste all 20 addresses from
          Testing Credentials\TEST_ACCOUNTS.txt

  IMPORTANT: Google requires 12 testers opted in continuously for
  14 days before you can apply for production access.

--- STEP 3: REVIEWER LOGIN --------------------------------------------

  Where:  App content > App access
  Choose: "All or some functionality is restricted"
  Add instructions:

      Name: Seller and admin access
      Email: test20@motora.in
      Password: 5962
      Instructions: Tap "Sell" or "Profile" in the bottom navigation.
      Enter the email address and the 4-digit PIN. There is no OTP or
      SMS step. This account has full admin access.

--- STEP 4: PRIVACY POLICY --------------------------------------------

  Where:  App content > Privacy policy
  Paste:  https://motora-five.vercel.app/privacy-policy

  The full text is in Legal Documents\PRIVACY_POLICY.txt if a reviewer
  asks for it, but the Console needs the URL.

--- STEP 5: DATA SAFETY -----------------------------------------------

  Where:  App content > Data safety
  Copy the answers from the "Data safety form" table in
  Store Listing & Metadata\PLAY_STORE_LISTING.txt (section 4).

  Deletion URL to enter:
      https://motora-five.vercel.app/account-deletion

--- STEP 6: CONTENT RATING --------------------------------------------

  Where:  App content > Content rating
  Category: Shopping / Marketplace
  Answer using the questionnaire table in PLAY_STORE_LISTING.txt
  (section 3). Expected result: Rated 3+.

  Key answers: users interact = YES, shares location = YES,
  digital purchases = YES, violence/sexual/gambling = NO.

--- STEP 7: TARGET AUDIENCE -------------------------------------------

  Where:  App content > Target audience and content
  Age:    18 and over ONLY. Do not tick any under-18 band.
  Appeals to children: No.

--- STEP 8: STORE LISTING ---------------------------------------------

  Where:  Grow > Store presence > Main store listing

  App name (30):          Motora: Vehicle Marketplace
  Short description (80): India's marketplace for cars, bikes,
                          scooters & commercial vehicles.
  Full description:       Copy from PLAY_STORE_LISTING.txt section 1
  App icon:               Store Listing & Metadata\icon-512.png

--- STEP 9: GRAPHICS - YOU MUST CREATE THESE --------------------------

  Where:  Grow > Store presence > Main store listing > Graphics

  Still required (I could not generate these):
    [ ] Feature graphic  1024 x 500 PNG or JPG, no transparency
    [ ] Phone screenshots, minimum 2, recommended 8

  Suggested screenshots (take at 1080x1920 from the live site):
    1. Home - hero carousel and category chips
    2. Search results with filters
    3. Vehicle detail with Motora Checked badge
    4. EMI calculator and on-road price
    5. Guided sell flow
    6. Dealer storefront
    7. Seller dashboard
    8. Packages and UPI checkout

--- STEP 10: DIGITAL ASSET LINKS - CRITICAL ---------------------------

  If you skip this, the app opens with a browser address bar visible
  instead of full screen.

  The upload-key fingerprint is ALREADY filled in:
      4B:E1:A2:C9:12:55:F9:7C:D0:6E:51:1A:29:A9:8B:18:
      72:81:03:8C:21:09:5C:8A:A7:BA:DA:0C:EC:33:39:F4

  You still need the SECOND fingerprint, because Google re-signs your
  bundle:

    1. Upload the .aab (step 1) and wait for processing.
    2. Go to Test and release > Setup > App signing.
    3. Copy the "App signing key certificate" SHA-256 fingerprint.
    4. Open your project file:
         D:\Motora\public\.well-known\assetlinks.json
    5. Replace REPLACE_WITH_SHA256_FROM_PLAY_APP_SIGNING with it.
    6. Redeploy the website.
    7. Confirm it is live:
         https://motora-five.vercel.app/.well-known/assetlinks.json


========================================================================
6. VERIFICATION ALREADY COMPLETED
========================================================================

  [x] APK signature verified (v1, v2 and v3 schemes)
  [x] APK certificate matches the fingerprint in assetlinks.json
  [x] Package name in.motora.app, version 1.0.0
  [x] targetSdk 36 - meets the current Play requirement
  [x] minSdk 23 - supports Android 6.0 and newer
  [x] AAB signed and "jar verified"
  [x] All 20 test accounts sign in successfully
  [x] Unknown emails and wrong PINs are rejected
  [x] Privacy, Terms and Account Deletion pages live and reachable
  [x] npm run build completes with zero errors


========================================================================
7. STILL TO DO BEFORE YOU CAN PUBLISH
========================================================================

  1. Create the feature graphic (1024 x 500).
  2. Capture at least 2 phone screenshots.
  3. Add the Play App Signing fingerprint to assetlinks.json and
     redeploy (see step 10).
  4. Invite the 20 testers and get 12 opted in for 14 days.

  SECURITY NOTE: the 20 PINs are compiled into the app and are visible
  to anyone who inspects it. That is acceptable for closed testing with
  throwaway accounts, but replace this with a real backend before any
  production release. Set VITE_DISABLE_TEST_ACCOUNTS=true to disable
  the hardcoded login path.

  KEYSTORE: the signing key is at D:\Motora\android.keystore
  (password: motora2026). BACK IT UP. If you lose this file you can
  never publish an update to this app. It is excluded from git on
  purpose.


========================================================================
Questions: support@motora.in
========================================================================
