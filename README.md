# Digital Car Museum

A Next.js App Router demo exploring automotive design from the 1950s through the 2020s. Built with React, TypeScript, and plain CSS.

<img width="1540" height="809" alt="image" src="https://github.com/user-attachments/assets/f5f4a26b-31bc-4839-a33e-24d402f4f66a" />

## Run locally

Use Node.js 20.9 or newer (a current LTS version is recommended).

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For a production build:

```sh
npm run build
npm start
```

Run `npm run typecheck` to check TypeScript.

## Routes

- `/` and `/home`: the home page, rendered on the server for each request.
- `/museum`: the decade collection.
- `/museum/1950`: a decade with a sample car.
- `/museum/1950/mercedes-benz-300-sl`: a sample car exhibit. The pattern is `/museum/[year]/[car]`, where year is the decade's starting year.
- `/about`: introduction to the project.

Home and museum routes use `force-dynamic` to demonstrate request-time server rendering. Their content is available in the initial HTML. The interactive decade browser is a React Client Component: Next.js also renders its initial HTML on the server, then React hydrates it in the browser. Its century buttons demonstrate client-side state updates without a server round-trip. It is not a client-only page.

The catalogue is configured in `src/data/eras/1950.json` through `2020.json`, with five curated cars and three real photographs per car in all eight decades (40 cars and 120 photographs). `src/lib/collection.ts` loads and validates these files on the server. The home page receives a summary containing each era's default car and cover image; it does not download the full catalogue. No database or external API is required.

## Add cars and photographs

Each era file contains its display information and a `cars` array. For example, `src/data/eras/2020.json`:

```json
{
  "year": 2020,
  "title": "Tomorrow, in motion",
  "description": "A new era of electric performance begins to take shape.",
  "cars": [
    {
      "slug": "rimac-nevera",
      "name": "Rimac Nevera",
      "engine": "Electric",
      "country": "Croatia",
      "year": 2021,
      "description": "The first sample exhibit in our 2020s collection.",
      "images": [
        "/images/cars/2020/rimac-nevera.01.jpeg",
        "/images/cars/2020/rimac-nevera.02.jpeg"
      ],
      "default": true,
      "cost": null
    }
  ]
}
```

- Add more car objects to the `cars` array. Each needs a unique lowercase, hyphenated `slug` for its URL and image filenames.
- Set exactly one car per era to `"default": true`; set the others to `false`. Its first image appears on that era's home/collection card. Changing the default changes the featured car.
- Put the actual JPEG files in `public/images/cars/{era}/{slug}.nn.jpeg`, using the era's start year as the folder (e.g. `2020`, even for a 2021 car). The image sequence uses at least two digits: `.01.jpeg`, `.02.jpeg`, etc.
- JSON image paths start with `/images/`, without `public`. List images in the order they should appear. The car detail page displays every listed image.
- Vehicle `year` must be within the era's ten-year range. `engine` is free text, so it can include displacement, layout, fuel type, or electric motor details.
- All eight collections each include 15 local JPEG photographs. Missing future image files display the generic illustration with a clear placeholder caption. No incorrect vehicle photograph is substituted.
- The era page lists all configured cars, and each links to `/museum/{era}/{slug}`.

Edit JSON or add photos during development to see the change on refresh. Rebuild after JSON changes for production. To introduce an additional era, create its JSON file and image folder, then register the file in `src/lib/collection.ts`.

Catalogue validation tests cover all era files, default selection, multiple cars/images, duplicate entries, and invalid paths and years. Run them with Node.js 22.18+:

```sh
node --experimental-strip-types --test tests/catalogue.test.mjs
```

## Design

A 1950s motoring style: cream paper, cherry red and turquoise accents, condensed display headings, script lettering, vintage sign details, and a responsive decade grid. Keyboard focus, a skip link, reduced-motion support, and button pressed states are included.

Google Fonts supplies DM Sans, Oswald, and Lobster; system fonts provide offline fallbacks.

## 1950s collection

The five cars are an editorial selection of decade-defining designs, rather than a ranked sales or performance list. The JSON `year` identifies the represented model year. The 300 SL remains the default era cover.

## 1960s collection

The 1960s JSON now contains Jaguar E-Type Series 1 3.8 Coupé (1961, default cover), Aston Martin DB5 (1964), Ford Mustang 289 Coupé (1965), Porsche 911 2.0 Coupé (1965), and Lamborghini Miura P400 (1967).

## Estimated present-day value (`cost`)

Every car has a `cost` key. All forty cars have sourced, dated GBP ranges; use `null` for future exhibits until their values are researched. These are static estimates, displayed on car detail and era listing pages. They are current collector-market estimates, not original retail prices adjusted for inflation, and do not update automatically.

```json
"cost": {
  "currency": "GBP",
  "min": 13000,
  "max": 23000,
  "asOf": "2026-11-02",
  "basis": "Indicative UK range for a good to excellent standard 289 V8 hardtop coupé; excludes Shelby, K-code, fastback and convertible premiums.",
  "sources": [
    "https://www.hagerty.co.uk/valuation/tool/results/?b=Coupe&cc=4735&md=Mustang&mk=Ford&sm=Base&y=1965"
  ]
}
```

