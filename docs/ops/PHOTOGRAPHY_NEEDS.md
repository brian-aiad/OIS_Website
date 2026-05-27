# Photography Needs — originalinsurance.net

A half-day shoot would be transformative. The site currently uses stock WebP images for
hero sections and service backgrounds. Real photography creates trust that no stock image can match.

---

## Priority 1 — Immediate impact (book these first)

### 1. Office exterior
- **Placement:** About page hero, Locations page, Contact page sidebar
- **Crop ratio:** 16:9 landscape, also a 1:1 square version
- **Notes:** Front of 9907-B Paramount Blvd. Include the sign. Best light is morning or
  "golden hour" late afternoon. Clean day, no cars parked directly in front if possible.

### 2. Aiman + team — natural, not posed
- **Placement:** About page "Our Story" section, Home page AboutSplit section
- **Crop ratio:** 4:3 landscape, 1:1 square headshot crops
- **Notes:** At the desk or counter, interacting with a document or phone — not stiff
  corporate poses. Casual but professional. Bilingual setting (documents in Spanish/Arabic
  visible in background adds authenticity). Smile.

### 3. Client interaction — consultation scene
- **Placement:** Home page hero (to replace storefront.png), SR-22 and no-license page heroes
- **Crop ratio:** 16:9 full-bleed, needs to work with navy overlay at 60% opacity
- **Notes:** Two people at a desk reviewing documents. One broker, one client. Bright,
  natural lighting. No laptops open (this isn't a tech company). Papers, policy binders,
  a coffee cup — the texture of the actual work.

---

## Priority 2 — High value additions

### 4. The sign on the building
- **Placement:** Locations page, Footer logo area alt
- **Crop ratio:** 1:1 square
- **Notes:** The actual "Original Insurance" signage at 9907-B. Close enough to read clearly.

### 5. Interior of the office
- **Placement:** Locations page, About page credentials section
- **Crop ratio:** 16:9 wide
- **Notes:** Reception/waiting area. Clean, organized. Language materials visible if any.

### 6. Actual insurance documents + eID cards
- **Placement:** SR-22 page, no-license page, proof of insurance section
- **Crop ratio:** 4:3 with some white space for overlay text
- **Notes:** Physical policy binder, a printed eID card, maybe the notary stamp. These are
  the real artifacts of the work and build instant credibility for people who want to know
  what they'll receive.

### 7. Downey landmarks (for city page heroes)
- **Placement:** /insurance/downey hero
- **Notes:** Porto's Bakery exterior, Downey Theatre, Paramount Blvd streetscape.
  These make the city pages feel locally grounded vs. generic. Confirm you have permission
  to photograph storefronts for commercial use. City streets/public spaces are fine.

---

## Priority 3 — Nice to have

### 8. Team headshots (individual)
- **Placement:** About page, future "Team" section
- **Crop ratio:** 1:1 square, consistent background (white or light gray)
- **Notes:** Professional but approachable. Same framing for each person.

### 9. Multilingual service — visual proof
- **Placement:** About page, FAQ page
- **Notes:** Someone writing in Arabic or Spanish, or a policy document in Spanish.
  Shows the multilingual claim is real.

---

## Technical specs for dev

All photos should be delivered in:
- Original resolution (keep source)
- WebP at 80% quality for web use
- Max width 1920px for full-bleed, 800px for content images
- Filenames: `{subject}-{year}-{crop}.webp` e.g. `office-exterior-2026-landscape.webp`

Place web-ready files in: `original-insurance/public/images/`

After adding, update `src/lib/images.ts` with the new image paths so they are
used consistently across components.

---

## Current stock images to replace (priority order)

| Current file | Used on | Replace with |
|---|---|---|
| `storefront.png` (229KB PNG) | Home hero background | Priority 1 item #3 |
| `heroTeam.webp` | City pages, FAQ, SR-22, no-license heroes | Priority 1 item #3 |
| `handshake.webp` | Contact page hero | Priority 1 item #3 |
| `heroMeeting.webp` | Locations, Services pages | Priority 1 item #2 |
| `about-professional.webp` | About page | Priority 1 item #2 |

Note: PNG → WebP conversion alone (without new photography) would save ~60–70% file size
on `storefront.png` and the logo images. Confirm with Brian before converting brand assets.
