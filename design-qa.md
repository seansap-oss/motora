# Design QA — Motora Stage 1

**Source visual:** `/workspace/scratch/191e379849ec/generated_images/motora-option-1-orange-light-final-ui.png` (the approved Option 1 UI board)

**Implementation visual:** `/workspace/scratch/191e379849ec/motora-stage1/motora-stage1-final-home.png`

## Review setup

- Reference reviewed as a multi-screen board: 1487 × 1058 pixels.
- Implementation was inspected in the active cloud-browser mobile device frame at `http://terminal.local:4173/`; the rendered phone viewport measured approximately 361 × 782 CSS pixels in the captured browser canvas.
- Comparison normalized the implementation to the mobile home panel’s hierarchy rather than treating the whole multi-screen reference board as a one-to-one screenshot target.

## States exercised

- Home search/category navigation to results.
- Category filter selection and result rendering.
- Listing card to vehicle detail.
- Contact actions and dealer storefront route.
- Light ↔ Gold Black theme switch.
- Browser back navigation returning to the landing state.

## Findings and resolutions

| Severity | Finding | Resolution |
| --- | --- | --- |
| P1 | Early category labels were visually abstract. | Replaced them with recognizable vehicle category icons while preserving the approved layout and orange accent. |
| P2 | Desktop needs to demonstrate the same product without becoming a second design. | Retained the mobile-first phone canvas and responsive app-owned content; desktop is a presentation frame only. |
| P3 | Catalogue cards use generic fixture imagery in Stage 1. | Assets are documented as non-production placeholders; Stage 2 must use seller/official/licensed imagery. |

No active P0, P1, or P2 fidelity issues remain. Browser-console review found no application errors; the only observed message was an unrelated Chrome-extension metadata warning.

## Stage 2 responsive review (2026-08-06)

**New source constraint:** the supplied Motora mobile reference (`upload/image(20260806-135210).png`) establishes the Orange Light hierarchy, card rhythm, vehicle hero, category row, and bottom navigation. It does not prescribe a device bezel for production web use.

**Desktop/tablet implementation review:** opened at the active cloud-browser viewport. At widths of 740px and larger, the iPhone/Pixel frame is removed, the page becomes a fluid browser layout, navigation moves to a persistent left rail, the hero uses the full content width, and cards/forms avoid a fixed handset width. The seller listing form was visually inspected in this layout.

**Responsive behavior added:**

- Narrow phone rule: compact spacing and five usable category tiles at 360px and below.
- Rectangular Android rule: app content uses the actual viewport; no app-owned rounded hardware frame.
- Tablet/desktop rule: fluid content width, 92px navigation rail, responsive results grid, and large seller/admin forms.

**Stage 2 interactions verified:**

- Opened Sell → listing step 1.
- Selected seller type/category and advanced to media step.
- Confirmed multi-file media input is present for photos, video, and audio.
- Confirmed light/dark mode and existing vehicle/contact flows remain available.

The prior `useScreenPortal` error was corrected by keeping the phone-only filter sheet out of the web shell. No current application error remains; browser-extension metadata messages are environment noise.

**final result: passed**
