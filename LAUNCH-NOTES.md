# Launch notes — Gummy's Home Cooking

Everything below must be confirmed with the owner before the site goes live. Nothing on the site was invented; where
sources disagree, the site follows the most recent source and the conflict is listed here.

## 1. Facts to confirm
- **Hours.** Site shows the updated Instagram bio hours: Fri & Sat 12–6 PM, Sun 12–5 PM, closed Mon–Thu (also matches
  the "We are open" graphic and the hiring graphic). **Conflict:** the printed in-house menu says "12pm–8pm Friday–Sunday".
  Confirm current hours; update `index.html`, `visit.html`, footer (all pages), JSON-LD, `llms.txt`, `assets/js/site.js`
  (`HOURS` object) and `assets/img/og.jpg` if they change.
- **Early closings.** Site tells visitors to follow Instagram for day-of updates (they have posted Sunday 4 PM closings).
- **Address/locality.** Site uses "7503 Midlothian Tpke, Richmond, VA 23225". The printed menu says
  "North Chesterfield VA 23225". Confirm which city name the owner wants on Google/the site (both are valid for 23225).
- **Google rating.** 4.6 stars from 250 reviews (shown on home + `aggregateRating` in home-page JSON-LD). Update the
  numbers at launch.
- **Bar.** Site says "Gummy's has a bar now" / "pull up to the bar" based on the "Gummy's new bar!!!!" post. Confirm the
  bar is open to dine-in guests and whether alcohol is served (the site does not mention alcohol).
- **Dine-in, takeout, call-ahead.** Stated on the site from posts. Confirm walk-in ordering at the counter.
- **Parking.** Not verified. The FAQ currently says to call for the best place to park — replace with real parking
  details (lot? shared lot with neighbors?).
- **Reservations.** Not verified; FAQ says no reservation system is listed. Confirm.
- **Catering.** NOT on the site (not verified). Ask the owner if they cater — it could be a strong added section/form.
- **Delivery apps.** NOT on the site (none verified). Ask if they use DoorDash/Uber Eats/Grubhub; add links if so.
- **Black-owned.** Stated from the business's own hashtags (#blackownedbusiness, #blackownedrestaurant). Confirm the
  owner is happy with this on the site.
- **Family names.** Site says only that every entree carries the name of someone in the family — no stories about
  who they are. If the owner wants to share who Papa, Elma, Susie, Johnnie, Charlie, Bertha, Wilbur and Buddy are,
  that would make the About page much stronger.

## 2. Menu items / prices to confirm
All prices were transcribed from the printed menu photo (src-33) and were fully legible. Confirm they are current.
- **Spelling:** the printed menu says "Suzie's Fried Chicken Wings"; the entrees graphic says "Susie's Chicken Wings".
  Site uses **Susie's** — confirm.
- **Spelling:** printed menu says "Shellies Mac & Cheese" (no apostrophe) and "May-belle Yams"; site uses
  "Shellie's Mac & Cheese" and "May-Belle Yams" (as in the Instagram caption). Confirm.
- **"PaPa":** printed menu capitalizes "PaPa Fried Fish"; site uses "Papa's". Confirm.
- **Onion Rings** printed as "5.00" (no $ sign); shown as $5.00.
- **No price on the printed menu** for Bertha's Baked Chicken, Wilbur's Pig Feet and Buddy's Beef Ribs (Sunday only).
  Site shows "Ask for today's price" and no price in JSON-LD. Get prices, or confirm these are still on the menu.
- **Sides with entrees:** confirm whether any side (e.g. Shellie's Mac & Cheese at $6.50) carries an upcharge when
  chosen as one of the 2 included sides.
- **Specials** (shrimp po' boy, cheese steak egg rolls, crab dip & chips, shrimp taco salad, jumbo shrimp dinner, peach
  cobbler, homemade rolls, assorted cakes, beef short ribs) are presented as rotating, without prices. Confirm which are
  still made. "Cheese steak egg rolls" (special) vs "Steak Egg Roll" ($6.00, printed menu) — confirm if the same item.
- **Desserts:** printed menu lists only "Assorted Dessert $5.00"; site mentions peach cobbler and cakes have come out of
  the kitchen (from posts). Confirm dessert pricing.

## 3. Photo credits and licensing
All photos come from Gummy's Home Cooking's own public Instagram/Facebook posts and **must be approved/licensed by the
owner before launch**. Files in `assets/img/`:
storefront-sign-night, charlies-baked-turkey-wings, papas-fried-fish-greens-yams, susies-fried-chicken-wings,
johnnies-smothered-pork-chops, wilburs-pig-feet, beef-short-ribs, peach-cobbler, chicken-wing-dinner, shrimp-po-boy,
bar-shot-glass, front-counter-bar, dining-room-love-sign, fish-and-shrimp-dinner, jumbo-shrimp-dinner, homemade-rolls,
assorted-cakes, crab-dip-and-chips, papas-fried-fish, shrimp-taco-salad, cheesesteak-egg-rolls, printed-menu,
gummys-logo-sign / gummys-logo-sm (logo, cropped from the counter sign photo).
- Photo-to-dish pairing on the entree cards is representative (e.g. the "Jumbo shrimp dinner" post is used on Elma's
  Fried Shrimp; the "Chicken wing dinner" post on Susie's). Confirm or swap with the owner's own dish photos.
- Bertha's Baked Chicken has no photo (an SVG skillet illustration is used). **Swap:** ask for a photo.
- **Recommended:** a short professional food shoot (hero plate, all nine entrees, sides, dining room and bar) and a
  vector logo file (current logo is cropped from photos). Replace `og.jpg` and favicons after a vector logo is supplied.
- Staff-recruitment, closure-notice and text-heavy promo graphics were intentionally not used.

## 4. Other items to swap / set up
- Claim/update the Google Business Profile and add the website URL; keep hours consistent everywhere.
- Add the site URL to the Instagram, TikTok and Facebook bios.
- No forms on this site (the brief did not call for one). If catering is confirmed, add a Netlify Form.
- Optional: embed a Google Map on `visit.html` (requires adding `frame-src https://www.google.com` to the CSP).

## 5. Proposed domain
**gummyshomecooking.com** (used for canonical, Open Graph, sitemap and `llms.txt` URLs).


## Live preview domain (updated 27 Sep 2026)
The site is live at https://gummys-home-cooking-website.netlify.app/ and every canonical URL, Open Graph/Twitter tag, JSON-LD URL, sitemap.xml, robots.txt and llms.txt now points there, so text-message and social link previews show this address.
When the owner's own domain (gummyshomecooking.com) is connected in Netlify, find-and-replace `gummys-home-cooking-website.netlify.app` with `gummyshomecooking.com` across the .html/.xml/.txt/.toml files, then redeploy.
