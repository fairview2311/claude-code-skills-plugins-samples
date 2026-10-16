import taxRates from '../config/tax-rates.json' with { type: 'json' };

export interface LineItem {
  description: string;
  quantity: number;
  unitPriceCents: number;
}

export interface Invoice {
  id: string;
  customer: string;
  region: keyof typeof taxRates;
  items: LineItem[];
  status: 'draft' | 'sent' | 'paid';
}

export interface InvoiceTotals {
  subtotalCents: number;
  taxCents: number;
  totalCents: number;
}

export function calculateTotals(invoice: Invoice): InvoiceTotals {
  const subtotalCents = invoice.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPriceCents,
    0,
  );
  const rate = taxRates[invoice.region];
  if (rate === undefined) {
    throw new Error(`Unknown tax region: ${invoice.region}`);
  }
  const taxCents = Math.round(subtotalCents * rate);
  return { subtotalCents, taxCents, totalCents: subtotalCents + taxCents };
}

export function validateInvoice(input: unknown): string[] {
  const errors: string[] = [];
  const inv = input as Partial<Invoice>;
  if (!inv || typeof inv !== 'object') return ['Body must be a JSON object'];
  if (!inv.customer) errors.push('customer is required');
  if (!inv.region || !(inv.region in taxRates))
    errors.push('region is invalid');
  if (!Array.isArray(inv.items) || inv.items.length === 0) {
    errors.push('items must be a non-empty array');
  } else {
    inv.items.forEach((item, i) => {
      if (!(item.quantity > 0)) errors.push(`items[${i}].quantity must be > 0`);
      if (!(item.unitPriceCents >= 0)) {
        errors.push(`items[${i}].unitPriceCents must be >= 0`);
      }
    });
  }
  return errors;
}
