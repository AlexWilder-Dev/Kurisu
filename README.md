# Kurisu Omakase: demo site

A speculative website for **Kurisu Omakase**, Chris Restrepo's eight-seat omakase counter at 58D Atlantic Road, Brixton. It was made to pitch to Chris and Suwannee. It is not their official site.

It is front end only: static data, no backend. The notify form shows a confirmation and sends nothing. The Book buttons link to Kurisu's live SevenRooms page.

## What's in it

- **The drop.** A countdown to the next season's dates (the date is a mock, marked DEMO), plus the newsletter head start and the notify list.
- **The counter.** A top-down view of the eight seats with a 6pm / 8.30pm switch. Guests arrive first in, first served, and Suwannee potters about. Tap any seat to see the view from it and what Chris would say about it.
- **Eighteen courses, eighteen cuts.** Past-season dishes as a scroll sequence. As you scroll, a Hokkaido scallop gets its 18 "Houdini cut" scores.
- **Booking and the rules.** "Nani? Let's break it down." The bill as a till receipt, the house rules and the dietary limits.
- **The story.** The room was Ichiban Sushi from 1999 until 18 December 2021, then became Chris's counter.
- **Press, getting there, and what to do when it's sold out.**

Routes (HashRouter):
- `/` is the home page.
- `/before-you-book` is a single page the restaurant can paste into DMs.
- `/story` is the full history.

## Editing the content

Everything factual lives in **`src/data/kurisu.ts`**: season, seatings, price, booking link, house rules, dietary limits, past dishes, press and the story. Each entry carries its source.

The research behind it is in **`research/notes.md`**.

## Photos

All photos are Kurisu Omakase's or Ichiban Sushi's own. They come from Instagram, the Kurisu newsletter, and a Resy feature credited "courtesy of Kurisu Omakase". No press photographers' images are used. The originals are in `research/photos/`, with notes on what each one shows.

```bash
npm run images   # research/photos -> public/img (640/1280 JPG + WebP) and favicons
npm run og       # builds public/og.jpg (1200×630) for link previews
```

The first time `npm run og` runs, it downloads the two font files it needs from Google Fonts.

## Develop

```bash
npm install
npm run dev
npm run build    # outputs dist/
```

## Deploy

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to the repository's default branch. Pages must be set to "GitHub Actions" as the source.

By default the base path is `/kurisu-omakase/`, and `index.html` holds absolute URLs to `https://alexwilder-dev.github.io/kurisu-omakase/`. In CI, `actions/configure-pages` reports the real Pages URL and the build uses it for both the base path and those absolute link-preview URLs. So the site works whatever the repository is called, and keeps working if it's renamed.

The demo ping at the bottom of `index.html` posts to `https://ntfy.sh/YOUR-NTFY-TOPIC`. Replace that with your own topic.

## Credits

Type: [Fraunces](https://fonts.google.com/specimen/Fraunces) and [Karla](https://fonts.google.com/specimen/Karla), both under the SIL Open Font License. Karla is the typeface on Kurisu's own Linktree.

Site by AlexWilder-Dev.
