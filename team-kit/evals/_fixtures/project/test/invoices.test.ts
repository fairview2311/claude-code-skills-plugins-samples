import { describe, expect, it } from 'vitest';
import {
  calculateTotals,
  validateInvoice,
  type Invoice,
} from '../src/invoices.js';

const base: Invoice = {
  id: 'INV-0001',
  customer: 'Acme Supplies Inc.',
  region: 'US-CA',
  status: 'draft',
  items: [
    { description: 'Paper, A4, 500 sheets', quantity: 4, unitPriceCents: 899 },
    { description: 'Stapler', quantity: 1, unitPriceCents: 1450 },
  ],
};

describe('calculateTotals', () => {
  it('adds line items and applies the regional tax rate', () => {
    expect(calculateTotals(base)).toEqual({
      subtotalCents: 5046,
      taxCents: 366,
      totalCents: 5412,
    });
  });
});

describe('validateInvoice', () => {
  it('accepts a valid invoice', () => {
    expect(validateInvoice(base)).toEqual([]);
  });

  it('rejects an empty item list', () => {
    expect(validateInvoice({ ...base, items: [] })).toContain(
      'items must be a non-empty array',
    );
  });
});
