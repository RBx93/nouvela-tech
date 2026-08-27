# Nouvela Technology Group — nouvelatechnologygroup.com

The company's own site. Federal contractor first, small-business web and software
shop second — the copy and section order reflect that ordering deliberately.

- **Live:** https://nouvelatechnologygroup.com
- **Host:** Azure Static Web Apps, deployed by GitHub Actions on push to `main`
- **Repo:** `RBx93/nouvela-tech`

> The canonical domain has the **"u"** — `nouvelatechnologygroup.com`.
> `novelatechnologygroup.com` is a typo that exists in at least one file somewhere;
> never propagate it.

## Stack

React 19.2 · Vite 8 · Bootstrap 5.3 + React Bootstrap · SCSS · React Router 7 ·
AOS scroll reveals · EmailJS for the contact form.

## Commands

```bash
npm install
npm run dev       # local dev server
npm run build     # production build to dist/
npm run preview   # serve the built output
npm run lint
```

## Sections

`src/components/` — Hero, Services, **GovContracting**, **GeospatialNetwork**,
Portfolio, About, Contact, Navbar, Footer.

GovContracting and GeospatialNetwork carry the federal positioning (UEI
`H3Q5W9SYFF44`, CAGE `11UF7`, the NAICS codes). Those identifiers have to match
SAM.gov exactly — check before editing them.

## Contact form

EmailJS, configured through environment variables — nothing is hardcoded:

```
VITE_EMAILJS_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY
```

Local dev reads them from `.env` (gitignored). Production reads them from
**GitHub Actions secrets** of the same names, injected at build time in
`.github/workflows/azure-static-web-apps.yml`.

Because Vite inlines env vars at build time, changing a secret does nothing until
the next build. Re-run the workflow after rotating one.

## Portfolio claims — read this before editing

Only **signed** clients appear as work. An unsigned prospect never appears as
experience; that rule exists because it has been broken before, in a pitch that
claimed work Nouvela had not done.

Signed and safe to reference: CSCI Lab, I Honore Realty, The 924 Project, LABTEQ,
HubbTech, Bryant's Lawn Care, Knell Care, Bassy Handyman, Iota Omega Chapter.

Prospects — **never** as work: LDI / Liberty Disposal, Dorado Services, IHS GIS
Support Services.

---

Built and maintained by **Nouvela Technology Group**.
