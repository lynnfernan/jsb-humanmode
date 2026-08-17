# Hosting & integration notes for Digital Armada

## Static PDFs

- Serve from a stable path, e.g. `/playbooks/{filename}.pdf`
- **Do not** SPA-rewrite PDF paths to `index.html`
- Expected response: `Content-Type: application/pdf`
- Filenames are part of the public API — changing them breaks links and QRs

## SPA / interactive apps

Current stack: Vite + React single-page app on Vercel.

```
vercel.json (pattern to preserve if re-hosting):
- Rewrite HTML routes to index.html
- Exclude: /playbooks/*, /assets/*, /images/*, /gifs/*, /api/*
```

## Email “send me the PDF” (optional)

Today: Vercel serverless `api/send-playbook.js` + Resend.

If Armada replaces it:
- Wire form → their ESP
- Keep consent language naming **Competent Humility Playbook** / Quiet Understanding correctly
- Attach or link the same PDF filenames

## Analytics suggestions

| Event | When |
|-------|------|
| `field_kit_view` | Hub load |
| `practice_start` | Card primary CTA |
| `pdf_download` | PDF click (asset id) |
| `assessment_complete` | EAM / Pulse finish |

UTM example: `?utm_source=digital_armada&utm_medium=partner&utm_campaign=field_kit`

## Brand tokens (marketing surfaces)

| Token | Value |
|-------|--------|
| Navy | `#1C4B61` |
| Slate | `#578ead` |
| Cream | `#f1f1e2` |
| Fonts | Saira (UI) + Source Serif / Georgia (body) |

## Validation / research

`/eam-validation` supports `?PROLIFIC_PID=` and shows a completion code only on final results. Not for consumer lead-gen pages.
