# Licences, credits and references

This document records image origins, credits and usage information, together with historical and technical references for the vehicle catalogue. Third-party photographs retain their original licences.

## Vehicle photographs

Photographs come from Wikimedia Commons. The full per-image attribution records are in [src/data/photo-credits.json](src/data/photo-credits.json), including each local filename, original title, photographer, source page, download URL, licence, licence URL when supplied, modification statement and any view or model-year notes. Retain these credits and the original image licences when reusing the photos.

The app exposes the records through the `/credits` page, linked from the footer, and the car-gallery image zoom dialog. Era cards, car-list thumbnails and related-car carousel cards omit credit captions.

There are 120 vehicle photographs across eight decades. The records in `photo-credits.json` describe the current images, including replacements made after the original collections were assembled.

## Photograph representation and collection notes

Photographs illustrate the configured model or generation. Individual cars, colours, trim, steering configuration and model years can differ between views. The per-image notes identify known differences and uncertainty.

### 1950s

The JSON `year` identifies the represented model year; photographs show examples of that model and may have been taken recently. Engine descriptions identify the featured model/variant, not a verified engine number of each photographed vehicle.

### 1960s

Each car has three local JPEGs with source/licence records in `src/data/photo-credits.json`. The 1950s Mercedes second photograph was replaced with a distinct interior photograph rather than another similar exterior view.

### 1970s

The corresponding photo-credit entries record `view` as `front`, `rear`, or `interior`; the app uses this in image alt text and zoom-dialog captions. Photograph sets represent the same model generation, but may show different individual cars. The Mk1 GTI cabin’s exact model year is undocumented, which is stated in its caption and credits rather than presented as a verified 1979 car.

### 1980s

Photographs represent the model generation and can show different individual cars. The BMW photographs’ exact model year is undocumented; the Peugeot cabin’s exact year and engine variant are also unconfirmed. Zoom-dialog captions and photo-credit records state these limitations.

### 1990s

The galleries show representative examples, sometimes from different years within the same generation. The F1 exterior and cabin photographs show 1996 cars. The NSX rear view has an undocumented model year; its cabin is an Acura-badged North American example. The Supra cabin is a 1995 RZ, the Viper cabin is a 1992 RT/10, and the Diablo cabin is a related VT variant. Relevant differences appear in zoom-dialog captions and credits.

### 2000s

The galleries show representative production examples, sometimes different individual cars and colours. The Carrera GT front/cabin and Enzo cabin have undocumented model years; the R8 interior is a 2008 example of the original V8 generation. Relevant notes appear in zoom-dialog captions and credits.

### 2010s

The galleries show representative road cars, sometimes different individual examples, model years, colours and option packages. The 458 exterior/interior photographs represent 2011/2014 standard coupés. The 918 cabin was photographed at the 2013 Frankfurt motor show; the SLS cabin at Geneva in 2011. Other unconfirmed model years are identified in zoom-dialog captions and credits. Engine specifications describe the configured exhibit, rather than a verified specification for every photographed car.

### 2020s

Four galleries are ordered front, rear, interior. The Nevera has front, rear, and an additional exterior view: a verified reusable interior photograph has not yet been sourced. Its third image is explicitly labelled `exterior`, with an explanatory caption; it is not presented as a cabin photograph. The Taycan cabin is a related GTS example, and the MC20 cabin is a related Cielo example. Caption notes identify these differences and other unconfirmed photographed model years. Photographs illustrate the generation rather than certifying an individual car’s exact specification.

## Generated artwork and local illustration

### Home-page museum and driving café

The home-page hero uses an AI-generated image of a fictional 1950s car museum and driving café ([museum-cafe-hero.webp](public/images/museum-cafe-hero.webp)), made with the built-in image generation tool. It is atmospheric artwork, rather than a photograph of a real venue or a particular exhibit. The generation prompt is preserved in [the generation prompt](docs/image-prompts/museum-cafe-hero.txt). The [roadster SVG](public/images/fifties-roadster.svg) is retained for missing-image placeholders.

### Collection-page convertible and country road

