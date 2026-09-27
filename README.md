# Gummy's Home Cooking — spec website

A production-ready, static spec website for **Gummy's Home Cooking**, a Black-owned soul food restaurant at
7503 Midlothian Tpke, Richmond, VA 23225. Concept and build by Couture House Co.

- Design direction: "Sunday Supper" — tomato red, mustard, cream, cast-iron and collard green; Bevan display type,
  Caveat handwriting for the family names, Karla body; gingham and recipe-card paper textures.
- Motion: recipe cards that deal in and settle on scroll, steam wisps over the hero plate that intensify as you scroll,
  hand-drawn underlines under the family names, and a scrolling hours ribbon on phones. All motion is disabled under
  `prefers-reduced-motion`, and all content is visible without JavaScript.
- No build step, no frameworks, no third-party requests. Fonts are self-hosted (Fontsource, SIL OFL).

## Pages
| File | Purpose |
| --- | --- |
| `index.html` | Home: hero, family-names hook, signature plates, 2-sides rule, specials, bar, rating, quick facts, FAQ |
| `menu.html` | Full HTML menu transcribed from the printed in-house menu, specials, printed-menu lightbox |
| `visit.html` | Hours table with live "open now" (America/New_York), address, wayfinding, directions, FAQ |
| `about.html` | The family-kitchen story, told from verified facts only |
| `404.html` | Friendly not-found page (root-absolute paths) |

Also: `robots.txt`, `sitemap.xml`, `llms.txt` (AI answer-engine fact sheet), `site.webmanifest`, `netlify.toml`.

## Preview locally
Double-click `index.html`, or serve the folder (recommended, so fonts preload correctly):

```bash
cd gummys-home-cooking
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy on Netlify
1. Create a new site in Netlify and drag this folder into "Deploy manually" (or connect a Git repo with this folder as
   the publish directory — there is no build command).
2. `netlify.toml` sets security headers (CSP, HSTS, etc.), long-lived caching for `/assets/*`, short URLs
   (`/menu`, `/visit`, `/about`) and the custom 404.
3. Add the custom domain in **Domain management** and enable HTTPS.

If you ever edit the one-line inline script in the `<head>` (`document.documentElement.classList.add('js')`), update its
`sha256` hash in the `Content-Security-Policy` in `netlify.toml`.

## Domain
Register **gummyshomecooking.com** (canonical, Open Graph and sitemap URLs already point to it).
If the owner prefers another domain, find-and-replace `https://gummyshomecooking.com` across the HTML, `sitemap.xml`,
`robots.txt` and `llms.txt`.

## Before launch
See `LAUNCH-NOTES.md` for every fact to confirm with the owner and the photo-licensing note.
