export interface Cost {
  currency: 'GBP';
  min: number;
  max: number;
  asOf: string;
  basis: string;
  sources: string[];
}

export interface Car {
  slug: string;
  name: string;
  engine: string;
  country: string;
  year: number;
  description: string;
  images: string[];
  default: boolean;
  cost: Cost | null;
}

export interface Era {
  year: number;
  title: string;
  description: string;
  cars: Car[];
}

export interface CarImage {
  src: string;
  alt: string;
  placeholder: boolean;
  credit?: string;
  source?: string;
  licenseUrl?: string;
  view?: string;
  note?: string;
}

export interface EraSummary {
  year: number;
  title: string;
  description: string;
  defaultCarName: string;
  image: CarImage;
}

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function text(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

/** Fail early with an actionable message instead of silently featuring the wrong car. */
export function validateEra(value: unknown, expectedYear: number): Era {
  const fail = (message: string): never => { throw new Error(`${expectedYear}.json: ${message}`); };
  if (!record(value)) return fail('expected an era object.');
  if (value.year !== expectedYear || expectedYear % 10 !== 0) return fail('year must match the decade filename.');
  if (!text(value.title) || !text(value.description)) return fail('title and description are required.');
  if (!Array.isArray(value.cars) || value.cars.length === 0) return fail('cars must contain at least one car.');
  const slugs = new Set<string>();
  for (const car of value.cars) {
    if (!record(car)) return fail('each car must be an object.');
    if (!text(car.slug) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(car.slug)) return fail('each car needs a lowercase, hyphenated slug.');
    if (slugs.has(car.slug)) return fail(`duplicate car slug: ${car.slug}.`);
    slugs.add(car.slug);
    for (const field of ['name', 'engine', 'country', 'description']) {
      if (!text(car[field])) return fail(`${car.slug}: ${field} is required.`);
    }
    if (typeof car.year !== 'number' || !Number.isInteger(car.year) || car.year < expectedYear || car.year > expectedYear + 9) return fail(`${car.slug}: year must fall within the era.`);
    if (typeof car.default !== 'boolean') return fail(`${car.slug}: default must be true or false.`);
    if (car.cost !== null) {
      const cost = car.cost;
      if (!record(cost)) return fail(`${car.slug}: cost must be an estimate object or null.`);
      if (cost.currency !== 'GBP') return fail(`${car.slug}: cost currency must be GBP.`);
      if (typeof cost.min !== 'number' || !Number.isFinite(cost.min) || cost.min <= 0 || typeof cost.max !== 'number' || !Number.isFinite(cost.max) || cost.max < cost.min) return fail(`${car.slug}: cost needs a positive, ordered min/max range.`);
      if (!text(cost.asOf) || !/^\d{4}-\d{2}-\d{2}$/.test(cost.asOf) || !Number.isFinite(Date.parse(cost.asOf)) || new Date(cost.asOf).toISOString().slice(0, 10) !== cost.asOf) return fail(`${car.slug}: cost asOf must be a valid YYYY-MM-DD date.`);
      if (!text(cost.basis)) return fail(`${car.slug}: cost basis is required.`);
      if (!Array.isArray(cost.sources) || cost.sources.length === 0 || !cost.sources.every((source: unknown) => {
        if (typeof source !== 'string') return false;
        try { return new URL(source).protocol === 'https:'; } catch { return false; }
      })) return fail(`${car.slug}: cost needs at least one HTTPS source URL.`);
    }
    if (!Array.isArray(car.images) || car.images.length === 0) return fail(`${car.slug}: images must contain at least one image path.`);
    const prefix = `/images/cars/${expectedYear}/${car.slug}.`;
    for (const image of car.images) {
      if (typeof image !== 'string' || !image.startsWith(prefix) || !/^\d{2,}\.jpeg$/.test(image.slice(prefix.length))) return fail(`${car.slug}: images must use ${prefix}nn.jpeg.`);
    }
    if (new Set(car.images).size !== car.images.length) return fail(`${car.slug}: image paths must be unique.`);
  }
  if (value.cars.filter((car) => car.default === true).length !== 1) return fail('exactly one car must have default: true.');
  return value as unknown as Era;
}

export function getDefaultCar(era: Era): Car {
  const car = era.cars.find((entry) => entry.default);
  if (!car) throw new Error(`${era.year}.json: no default car configured.`);
  return car;
}
