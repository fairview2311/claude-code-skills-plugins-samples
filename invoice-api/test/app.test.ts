import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { app } from '../src/app.js';
import { resetStore } from '../src/store.js';

beforeEach(() => resetStore());

describe('POST /invoices', () => {
  it('creates a draft invoice with totals', async () => {
    const res = await request(app)
      .post('/invoices')
      .send({
        customer: 'Acme Supplies Inc.',
        region: 'US-NY',
        items: [
          { description: 'Desk lamp', quantity: 2, unitPriceCents: 2500 },
        ],
      });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      id: 'INV-0001',
      status: 'draft',
      totalCents: 5200,
    });
  });

  it('returns 400 for an invalid body', async () => {
    const res = await request(app).post('/invoices').send({});
    expect(res.status).toBe(400);
  });
});
