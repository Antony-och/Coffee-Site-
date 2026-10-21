# First Cup website editing guide

This project is organized so content changes can be made in data files without redesigning the React components.

## Quick map

| What you want to change | Edit this file | What to look for |
| --- | --- | --- |
| Home hero slides, hero text, hero images, or hero video | `src/data/companyData.ts` | `HERO_SLIDES` |
| Home hero rendering, controls, autoplay, and overlays | `src/components/HeroSlideshow.tsx` | `HERO SLIDESHOW` comments |
| Home collection card title, text, and image | `src/components/HomePage.tsx` and `src/data/siteAssets.ts` | `HOME COLLECTIONS` and `SITE_ASSETS.home` |
| Coffee products, names, descriptions, and product images | `src/data/coffeeData.ts` | `COFFEE_PRODUCTS` |
| Tea products, names, descriptions, and product images | `src/data/teaData.ts` | `TEA_PRODUCTS` |
| Events & Stories posts and galleries | `src/data/eventsStoriesData.ts` | `EVENT_STORY_POSTS` |
| Events & Stories feed layout, filters, cards, and slideshow modal | `src/components/EventsStoriesSection.tsx` | `JOURNAL FEED` and `POST SLIDESHOW` comments |
| About Us copy and export information | `src/components/AboutSection.tsx` and `src/data/companyData.ts` | About Us sections |
| Coffee and tea process steps | `src/data/companyData.ts` | `COFFEE_PROCESS_STEPS` and `TEA_PROCESS_STEPS` |
| Page routing and page-level SEO | `src/App.tsx` and `src/utils/pageRoutes.ts` | route and metadata maps |
| Global colors, typography, and responsive styles | `src/index.css` | global design tokens |
| Public static files | `public/` | use descriptive filenames and reference them as `/folder/filename.ext` |

## Changing an image

1. Add the new file under `public/` using a descriptive name, for example `public/home/premium-coffee-products.png`.
2. Update the matching path in the data file listed above.
3. Keep the same aspect ratio when possible so the existing crop remains consistent.
4. Run `npm run lint` and `npm run build` before pushing.

## Adding an Events & Stories post

Add one object to `EVENT_STORY_POSTS` in `src/data/eventsStoriesData.ts`. Every post should include:

- `id`
- `category`: `Events`, `Activations`, `Community`, or `Coffee Stories`
- `title`
- `date` in `YYYY-MM-DD` format
- `excerpt` and `body`
- `images`: an array of two or three image paths
- `readTime`
- The optional category-specific field: `eventDate`, `location`, `partner`, or `origin`

The feed automatically sorts posts newest first, creates the cards, applies the category styling, and provides the image slideshow when a card is opened.

## Adding a hero slide

Add a new object to `HERO_SLIDES` in `src/data/companyData.ts`. Image slides use `image`. Video slides use both `video` and `image`, where `image` is the poster fallback. The hero controls and slide count update automatically.

## Naming convention

Use lowercase kebab-case for new public assets:

- `public/hero/events-stories-hero.png`
- `public/home/premium-coffee-products.png`
- `public/brands/trusted/partner-name.png`

Keep reusable content in `src/data/` and keep rendering/layout logic in `src/components/`.
