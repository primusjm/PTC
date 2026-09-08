# Promises Treatment Centre — website

A static site built with [Eleventy](https://www.11ty.dev/) and edited through [Decap CMS](https://decapcms.org/) (a free, form-based content editor). Hosted for free on [Netlify](https://www.netlify.com/).

## Structure

- `src/` — the site. Pages are in `src/*.njk`, the shared header/footer is `src/_includes/base.njk`, and CSS/JS/images are in `src/assets/`.
- `src/_data/*.json` — the editable content (text, images, phone numbers). These are the files Decap CMS writes to.
- `admin/` — the Decap CMS admin panel (`/admin` on the live site).
- `*.dc.html`, `support.js`, `uploads/` — the original design mockups this site was built from. Not part of the live site; kept for reference.

## One-time setup (do this once, in the browser)

1. **Push this repo to GitHub** (already done if you're reading this from the repo).
2. **Create a Netlify site**: go to [app.netlify.com](https://app.netlify.com), "Add new site" → "Import an existing project" → pick this GitHub repo. Build command `npm run build`, publish directory `_site` (already set in `netlify.toml`, so Netlify should detect this automatically).
3. **Turn on Identity**: in the Netlify site dashboard, go to *Site configuration → Identity* → **Enable Identity**.
4. **Turn on Git Gateway**: still under Identity, scroll to *Services* → **Enable Git Gateway**. This is what lets the CMS save changes back to GitHub without you needing a GitHub account for editing.
5. **Invite yourself as an editor**: *Identity → Invite users* → enter your email. You'll get an email to set a password.
6. Visit `https://<your-site>.netlify.app/admin/`, log in, and start editing. Every save creates a commit and Netlify rebuilds the site automatically (usually live within a minute).

## Editing day-to-day

Go to `/admin` on the live site, log in, and edit through the forms — no code required. Changes to text, phone numbers, FAQs, testimonials etc. all go through **Site Settings**, **Home Page**, **Treatment Page**, **Addiction Explained Page**, and **Aftercare Page** in the CMS sidebar.

## Local development

```bash
npm install
npm start
```

Opens the site at `http://localhost:8080` with live reload.
