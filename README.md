# Design Point landing page

The original static landing page has been translated into a Vite + React application and prepared for deployment on Vercel.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

On Windows PowerShell, use `Copy-Item .env.example .env.local`.
`npm run dev` runs the Vite frontend. To exercise the `/api/contact` function locally as well, run `npx vercel dev` after linking the project to Vercel.

## Production build

```bash
npm run check
npm run build
npm run preview
```

Vite outputs the production bundle to `dist/`.

## Deploy to Vercel

1. Import the repository in Vercel.
2. Vercel will detect the Vite framework and use `npm run build`.
3. Add the variables from `.env.example` in Project Settings → Environment Variables.
4. Verify the sender domain in Resend and make sure `CONTACT_FROM_EMAIL` uses that domain.
5. Set `VITE_SITE_URL` to the final production origin, without a trailing slash.
6. Replace the footer privacy and terms placeholders with the approved legal-page URLs.
7. Deploy and submit one real enquiry to verify delivery and reply-to behaviour.

The form posts to the Vercel Function at `/api/contact`. It validates input server-side, includes a honeypot field, and sends a plain-text notification through Resend.

## Project structure

- `src/App.jsx` — page sections and interactions
- `src/styles.css` — the approved static design styles
- `api/contact.js` — Vercel contact-form function
- `public/assets/` — optimised image and SVG assets
- `archive/static-index.html` — preserved pre-React source
