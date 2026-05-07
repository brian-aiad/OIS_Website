# Review Acquisition Playbook — Original Insurance

**Goal:** Grow from ~47 Google reviews to 100+ with 4.9★ average within 90 days.  
**Owner:** Front-desk / agent team at 9907-B Paramount Blvd, Downey, CA.

---

## 1. Why Reviews Matter for This Business

Google Business Profile (GBP) review count and rating are among the top-3 local ranking signals for insurance queries. Every additional verified review strengthens trust signals on-site (ReviewBadge component) and signals recency to Google's local algorithm. A jump from 47 to 100+ reviews typically produces measurable lift in "insurance + [city]" map-pack visibility within 60–90 days.

---

## 2. Who to Ask (Priority Order)

1. **Clients who just bound a new policy** — highest intent, fresh positive experience.
2. **Clients who renewed without shopping around** — implicit trust signal; they stayed.
3. **Clients whose SR-22 or no-license situation was resolved** — emotionally significant wins.
4. **Long-term clients (5+ years)** — often happy but never asked; highest conversion rate.
5. **Walk-in clients who got same-day proof of insurance** — concrete, fast win they remember.

Avoid asking clients mid-dispute, during a claim, or within 24 hours of any friction.

---

## 3. The Ask — In-Person Script

Use after the client's policy is bound and they have their documents in hand:

> "Really glad we could get you sorted out today. If you have a minute, it helps us a lot when happy clients share their experience on Google — it's how other families in Downey find us. Would you be comfortable leaving a quick review?"

If yes, hand them a phone or show the QR code (see Section 5). Don't ask them to say specific things — just "share your honest experience."

**Bilingual versions:**

*Español:*
> "Estamos muy contentos de haberle ayudado hoy. ¿Le importaría dejar una reseña rápida en Google? Eso nos ayuda mucho a que otras familias en Downey nos encuentren."

*عربي:*
> "يسعدنا أننا قدرنا نساعدك اليوم. لو ما راح يكون فيه مانع، ممكن تكتب تقييم سريع على Google؟ هذا يساعدنا نوصل لعائلات ثانية في داوني."

---

## 4. The Ask — Follow-Up Text / SMS

Send within 2 hours of policy bind. Keep it short.

**English:**
```
Hi [Name], thanks for choosing Original Insurance! If you have 2 minutes, a Google review really helps us — here's the link: [GBP direct review link]. No pressure at all. — The Original Insurance team
```

**Español:**
```
Hola [Name], gracias por confiar en Original Insurance. Si tiene 2 minutos, una reseña en Google nos ayuda mucho: [link]. No hay ninguna obligación. — El equipo de Original Insurance
```

Do not use bulk SMS blasts. Send individually — Google detects and may suppress sudden spikes from identical message patterns.

---

## 5. QR Code for Review Page

Generate a direct-to-review QR code from your GBP dashboard:
1. Google Business Profile → "Get more reviews" → copy the review shortlink
2. Use any QR code generator to produce a printable code
3. Print and laminate — place on the front desk counter and inside the quote folder handed to new clients
4. Optional: add to email signature as a small icon with "Review us on Google"

Direct review URL format: `https://g.page/[your-gbp-id]/review`

---

## 6. Follow-Up Email Template (for quote-but-no-bind clients — 30 days post-visit)

Subject: How did we do? + a small favor

```
Hi [Name],

Thanks for stopping by / calling Original Insurance a few weeks back. We hope you found the coverage you needed — with us or elsewhere.

If your experience with our team was positive, we'd really appreciate a quick Google review. It helps other families in the Downey area find an independent broker they can trust.

[GBP Review Link]

If there's anything we could have done better, just reply to this email — we read every response.

Thank you,
Aiman and the Original Insurance team
9907-B Paramount Blvd, Downey, CA 90240
(310) 538-8666
```

---

## 7. Handling Negative Reviews

**Response time target:** Within 4 hours during business hours.

**Never:**
- Argue or deny the experience
- Include policy details or personal info in the response (legal/privacy risk)
- Copy-paste a generic template response — Google may deprioritize profiles with clearly templated replies

**Always:**
- Thank them for the feedback
- Acknowledge the frustration without admitting fault for disputed facts
- Offer to resolve offline: "Please call us at (310) 538-8666 or email [email] so we can make this right"

**Sample response to a negative review:**
```
Thank you for sharing this, [Name]. We're sorry your experience didn't meet expectations — that's not what we aim for. Please reach out to us directly at (310) 538-8666 so we can address this properly. We take every piece of feedback seriously.
```

---

## 8. Review Count Tracking

Update the `count` prop in ReviewBadge components when the real Google review count changes:

```
Search codebase for:  data-verify="gbp-review-count"
Files to update:      src/pages/Home.tsx, src/pages/AutoInsuranceDowneyCA.tsx, src/pages/About.tsx
Component prop:       <ReviewBadge count={XX} />  ← update XX
```

Check GBP count monthly. Update code within 7 days of a meaningful milestone (50, 75, 100, etc.).

---

## 9. 90-Day Milestone Targets

| Day | Target Review Count | Actions |
|-----|--------------------|---------| 
| 0 (now) | 47 | Launch in-person ask script, print QR code |
| 14 | 55 | Enable SMS follow-up for all new binds |
| 30 | 65 | First follow-up email batch to 30-day-old prospects |
| 60 | 80 | Review response quality audit — are replies unique and personal? |
| 90 | 100+ | Update ReviewBadge count in codebase; reassess playbook |

---

*Last updated: April 2026. Maintained by the Original Insurance marketing/ops team.*
