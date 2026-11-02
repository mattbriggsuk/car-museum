# Digital Car Museum

A Next.js App Router demo exploring automotive design from the 1950s through the 2020s. Built with Next.js 16, React 19, TypeScript and plain CSS, it combines server-rendered pages with interactive React components.

The catalogue contains eight decades, five cars per decade and three photographs per car: 40 exhibits and 120 vehicle photographs. Data and assets live in the repository; no database, API keys or environment variables are required.

<img width="1540" height="809" alt="image" src="https://github.com/user-attachments/assets/f5f4a26b-31bc-4839-a33e-24d402f4f66a" />

## Run locally

The application requires Node.js 20.9 or newer. Use Node.js 22.18+ to run the catalogue tests as well.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For a production build:

```sh
npm run build
npm start
```

Production needs a Node.js server with the project’s `public` assets available. The home and museum pages render on each request, so this app is not configured for static export. Catalogue changes require a new production build because the JSON files are imported into the application.

## Pages and navigation

The shared header contains the Digital Car Museum car icon and links to Home, The collection and About. The footer links back to Home and to `/credits`.

| Route | Content |
| --- | --- |
| `/` and `/home` | The same home page: museum/café hero, introduction, filterable decade cards and an About section. |
| `/museum` | Collection introduction with a convertible-and-country-road image, followed by the same decade browser. |
| `/museum/[year]` | All cars in a decade, shown as compact listings with a thumbnail on the left, name, model year, country, engine, description and estimated value. |
| `/museum/[year]/[car]` | Individual exhibit: description and vehicle facts, image gallery, full-width estimated-value panel and a horizontal “More cars from the {year}s” carousel. |
| `/about` | Project introduction and a link back to the home-page decades section. |
| `/credits` | Supporting credits page, linked from the footer. |

`year` is the decade’s starting year, while `car` is the configured slug. For example:

```text
/museum/1950
/museum/1950/mercedes-benz-300-sl
/museum/2020/rimac-nevera
```

Unknown decades or car slugs show the custom “A wrong turn” 404 page, with a link back to the collection.

## Server and client rendering

`/`, `/home`, `/museum`, `/museum/[year]` and `/museum/[year]/[car]` use `force-dynamic` for request-time server rendering. Their content is available in the initial HTML. `/about` and `/credits` use the default rendering behaviour and can be prerendered at build time.

The server loads and validates the catalogue in `src/lib/collection.ts`. It passes only era summaries to the decade browser, gallery image data to the gallery and other cars from the selected decade to the carousel.

The interactive components also receive an initial server render, then hydrate in the browser:

- `DecadeBrowser`: filters the cards between All decades, 20th century and 21st century using local React state. The current filter groups 1950–1990 and 2000–2020 respectively.
- `CarGallery`: opens a selected photograph in the separate, reusable `ImageZoomDialog` component. The modal supports keyboard activation, Escape, a close button and backdrop clicks; it manages focus and locks background scrolling while open.
- `MoreCarsCarousel`: supports horizontal scrolling, previous/next buttons and left/right arrow keys when the track is focused. It excludes the current exhibit. Car links use Next.js `Link` for client-side route navigation while the destination page renders on the server.

## Project structure

```text
src/
  app/
    layout.tsx                    Shared header, footer and metadata
    globals.css                   Site styles and responsive layouts
    page.tsx                      Home at /
    home/page.tsx                 Home at /home
    museum/page.tsx               Decade collection
    museum/[year]/page.tsx        Cars in one decade
    museum/[year]/[car]/page.tsx   Individual car exhibit
    about/page.tsx                About page
    credits/page.tsx              Credits page
    not-found.tsx                 Custom 404 page
  components/
    home-page.tsx                 Shared home-page content
    museum-mark.tsx               Header car icon
    decade-browser.tsx            Decade cards and client-side filters
    car-image.tsx                 Reusable image and placeholder display
    car-gallery.tsx               Clickable exhibit gallery
    image-zoom-dialog.tsx         Reusable image modal
    car-valuation.tsx             Exhibit estimated-value panel
    more-cars-carousel.tsx        Related exhibits in the same decade
  data/
    eras/1950.json … 2020.json     Eight catalogue configuration files
    photo-credits.json            Per-image metadata
  lib/
    catalogue.ts                  Types, validation and default-car selection
    collection.ts                 Server catalogue and image lookup
    valuation.ts                  GBP range formatting
public/images/
  cars/1950/ … cars/2020/          Local vehicle JPEGs
  museum-cafe-hero.webp            Home-page hero
  collection-road-hero.webp        Collection-page hero
  fifties-roadster.svg             Missing-image placeholder
tests/catalogue.test.mjs           Catalogue and asset checks
docs/image-prompts/                Artwork prompt files
licence.md                        Licences, credits and reference material
```

The `tests`, `docs` and `licence.md` entries are at the project root. TypeScript’s `@/*` alias maps to `src/*`. Build configuration is in `next.config.ts` and `tsconfig.json`; scripts and dependencies are in `package.json`.

