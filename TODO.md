# DealMentor — Open TODO

Items that need **YOUR action** (not Claude's). Surfaced at the start of every Claude Code session in this repo via the SessionStart hook in `.claude/settings.json`.

Last refreshed: 2026-06-19, after the multi-ICP website rebuild.

---

## P1 — Will mislead buyers or block conversion if left undone

### Test the live deployed site (~30 min)

- [ ] **Hard refresh + incognito test the home page** → does the 3-card audience strip appear under the hero CTAs? Does the primary CTA say "Start Free" (not "HELP ME SELL")?
- [ ] **Open `/bpo-and-centers`** and verify:
  - Hero subhead leads with *"Paste the client's brief..."*
  - First ROI slider is **"Active campaigns running"** (not Agents)
  - 30-second fit-check modal opens, scores correctly, and shows a result
  - "Email this to my team" share modal opens; both Copy and Open-in-email buttons work
  - Floating green WhatsApp button is visible bottom-right on desktop AND mobile
- [ ] **Test the 3 formspree submissions** land in your inbox (formspree ID `xykbgowb`):
  - Contact form on `/contact`
  - "Email me the analysis" on the BPO ROI calculator
  - "Open in email" / "Copy" on the share modal
- [ ] **Smoke-test the new pages** load and render:
  - `/for-founders`, `/for-teams`
  - `/vs/cogito`, `/vs/balto`, `/vs/observe-ai`, `/vs/second-nature`, `/vs/` (hub)
  - `/resources`
- [ ] **Click every "Book a call" CTA** and confirm the HubSpot meetings widget loads in the modal

### Push the SQL Claude provided in an earlier session

- [ ] **Run / deploy the SQL migration** Claude gave in a prior session
- [ ] (Tal: paste a one-liner here describing what the SQL does, so we can verify it's actually been pushed — and then delete this checkbox)

### Real product screenshots — 4 placeholder frames on `/bpo-and-centers`

- [ ] **Campaign Pack output** (script + rebuttals + cert, all from a real campaign in the app)
- [ ] **Audit-ready certificate** (showing the verification ID + company branding)
- [ ] **Practice-a-Call roleplay UI** (mid-roleplay or scored debrief)
- [ ] **Readiness overview / supervisor dashboard**
- Drop them in `/public/` (any format). Tell Claude the filenames; wiring them into the placeholders takes 5 minutes.

---

## P2 — Material upside, do this month

- [ ] **Record 90-second founder video**
  - Drop into the placeholder above the BPO final CTA
  - Script angle: *"I'm Tal. I trained agents in Manila, Sofia, Tijuana. Here's what DealMentor does for your floor."*
  - Upload to YouTube or Vimeo, send Claude the embed URL
- [ ] **Get first BPO ops-director + sales team-lead video testimonials**
  - Currently the home page testimonial sub-line says *"being filmed right now"* — make it true
- [ ] **Logo files for ClinicMind + Headcounter**
  - SVG or PNG into `/public/logos/` — Claude will render them as actual brand marks on `/about` (currently text links)
- [ ] **Draft the BPO Operator's Guide PDF**
  - 6-8 page gated download promised on `/resources`
  - Claude can draft the text content if you ask
- [ ] **Print-friendly CSS sanity check** — Cmd-P on `/bpo-and-centers` and `/for-founders` in Chrome, see if it prints clean. Tune the `@media print` rules in `spine.css` if needed.

---

## P3 — Strategic, do this quarter

- [ ] **Land first 2-3 paying BPO pilot logos** — highest-leverage thing on this whole list. Replaces *"first wave"* framing across `/bpo-and-centers` with real proof.
- [ ] **Apply for SOC 2 Type II** (6-9 months via Vanta or Drata). Required for US enterprise BPO sales. FAQ #8 on `/bpo-and-centers` currently says *"on the roadmap"* — keep that promise live.
- [ ] **Cookie-based ICP personalization** for the home page — when a visitor clicks "For Founders" / "For Teams" / "For Centers", set a cookie; on return, subtly reorder the home hero for that lens. 80% of the conversion benefit of a full sub-site at 20% of the maintenance tax.
- [ ] **Expand `?icp=` URL param** to `/pricing`, `/platform`, `/whyus` (currently only on `/`). Lets paid-ad campaigns deep-link to highlighted ICP cards on any page.
- [ ] **HIPAA / PCI roadmap decision** — opens healthcare and fin-services BPO segments if pursued.

---

## P4 — Long-horizon authority moves

- [ ] **Industry podcast appearances + bylined articles** — *Contact Center Pipeline*, *CCW*, *CX Today*, *Customer Contact Week*. 6 months of consistent content builds a defensible authority moat.
- [ ] **Native CTI integration** with at least Five9 and Genesys. Turns *"browser tab next to dialer"* from a soft adoption story into a sticky one.

---

## DONE this session (for the record)

Pushed in commits `9f068be` · `86eb630` · `7116d19` · `8ac02d0` · `9d2238b` · `0372b10` · `ec71b29` · `2f45744` · `6379f67` · (latest)

Including:
- **BPO 7-day self-serve trial CTA wired site-wide** — primary "Try BPO mode free · 7 days" on `/bpo-and-centers` hero + final-CTA and on the `/pricing` BPO panel, links to `https://app.thedealmentor.ai/register`. Trial is "see it work" (1 campaign + sample audit-ready cert); rolling out across the floor is still sales-led from $999/month, scoped on a call. FAQ #6 on `/index` (+ JSON-LD) and the BPO answer block updated to name the trial. Final-CTA trial lines on `/index`, `/about`, `/pricing`, `/platform`, `/whyus` now name all three trials (Founder 7d / Team & Growth 14d / BPO 7d).

Including the multi-ICP rebalance of core pages:
- `/pricing` BPO now pulled out of the self-serve plans grid (Paddle is wired to Founder/Team/Growth only) and shown as a horizontal **sales-led panel: "From $999/month, per-campaign pricing, 3-month minimum, unlimited agents"** with "Best for / Not for" disqualifier and "Book a call · scope it" CTA
- `/platform` modes-grid expanded to **3 modes** (Founder / Team / BPO)
- `/whyus` reason #07 retuned: was "Founders included" → now "Solo, team, or contact-center floor — we ship for each"
- `/about` "From the founder" rewritten to name all 3 audiences (founder + sales manager + BPO ops director)
- `/index` "From the Founder" testimonial quote rewritten same way
- Hero subheads on `/pricing`, `/platform`, `/whyus` now name all 3 audiences with prices
- Final-CTA trial lines on every core page now include the BPO monthly-billing model

- `/bpo-and-centers` full rewrite around the real product (Campaign Packs, audit-ready certs, coaching cards, Practice-a-Call, compliance must-says, privacy mode)
- `/vs/cogito`, `/vs/balto`, `/vs/observe-ai`, `/vs/second-nature` + `/vs/` hub
- `/for-founders` + `/for-teams` dedicated landing pages
- `/resources` content hub
- Interactive ROI calculator (starting-price $999/mo model, sales-led scoping) with formspree email capture
- 30-second fit-check scorecard modal
- "Email this page to my team" share modal (clipboard + mailto)
- WhatsApp floating button on every page
- "For Centers" added to top nav site-wide
- 3-audience hero strip on home page (Founders · Teams · Centers)
- `?icp=` URL param handler on `/` (highlights matching audience card)
- Print-friendly CSS site-wide
- Founder docs corrected to 4 (GTM Plan, Sales Playbook, Marketing Plan, Daily Workflow)
- Team docs corrected to 7
- Multi-language claim pulled from BPO page (replaced with English-first US/UK/AU/CA)
- Mars/IDT brand mentions pulled; replaced with ClinicMind + Headcounter on `/about`
- 4-week pilot fictional section pulled
- JSON-LD FAQ schema kept in sync with visible FAQ answers
- Sitemap + footer links updated site-wide

---

**To stop the nag:** delete the `SessionStart` block in `.claude/settings.json`.
**To edit the list:** just edit this file (`TODO.md`). Next session will show the new content.
