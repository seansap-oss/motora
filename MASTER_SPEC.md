# Motora — Master Product Spec

## Product promise

Motora is a mobile-first Indian marketplace for discovering, comparing, and advertising every personal or commercial vehicle: cars, motorcycles, scooters, electric scooters, three-wheelers, trucks, buses, bicycles, e-bikes, and kids' cycles. It serves verified dealers, private sellers, and collectors with shareable storefronts.

## Locked visual direction

- **Option 1 — Orange Light:** default, permanent base UI until the owner explicitly requests a redesign.
- **Option 3 — Gold Black:** accessible dark mode with coordinated surfaces, type, icons, controls, and gold accents.
- Keep vehicle photography centered in square/rounded cards, with balanced image cropping and no distorted models.
- The landing page must be mobile-first, with a simple category menu, quick discovery, brand discovery, featured/premium stock, and an app-first footer.

## Primary information architecture

| Area | Purpose |
| --- | --- |
| Home | Browse category, search, brands, featured offers, premium/Motora Checked listings |
| Search & results | Query by make/model/title; filter type, EV/fuel, price, year, kilometres, location, transmission, seller, condition, and verification |
| Vehicle detail | Photo mosaic/media, optional compressed video and voice note, price, specs, disclosures, description, verification, seller contact, similar listings |
| Storefront | Dealer, private seller, or collector profile; gallery, stock, offers, contact, share link |
| Account | Saved listings/searches, enquiries, notification preferences, listings, profile |
| List a vehicle | Guided make/model/category-first form, photos/video/audio, condition, registration, price, seller details, preview/publish |
| Admin | Moderation, catalogue/model data, asset management, verification queue, sellers, packages, reports |

## Vehicle taxonomy

- **Cars:** new, used, luxury, SUV, hatchback, sedan, MPV, coupe, convertible, pickup, EV, CNG/hybrid.
- **Bikes:** commuter, sports, cruiser, adventure, superbike, electric motorcycle.
- **Scooters:** petrol, electric, maxi scooter, moped.
- **Commercial:** auto-rickshaw/three-wheeler, van, pickup, LCV, truck, bus, tractor and equipment where introduced.
- **Cycles:** bicycle, e-bike, kids' bicycle, cargo and accessibility variants where catalogue coverage exists.

## Listing and catalogue principles

- Required listing data: category/subcategory, make, model, variant, year, odometer or cycle condition, price, location, ownership, registration, title/condition disclosures, media, description, seller contact, and publish status.
- Search begins with make/model and must support a free-text query.
- Brand selection must branch correctly when a manufacturer spans vehicle types (for example, Cars or Bikes).
- Build the India catalogue from structured licensed/official data and version it. Never make claims that every model is exhaustive unless the source/data refresh proves it.
- Seller images are the factual listing source. Official/licensed model imagery may support catalogue tiles. AI should not fabricate an exact vehicle model; generic AI visuals must be labelled as illustrations or colour previews.

## Marketplace and trust

- Seller types: dealer, private seller, collector.
- Storefronts are shareable on Instagram, Facebook, WhatsApp, and direct links; they replace the need for a small seller website.
- Buyers can contact by name, email, phone, WhatsApp, and in-app chat (subject to consent/privacy controls).
- **Motora Checked** is a premium, mechanic-backed certificate with inspection report, date, inspector, and expiry/recheck status.
- Add moderation, fraud reporting, provenance, verification badges, media scanning, and consent controls before public launch.

## Commercial model

- Launch: free listings for all sellers.
- Later pricing: an introductory/free allocation associated with a stated ₹50,000 threshold, followed by paid dealer and individual packages. The exact interpretation, limits, tax, cancellation/refund, and local legal terms need an owner decision before payment is implemented.
- Premium placements and verified-inspection services become paid add-ons later.

## Stage 1 — completed prototype scope

- Responsive mobile-app interface and desktop presentation shell.
- Option 1 Orange Light and Option 3 Gold Black dark mode.
- Home discovery, category switching, fixture search/filtering, listing cards, vehicle detail, contact panel, Motora Checked presentation, dealer storefront, and browser back-to-home state.
- Non-production generic vehicle assets, explicitly suitable only as interface fixtures.

## Stage 2 — build scope

1. Backend foundation: authentication/roles, database, catalogue import pipeline, object storage/CDN, audit logs, API design.
2. Seller and buyer workflows: account, store creation, guided listing, camera/gallery uploads, compressed video, voice note, enquiry/chat, saved search, sharing, moderation.
3. Operations: admin catalogue/photo upload area, listing review, verification workflow, dealer offers, analytics, reporting, and secure consent/privacy controls.
4. Monetisation and rollout: package rules, payments/invoices, premium placement, geographic rollout, analytics, native-app shell and Android double-back exit behavior.

## Acceptance guardrails

- Do not redesign the locked Option 1/Option 3 UI while adding features.
- Test the core experience on a phone first, then tablet and desktop.
- Maintain accessible contrast in both themes.
- Use licensed/authorized assets and sources; do not reuse BikeWale, CarWale, ZigWheels, Carsales, Dribbble, Facebook, or Instagram images/content without permission.
