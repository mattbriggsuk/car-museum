import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { validateEra, getDefaultCar } from '../src/lib/catalogue.ts';

const original = JSON.parse(readFileSync(new URL('../src/data/eras/2020.json', import.meta.url), 'utf8'));
const fixture = () => ({ ...structuredClone(original), cars: [structuredClone(original.cars[0])] });

function withSecondCar() {
  const era = fixture();
  era.cars[0].default = false;
  era.cars.push({ ...era.cars[0], slug: 'another-car', name: 'Another car', images: ['/images/cars/2020/another-car.01.jpeg', '/images/cars/2020/another-car.02.jpeg'], default: true });
  return era;
}

test('all eight era files are valid and have an image folder', () => {
  const directory = new URL('../src/data/eras/', import.meta.url);
  const files = readdirSync(directory).filter((file) => file.endsWith('.json'));
  assert.equal(files.length, 8);
  for (const file of files) {
    const year = Number(file.replace('.json', ''));
    validateEra(JSON.parse(readFileSync(new URL(file, directory), 'utf8')), year);
    assert(readdirSync(new URL(`../public/images/cars/${year}/`, import.meta.url)).some((image) => image.endsWith('.jpeg')));
  }
});

test('selects the configured default even when it is not the first car', () => {
  const era = validateEra(withSecondCar(), 2020);
  assert.equal(era.cars.length, 2);
  assert.equal(getDefaultCar(era).slug, 'another-car');
  assert.equal(getDefaultCar(era).images[0], '/images/cars/2020/another-car.01.jpeg');
  assert.equal(getDefaultCar(era).images.length, 2);
});

test('rejects missing or multiple defaults', () => {
  const era = withSecondCar();
  era.cars[1].default = false;
  assert.throws(() => validateEra(era, 2020), /exactly one car/);
  era.cars.forEach((car) => { car.default = true; });
  assert.throws(() => validateEra(era, 2020), /exactly one car/);
});

test('rejects an empty image collection', () => {
  const era = fixture();
  era.cars[0].images = [];
  assert.throws(() => validateEra(era, 2020), /at least one image/);
});

test('rejects image paths outside the car and era naming convention', () => {
  for (const image of ['/images/cars/2010/rimac-nevera.01.jpeg', '/images/cars/2020/another-car.01.jpeg', '/images/cars/2020/rimac-nevera.01.png', '/images/cars/2020/rimac-nevera.01/../../secret.jpeg']) {
    const era = fixture();
    era.cars[0].images = [image];
    assert.throws(() => validateEra(era, 2020), /images must use/);
  }
});

test('rejects duplicate slugs and duplicate images', () => {
  const era = fixture();
  era.cars.push({ ...era.cars[0], default: false });
  assert.throws(() => validateEra(era, 2020), /duplicate car slug/);
  era.cars.pop();
  era.cars[0].images.push(era.cars[0].images[0]);
  assert.throws(() => validateEra(era, 2020), /image paths must be unique/);
});

test('rejects mismatched era and vehicle years', () => {
  const era = fixture();
  assert.throws(() => validateEra(era, 2010), /match the decade filename/);
  era.cars[0].year = 2019;
  assert.throws(() => validateEra(era, 2020), /year must fall within the era/);
});

test('requires each car field and a boolean default', () => {
  for (const field of ['name', 'engine', 'country', 'description', 'slug']) {
    const era = fixture();
    delete era.cars[0][field];
    assert.throws(() => validateEra(era, 2020));
  }
  const era = fixture();
  era.cars[0].default = 'true';
  assert.throws(() => validateEra(era, 2020), /default must be true or false/);
});

for (const [year, defaultSlug] of [[1950, 'mercedes-benz-300-sl'], [1960, 'jaguar-e-type'], [1970, 'lamborghini-countach'], [1980, 'ferrari-f40'], [1990, 'mclaren-f1'], [2000, 'porsche-carrera-gt'], [2010, 'bmw-i8'], [2020, 'rimac-nevera']]) {
test(`${year}s collection has five cars, distinct decodable photographs, costs, and complete credits`, async () => {
  const { createHash } = await import('node:crypto');
  const { default: sharp } = await import('sharp');
  const era = validateEra(JSON.parse(readFileSync(new URL(`../src/data/eras/${year}.json`, import.meta.url), 'utf8')), year);
  const credits = JSON.parse(readFileSync(new URL('../src/data/photo-credits.json', import.meta.url), 'utf8'));
  assert.equal(era.cars.length, 5);
  assert.equal(getDefaultCar(era).slug, defaultSlug);
  const hashes = new Set();
  for (const car of era.cars) {
    assert(car.images.length >= 3 && car.images.length <= 5, car.slug);
    assert(car.cost?.min > 0 && car.cost.max >= car.cost.min, car.slug);
    assert.equal(car.cost.currency, 'GBP');
    for (const image of car.images) {
      const bytes = readFileSync(new URL(`../public${image}`, import.meta.url));
      const metadata = await sharp(bytes).metadata();
      assert.equal(metadata.format, 'jpeg', image);
      assert(metadata.width >= 600 && metadata.height >= 400, image);
      const hash = createHash('sha256').update(bytes).digest('hex');
      assert(!hashes.has(hash), `Duplicate photograph: ${image}`);
      hashes.add(hash);
      const credit = credits.find((entry) => entry.path === image);
      assert(credit?.author && credit.license && credit.source && credit.changes, image);
      assert.equal(credit.car, car.slug);
      if (year >= 1970) {
        const views = year === 2020 && car.slug === 'rimac-nevera' ? ['front', 'rear', 'exterior'] : ['front', 'rear', 'interior'];
        assert.equal(credit.view, views[car.images.indexOf(image)]);
        if (credit.view === 'exterior') assert.match(credit.note, /interior photograph has not yet been sourced/);
      }
      assert(credit.source.startsWith('https://commons.wikimedia.org/wiki/File:'));
      if (credit.license.startsWith('CC BY')) assert(/^https?:\/\/creativecommons\.org\//.test(credit.licenseUrl));
    }
  }
  assert.equal(hashes.size, 15);
});

}

test('cost validation rejects invalid ranges, dates, currencies and source URLs', () => {
  const valid = { currency: 'GBP', min: 10000, max: 20000, asOf: '2026-11-02', basis: 'Good to excellent condition', sources: ['https://example.com/valuation'] };
  for (const change of [{ min: -1 }, { min: Infinity }, { min: 30000 }, { max: '20000' }, { max: NaN }, { currency: 'USD' }, { asOf: '2026-02-30' }, { asOf: 'yesterday' }, { basis: '' }, { sources: [] }, { sources: ['javascript:alert(1)'] }]) {
    const era = fixture();
    era.cars[0].cost = { ...valid, ...change };
    assert.throws(() => validateEra(era, 2020), /cost/, JSON.stringify(change));
  }
  const era = fixture();
  era.cars[0].cost = valid;
  assert.equal(validateEra(era, 2020).cars[0].cost.min, 10000);
  era.cars[0].cost = null;
  assert.equal(validateEra(era, 2020).cars[0].cost, null);
});

test('value ranges format as GBP without losing large amounts', async () => {
  const { formatCost } = await import('../src/lib/valuation.ts');
  assert.equal(formatCost({ currency: 'GBP', min: 13000, max: 23000 }), '£13,000 – £23,000');
  assert.equal(formatCost({ currency: 'GBP', min: 1100000, max: 1400000 }), '£1,100,000 – £1,400,000');
});