## Collections

Each decade has five exhibits. Exactly one car is marked as its default; that car’s first image appears on the decade card.

| Decade | Configuration | Featured car |
| --- | --- | --- |
| 1950s | `src/data/eras/1950.json` | Mercedes-Benz 300 SL Gullwing |
| 1960s | `src/data/eras/1960.json` | Jaguar E-Type Series 1 3.8 Coupé |
| 1970s | `src/data/eras/1970.json` | Lamborghini Countach LP400 |
| 1980s | `src/data/eras/1980.json` | Ferrari F40 |
| 1990s | `src/data/eras/1990.json` | McLaren F1 |
| 2000s | `src/data/eras/2000.json` | Porsche Carrera GT |
| 2010s | `src/data/eras/2010.json` | BMW i8 |
| 2020s | `src/data/eras/2020.json` | Rimac Nevera |

## Add or edit an exhibit

Edit the relevant `src/data/eras/{year}.json`. Each era contains its `year`, display `title`, `description` and a non-empty `cars` array. This is a minimal example of the structure, rather than the full existing 2020s collection:

```json
{
  "year": 2020,
  "title": "Tomorrow, in motion",
  "description": "A new era of electric performance.",
  "cars": [
    {
      "slug": "rimac-nevera",
      "name": "Rimac Nevera",
      "engine": "Electric",
      "country": "Croatia",
      "year": 2022,
      "description": "An electric performance exhibit.",
      "images": [
        "/images/cars/2020/rimac-nevera.01.jpeg",
        "/images/cars/2020/rimac-nevera.02.jpeg",
        "/images/cars/2020/rimac-nevera.03.jpeg"
      ],
      "default": true,
      "cost": null
    }
  ]
}
```

- Each car needs a unique lowercase, hyphenated `slug` within its era, plus non-empty `name`, `engine`, `country` and `description` fields.
- The vehicle `year` must fall within the era’s ten-year range. The era’s `year` must match its filename and be a multiple of ten.
- Set exactly one car per era to `"default": true`; all others must be `false`.
- Place JPEGs in `public/images/cars/{era}/{slug}.nn.jpeg`. Use the decade’s starting year as the folder, even when the car’s model year differs. The sequence needs at least two digits.
- List image paths starting with `/images/`, without `public`, in the desired gallery order. At least one image is required, and duplicate paths are rejected. The current collections each have three photographs per car.
- Missing image files use the generic roadster illustration with a placeholder caption. Placeholder images cannot open the zoom dialog.
- Include `cost`, using an estimate object or `null` to hide the value panel. See the schema below.

Development changes appear after the updated files are compiled and the page is refreshed. For a new decade, add its JSON file and image folder, then import and register it in the `decades` array in `src/lib/collection.ts`. Update the catalogue tests, which currently assert eight decades and the existing featured cars.

## Estimated values

All 40 existing exhibits have a dated GBP estimate. Values appear in the era listings and in a compact, full-width panel below the exhibit gallery and above its carousel. Estimates describe collector-market values, not inflation-adjusted original retail prices, and do not update automatically.

The `cost` object has these fields:

| Field | Requirement |
| --- | --- |
| `currency` | `"GBP"` |
| `min`, `max` | Finite numeric amounts; `min` must be positive and `max` must be at least `min`. |
| `asOf` | A valid calendar date in `YYYY-MM-DD` format. |
| `basis` | Non-empty text explaining the represented condition, specification and estimate scope. |
| `sources` | A non-empty array of HTTPS evidence URLs. |

`src/lib/valuation.ts` formats the range in pounds without decimal places. Set `cost` to `null` for an exhibit awaiting valuation; the current collection tests require populated estimates for the existing cars.

## Styling and accessibility

The site uses a 1950s motoring/café style: cream paper, cherry red and turquoise accents, condensed headings, script lettering and vintage sign details. Styles are in `src/app/globals.css`, including mobile layouts for the header, decade grid, thumbnail listings, gallery and value panel.

DM Sans, Oswald and Lobster load through a Google Fonts CSS import, with local system fallbacks when unavailable. Accessibility features include a skip link, labelled controls, visible keyboard focus, filter pressed states and result announcements, modal focus handling and reduced-motion support.

## Checks

Check TypeScript:

```sh
npm run typecheck
```

Run the catalogue tests with Node.js 22.18+:

```sh
node --experimental-strip-types --test tests/catalogue.test.mjs
```

The tests cover catalogue validation, default selection, invalid and duplicate entries, image naming, local image decoding and dimensions, duplicate photograph detection, metadata completeness, gallery view ordering, valuation validation and GBP formatting. The asset checks use `sharp`, supplied through the installed Next.js dependency tree.

Validate the production build:

```sh
npm run build
```

There is currently no `npm test` or lint script.

## Licence

See [licence.md](licence.md).
