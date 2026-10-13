# Promises Treatment Centre — website

A static site built with [Eleventy](https://www.11ty.dev/), edited with [Sveltia CMS](https://github.com/sveltia/sveltia-cms) (a form-based content editor) and hosted free on [GitHub Pages](https://pages.github.com/).

## Structure

- `src/` — the site. Pages are in `src/*.njk`, the shared header/footer is `src/_includes/base.njk`, and CSS/JS/images are in `src/assets/`.
- `src/_data/*.json` — the editable content (text, images, phone numbers). These are the files the CMS writes to.
- `admin/` — the CMS (`/admin/` on the site).
- `.github/workflows/pages.yml` — builds the site and publishes it to GitHub Pages every time `main` changes.
- `design/` — the original design mockups, source copy and uploads this site was built from. Not part of the live site.

## Editing content on your computer (recommended)

One-time setup: install [Node.js](https://nodejs.org/) (LTS) and [GitHub Desktop](https://desktop.github.com/), then clone this repo with GitHub Desktop and run `npm install` once in the folder.

Each time you want to edit:

1. In the repo folder run `npm start`. The site opens at `http://localhost:8080`.
2. Open `http://localhost:8080/admin/` in **Chrome or Edge**.
3. Click **Work with Local Repository** and choose the repo folder (the first time only).
4. Edit in the forms. Every Save writes straight to the files, and the site on port 8080 refreshes so you can check it.
5. When you're happy, open GitHub Desktop, write a short summary, **Commit to main** and **Push origin**. The site goes live about a minute later.

Nothing goes live until you push.

## Editing on the live site

Go to `https://promisestreatmentcentre.org/admin/` and choose **Sign in with token**. You need a GitHub account with write access to this repo and a personal access token:

GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token. Repository access: only `primusjm/PTC`. Permissions: **Contents: Read and write**. Paste the token into the CMS. Each Save publishes to the live site.

## One-time setup: GitHub Pages

1. In the repo go to *Settings → Pages* and set **Source** to **GitHub Actions**.
2. Under **Custom domain** enter `promisestreatmentcentre.org` and tick **Enforce HTTPS** once it's available.
3. At your domain registrar, point the domain to GitHub Pages (see GitHub's guide "Managing a custom domain for your GitHub Pages site"). For a bare domain, add four `A` records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`. For `www`, add a `CNAME` record to `primusjm.github.io`.
4. Push to `main` (or run the *Deploy site* workflow from the Actions tab). The first deploy takes a couple of minutes.

The site must be served from the root of a domain, so use the custom domain rather than `primusjm.github.io/PTC/`.

## Call-back form

The "Leave your number" form sends through [Formspree](https://formspree.io/) (free plan). Create a form there, copy its address (`https://formspree.io/f/…`) and paste it into **Site Settings → Call-back form address**. Requests are emailed to the address on your Formspree account. While that setting is empty, the form is hidden and visitors use the phone and WhatsApp buttons instead.

## Images

Upload photos of any size. At build time each one is resized and converted to AVIF/WebP/JPEG (`assets/img/`), so pages stay fast on mobile data.

## Contact settings

WhatsApp number, website address (used for Google and link previews) and phone numbers are all in **Site Settings** in the CMS.