The `/museum` introduction pairs its title with an AI-generated 1950s-style convertible on a winding country road, positioned to the right on desktop and beneath the introduction on smaller screens. The local asset is [collection-road-hero.webp](public/images/collection-road-hero.webp); the built-in image generation prompt is saved in [the generation prompt](docs/image-prompts/collection-road-hero.txt). The Credits page identifies it as fictional artwork.

The two generated scenes are original atmospheric artwork created for this project with the built-in image generation tool. They depict fictional subjects and are separate from the third-party vehicle photographs and their licences. Their final prompts and generation details are retained in the linked project files.

## Historical and technical references

### 1950s

- Mercedes-Benz 300 SL Gullwing (1954): [Mercedes-Benz Classic](https://partssearch.mercedes-benz-classic.com/series/detail/198) and [Technik Museum Sinsheim](https://wifi.technik-museum.de/en/discover/exhibits/mercedes-benz-300-sl-gullwing/).
- Citroën DS 19 (1956): [DS Automobiles history](https://www.media.stellantis.com/de-de/ds/press/70-jahre-ds-ein-ikonisches-automobil-feiert-geburtstag) and [official 70-year history brochure](https://www.media.stellantis.com/uploads/pt/attachment/4651/00_brochure_a_70year_history_en_v23012025-67920d7e0ef6c.pdf).
- Chevrolet Bel Air (1957): [Savoy Automobile Museum](https://savoymuseum.org/portfolio-items/1957-chevrolet-bel-air-convertible/). The 283 cu in V8 is a period option, not the only engine offered.
- Porsche 356 1100 (1950): [Porsche Classic](https://www.porsche.com/usa/accessoriesandservice/classic/models/356/356/) and [Porsche heritage](https://investorrelations.porsche.com/en/about-porsche/heritage). The 356 itself dates to 1948; this collection represents the German-built 1950 1100 model.
- Morris Mini-Minor (1959): [BMW Group’s history of the original Mini](https://www.press.bmwgroup.com/global/article/detail/T0300116EN/1959-%E2%80%93-2019-sixty-years-of-mini?language=en).

### 1960s

- [JLR: E-Type 60 Collection and original 1961 cars](https://media.jlr.com/corporate/news/2021/03/jaguar-classic-reveals-e-type-60-collection-60th-anniversary-tribute-iconic-sports-car).
- [Aston Martin: DB5](https://media.astonmartin.com/db5/?lang=eng).
- [Ford: the Mustang’s World’s Fair debut](https://corporate.ford.com/corporate/corporate/articles/history/mustang-worlds-fair/) and [period Ford brochure](https://media.ford.com/content/dam/fordmedia/history/heritage-vault/brochures/1965_ford_recreational_car_and_truck_brochure_ar_96_212010_13211.pdf).
- [Porsche: original two-litre 911](https://newsroom.porsche.com/en/products/porsche-one-millionth-911-milestone-seven-generations-13735.html).
- [Lamborghini: Miura history](https://www.lamborghini.com/en-en/history/miura).

### 1970s

- [Lamborghini milestones](https://www.lamborghini.com/en-en/history/milestones).
- [Ferrari 308 GTB](https://www.ferrari.com/en-EN/auto/308-gtb) and [FIA historic homologation record](https://historicdb.fia.com/car/ferrari-308-gtb-0).
- [Porsche: 40 years of the 928](https://www.porsche.com/uk/accessoriesandservice/classic/928-anniversary/).
- [Volkswagen: GTI history](https://www.volkswagen-newsroom.com/en/the-new-golf-gti-international-media-drive-6282/golf-gti-history-6287).
- [Nissan Heritage: Datsun 240Z](https://www.nissan-global.com/EN/HERITAGE_COLLECTION/datsun_240z.html).

### 1980s

- [Ferrari F40: FIA homologation record](https://historicdb.fia.com/model/f40-2936).
- [Porsche Museum: 959 Coupé](https://newsroom.porsche.com/en/press-kits/Porsche-Museum/Porsche-959-Coup%C3%A9.html).
- [BMW Group Classic: M3 E30](https://www.bmwgroup-classic.com/en/models/bmw-classics/product-description-page.ad-239-1.bmw-m3-e30.html).
- [Haynes Motor Museum: 1981 DeLorean DMC-12](https://www.haynesmuseum.org/the-museum/collection-highlights/1981-delorean-dmc-12/).
- [FIA: Peugeot 205 GTI 1.6](https://historicdb.fia.com/model/205-gti-115cv).

### 1990s

- [McLaren: F1 legacy](https://cars.mclaren.com/us-en/legacy/mclaren-f1) and [original McLaren road-car specification sheet](https://www.allcarcentral.com/McLaren_pdf/McLAREN_F1_ROADCAR-SPECIFICATION.pdf).
- [Honda: 1991 NSX press kit](https://hondanews.com/en-US/releases/release-4edb8848ab8a9f2f9a24ee004c34ca7a-1991-acura-nsx-introduction).
- [Toyota: 1993 Supra launch](https://global.toyota/en/detail/7868203).
- [Dodge: period 1993 range brochure](https://www.auto-brochures.com/makes/Dodge/Dodge_US%20Full%20Line_1993.pdf).
- [Lamborghini: Diablo history](https://www.lamborghini.com/en-en/history/milestones).

### 2000s

- [Porsche Museum: Carrera GT](https://newsroom.porsche.com/en/press-kits/Porsche-Museum/Porsche-Carrera-GT.html).
- [Ferrari: Enzo Ferrari](https://www.ferrari.com/en-EN/auto/enzo-ferrari).
- [Ford: 2005 GT owner’s manual](https://www.fordservicecontent.com/Ford_Content/Catalog/owner_information/2005-Ford-GT-Owners-Manual-version-1_om_EN-US_05_2004.pdf) and [period Ford GT specifications](https://www.auto-brochures.com/makes/Ford/GT/Ford_US%20GT_2006.pdf).
- [Bugatti: Veyron origins and W16](https://newsroom.bugatti.com/press-releases/15-years-of-bugatti-veyron-how-it-all-began).
- [Audi: original R8 launch announcement](https://www.audi-press.jp/press-releases/2007/crt6ds0000000kzb.html).

### 2010s

- [BMW: original i8 launch and plug-in hybrid drivetrain](https://www.press.bmwgroup.com/usa/article/detail/T0145577EN_US/the-bmw-i8-%E2%80%93-ushering-in-a-new-era-of-sustainable-performance-priced-from-135-700-in-the-us?language=en_US).
- [McLaren: 12C legacy](https://cars.mclaren.com/en/legacy/12c) and [Hagerty: MP4-12C model history and guide](https://www.hagerty.co.uk/valuation/tool/results/?b=Coupe&cc=3799&md=MP4-12C&mk=McLaren&sm=Base&y=2012).
- [Porsche: 918 Spyder and its hybrid drivetrain](https://www.porsche.com/usa/accessoriesandservice/classic/models/918/).
- [Ferrari: 458 Italia](https://www.ferrari.com/en-EN/auto/458-italia) and [official Ferrari dealer specifications](https://www.nikihasler.com/en/Cars/394/Ferrari-458-Italia).
- [Mercedes-Benz: original SLS AMG press kit](https://www.ausmotive.com/downloads/Mercedes-Benz/SLS-AMG-Press-kit-July2010.pdf). Its 6,208 cc engine is marketed as 6.3 litres; the catalogue distinguishes the actual displacement.

### 2020s

- [Rimac: first production-ready Nevera and four-motor drivetrain](https://www.rimac-newsroom.com/press-releases/rimac-automobili/first-production-ready-rimac-nevera-takes-to-the-streets).
- [Ferrari: Roma](https://www.ferrari.com/en-EN/auto/ferrari-roma).
- [Porsche: original Taycan 4S](https://newsroom.porsche.com/en/2019/products/porsche-taycan-4s-electric-sports-car-entry-level-model-18901.html).
- [Maserati: MC20 and Nettuno V6](https://www.media.stellantis.com/us-en/maserati/press/maserati-mc20).
- [Lotus: Emira V6 First Edition specification](https://media.lotuscars.com/en/news-articles/lotus-confirms-full-specification-and-price-of-all-new-emira-v6-first-edition.html).