`min` and `max` are positive numeric amounts, ordered low to high. `asOf` records the research date, `basis` describes the represented condition/specification and any comparable-based inference, and `sources` links to the evidence. The displayed source links allow readers to review the underlying figures.

Most ranges round the consulted Hagerty UK guide’s good-to-excellent figures. The 1950 Porsche 356 1100 uses a clearly labelled editorial estimate informed by a current comparable 1951 split-screen dealer listing because exact UK 1100 data is scarce. The Bel Air range is an editorial estimate informed by a July 2026 UK four-door sedan auction result and current European listings. These two estimates are inferences rather than verbatim model-specific guide values. Condition, body style, originality and history can move individual cars outside the stated ranges.

## 1970s collection

The five exhibits are Lamborghini Countach LP400 (1974, default cover), Ferrari 308 GTB Vetroresina (1975), Porsche 928 (1978), Volkswagen Golf GTI Mk1 1.6 (1979), and Datsun 240Z (1972). Each has exactly three JPEGs in this order:

1. `.01.jpeg`: front or front three-quarter view.
2. `.02.jpeg`: rear or rear three-quarter view.
3. `.03.jpeg`: cabin/interior view.

Value-source URLs are stored with each car. Countach, 928, GTI and 240Z ranges round the consulted UK guide’s good-to-excellent figures. The Ferrari Vetroresina range is an editorial estimate around The Classic Valuer’s roughly £125,000 median, rather than a quoted condition-specific appraisal; its `cost.basis` makes that distinction explicit. Research date: 2 November 2026.

## 1980s collection

The five exhibits are Ferrari F40 (1988, default cover), Porsche 959 Komfort (1988), BMW M3 E30 (1987), DeLorean DMC-12 (1981), and Peugeot 205 GTI 1.6 (1986).

The dated GBP ranges use Hagerty UK’s good-to-excellent guide figures, rounded where appropriate. Each car’s `cost.sources` links to its model-specific lookup. Research date: 2 November 2026.

On every car detail page, the estimated-value panel spans the content width below the gallery and above the related-car carousel. A compact two-column desktop layout stacks on narrow screens.

## 1990s collection

Five exhibits: McLaren F1 (1995, default cover), Honda NSX (1991), Toyota Supra A80 Twin Turbo (1994), Dodge Viper RT/10 (1994), and Lamborghini Diablo (1991).

Values are dated 2 November 2026 and link to their sources. F1, NSX and Diablo use UK guide good-to-excellent values. The Supra uses the guide’s broader A80 coupé category as an explicitly labelled proxy, rather than a turbo-specific appraisal. The Viper range is an editorial estimate around The Classic Valuer’s approximately £37,000 worldwide RT/10 median, which spans multiple model years. Each `cost.basis` explains the scope of the estimate.

## 2000s collection

Five exhibits: Porsche Carrera GT (2004, default cover), Ferrari Enzo (2003), Ford GT (2005), Bugatti Veyron 16.4 (2008), and Audi R8 4.2 FSI quattro (2007).

Each `cost` records a GBP range, research date (2 November 2026), scope and direct source URL. All five ranges use Hagerty UK’s good-to-excellent guide figures, rounded where appropriate. The Carrera GT is represented as a 2004 example to match its guide lookup; the model debuted in 2003.

## 2010s collection

Five exhibits: BMW i8 (2014, default cover), McLaren MP4-12C (2012), Porsche 918 Spyder (2015), Ferrari 458 Italia (2010), and Mercedes-Benz SLS AMG (2010).

All five GBP ranges use Hagerty UK’s good-to-excellent guide figures, rounded where appropriate. Each car records its exact guide URL, condition/specification scope and research date of 2 November 2026. Values remain below the gallery and above the related-car carousel.

## 2020s collection

Five exhibits: Rimac Nevera (2022, default cover), Ferrari Roma (2021), Porsche Taycan 4S (2020), Maserati MC20 (2023), and Lotus Emira V6 First Edition (2024).

The value ranges are editorial estimates researched on 2 November 2026, rather than condition-specific guide quotations. Nevera, Roma, MC20 and Emira use The Classic Valuer’s aggregated worldwide sales as broad references; Nevera evidence is especially sparse, and the Emira lookup covers more than the featured V6 First Edition. The Taycan estimate uses Porsche Approved used asking-price evidence, including a roughly £49,000 2020 4S listing, rather than treating the broader historical auction median as today’s UK price. Each `cost.basis` explains its inference and links directly to the evidence. Asking prices are not completed sale prices, and these static estimates do not update automatically.

Car-detail photos are rendered by the `CarGallery` client component. The separate reusable `ImageZoomDialog` React component uses the native modal dialog: it supports keyboard activation, Escape, its close button and backdrop clicks, confines focus while open, restores focus on close, and locks background scrolling. The surrounding car page remains server-rendered.

## Licence

See [licence.md](licence.md).
