import type { Cost } from './catalogue';

export function formatCost(cost: Cost): string {
  const format = new Intl.NumberFormat('en-GB', { style: 'currency', currency: cost.currency, maximumFractionDigits: 0 });
  return `${format.format(cost.min)} – ${format.format(cost.max)}`;
}
