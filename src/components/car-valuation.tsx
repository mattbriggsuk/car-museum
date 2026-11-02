import type { Cost } from '@/lib/catalogue';
import { formatCost } from '@/lib/valuation';

export function CarValuation({ cost }: { cost: Cost | null }) {
  if (!cost) return null;
  const date = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(cost.asOf));
  return (
    <section className="car-valuation" aria-labelledby="valuation-heading">
      <div className="valuation-summary">
        <h2 id="valuation-heading">Estimated value today</h2>
        <p className="valuation-range">{formatCost(cost)}</p>
        <p className="valuation-date">GBP · Estimate as of <time dateTime={cost.asOf}>{date}</time></p>
      </div>
      <div className="valuation-details">
        <p className="valuation-basis">{cost.basis}</p>
        <div className="valuation-sources">{cost.sources.map((source, index) => <a key={source} href={source}>Valuation source{cost.sources.length > 1 ? ` ${index + 1}` : ''} ↗</a>)}</div>
      </div>
    </section>
  );
}
