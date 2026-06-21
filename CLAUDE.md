# CLAUDE.md — repo memory for DealMentor marketing site

Auto-loaded at the start of every Claude Code session in this repo. Companion to `TODO.md` (which lists Tal's open action items). Keep this file *short and durable* — anything session-specific belongs in TODO.md or a commit message, not here.

## What this repo is

The **marketing site** at https://www.thedealmentor.ai. Static HTML/CSS/JS, no build step, no framework. Deploys via **Vercel auto-deploy on push to `main`** — there is no staging branch. Work happens on `main` unless Tal explicitly says otherwise.

- Stylesheet: `spine.css` — cache-busted via `?v=YYYYMMDDx` query string. Bump the suffix when CSS changes; do not bump just to bump.
- Shared JS: `spine.js` — same versioning rule.
- Page convention: every page links nav + footer + WhatsApp floating button via the same partial pattern (inline, not server-rendered).

## Cross-repo relationship — READ THIS BEFORE CHANGING PRODUCT CLAIMS

This is the **marketing** site. The **product app** lives in a **sibling repo** at `app.thedealmentor.ai` (repo slug: `TalPaperin/thedealmentor`).

**Hard rule:** any copy on this site that makes a product claim (feature names, mode behavior, trial flow, what the app actually does) must match what's actually shipped in the app repo. When in doubt, grep the app repo before changing the claim. Marketing copy promising features that don't exist is the single fastest way to break buyer trust on a $999/mo, 3-month-commit sale.

## Verified product state (as of 2026-06-21)

These have been verified-by-Tal-against-the-app and are safe to claim in copy:

- **BPO mode works self-serve end-to-end.** Signup at `app.thedealmentor.ai/register` → pick "I run a call center / BPO" at onboarding → lands on Campaigns → paste/upload client brief → two AI calls via `/api/chat` → Campaign Pack output (cheat-sheet + rebuttal library + certification, **configurable 3-25 questions, default 10**) saved to the `outputs` table → cert is PASS/FAIL with a branded certificate, unique Verification ID, PDF (print) + Word export, single or batch.
- **Founder / Team / Growth** sign up self-serve via Paddle (`/register` → pick mode → Paddle checkout). Founder Mode ships **4 docs** (GTM Plan, Sales Playbook, Marketing Plan, Daily Workflow). Team Mode ships **6 docs** (Sales Playbook, Why-Buy, Marketing Plan, Vertical Intel, SDR Guide, AE Guide), plus ICP Scripts. **NOT 7.**
- **Campaigns are available to all team managers** (not BPO-only). A campaign is a **draft until published**; the manager can **assign it to all or specific agents**; assigned reps/agents get a **certification notice on their dashboard**; results roll up to the manager's **Records** tab. Optional **"Use my company context"** toggle (off by default) folds the team's own intake into generation.
- **Coaching cards, readiness overview, regenerate-on-script (with live timer + streaming preview), brief-privacy toggle, "Practice this call"** — all built. Ask-the-CRO is role-aware (manager vs rep) and sees the user's campaigns.

If a new copy claim doesn't appear in this list, treat it as unverified and ask Tal before shipping it.

## Pricing model (locked — do not recombine without asking)

| Plan | Price | How they buy |
|---|---|---|
| Founder | $119/mo (annual) / $149/mo (monthly) | Paddle self-serve, 7-day trial |
| Team | $399/mo (annual) / $449/mo (monthly), up to 5 reps | Paddle self-serve, 14-day trial |
| Growth | $999/mo (annual) / $1,199/mo (monthly), up to 15 reps | Paddle self-serve, 14-day trial |
| **BPO / Centers** | **From $999/mo, sales-led**, monthly billing, 3-month minimum, unlimited agents per campaign | **7-day see-it-work trial** (1 campaign, no auto-convert) → book a call to scope rollout |

The BPO plan is deliberately **NOT in the self-serve plans grid** on `/pricing` — it lives in a horizontal sales-led panel below the grid. BPO conversion requires a call (no Paddle product). This was decided after a long debate (search session log for "the 4th one is not connecting to anything"). Do not put BPO back in the Paddle grid.

**Naming + the hidden Scale plan (verified against Paddle 2026-06-21):** the website uses the marketing name **Team** for what Paddle and the app call **Starter** (the 5-rep plan). Paddle also has a 4th self-serve plan, **Scale** ($2,999/mo monthly, $29,988/yr ≈ $2,499/mo annual, up to 40 reps, 14-day trial), which is **intentionally hidden from the public website pricing grid** (kept for in-app upsell only — do not surface it on the site). Prices above are correct against Paddle (Founder $149 monthly / $1,430-yr; Team/Starter $449 / $4,788-yr; Growth $1,199 / $11,988-yr).

## Locked positioning + ICPs

Three ICPs, named in this order on the home `audience-strip`: **BPOs · Sales Teams · Solo Founders.**

Keystone claim: *one real fractional CRO + twenty AI sales tools, on every plan.* Tal is a working CRO charging up to $20K/mo; the platform is his methodology in software, with him on call for what can't be automated.

- `/index` keystone Tal-voice quote (do not paraphrase without asking): *"I'm a working CRO. I charge up to $20,000 a month. Most teams can't afford me. So I built this. Every CRO function in software, with me on call for the strategy that can't be automated."*
- `/whyus` reason #07 is the 3-ICP unification line — keep all three named.

## Named customers (use these, don't invent)

**Current customers** (safe to claim): **ClinicMind** (Adam Hulkower + Avi Cohen used DealMentor there — SDRs and AEs in healthcare SaaS), **Botshare.ai**, **MakhSuss**, **Lotix Smart Warehouse**.

**Do NOT claim:** Mars, IDT, Headcounter as a "current customer." Tal's BPO floor work in the Philippines / Eastern Europe / Mexico is under NDA — describe it as practitioner experience, not as named DealMentor deployments.

When real BPO logos land, swap the "first wave" framing on `/bpo-and-centers` for proof.

## Copy conventions

- **No em dashes** (`—`). Use a regular hyphen (`-`) or recast the sentence. Tal removed them once already; don't reintroduce.
- **No "AI slurp" filler** — words like "seamlessly," "revolutionize," "unlock," "supercharge," "leverage" (as a verb), "in today's fast-paced world." If you'd be embarrassed to read it on stage, don't ship it.
- **Tricolon / pain-verb leads** in heroes (e.g. "Founders need senior judgment they can't afford. Managers need certification they can't deliver. BPOs need audit-ready records their QA spreadsheet can't produce.").
- **20 AI tools + 1 live CRO** is the bundle count — keep tool count consistent across surfaces.
- **Founder docs = 4**, **Team docs = 6**, **BPO output = Campaign Pack** (not "playbook"). Match the in-app naming.

## FAQ + JSON-LD discipline

Every page with a visible FAQ section has a matching `<script type="application/ld+json">` FAQPage block in `<head>`. **They must stay in sync.** When you edit a visible FAQ answer, edit the JSON-LD entry too. The schema validator will flag drift in Google Search Console.

## Don't-touch list

These have side effects beyond the marketing site — don't change without Tal's explicit OK:

- Formspree form ID: `xykbgowb` (contact, ROI calculator email, share modal — all three submit here)
- HubSpot meetings URL: `https://meetings-eu1.hubspot.com/tpaperin/thedealmentor`
- WhatsApp number: `972545308119`
- App URLs: `https://app.thedealmentor.ai/register`, `https://app.thedealmentor.ai/login`
- `sitemap.xml` + `robots.txt` — coordinate any URL changes
- `og-image.svg` + `favicon.ico`
- Trademark line in the footer: *"TheDealMentor.AI™ is a trademark of Tal Paperin."*

## Where to find live state

- **`TODO.md`** — Tal's open action items, refreshed periodically. The SessionStart hook surfaces it every session.
- **`git log --oneline -20`** — recent decisions with reasoning in commit bodies.
- **The site itself** — https://www.thedealmentor.ai (Vercel auto-deploys `main`, usually live within a minute of push).

## Tool / workflow conventions

- **No new files unless asked** — edit existing pages first.
- **No documentation files** (extra `.md`) without an explicit ask — this CLAUDE.md and TODO.md are the only ones we keep.
- **No emojis in copy** unless Tal explicitly asks for them.
- **Commit messages**: subject line ≤ 70 chars, body explains the *why*, follow the existing `git log` style (see recent commits).
- **Push**: `git push -u origin main`. There's no PR flow on this repo — Vercel reads `main` directly.
