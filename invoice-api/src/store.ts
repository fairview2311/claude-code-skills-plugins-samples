import type { Invoice } from './invoices.js';

const invoices = new Map<string, Invoice>();
let nextId = 1;

export function createInvoice(data: Omit<Invoice, 'id' | 'status'>): Invoice {
  const invoice: Invoice = {
    ...data,
    id: `INV-${String(nextId++).padStart(4, '0')}`,
    status: 'draft',
  };
  invoices.set(invoice.id, invoice);
  return invoice;
}

export function getInvoice(id: string): Invoice | undefined {
  return invoices.get(id);
}

export function listInvoices(): Invoice[] {
  return [...invoices.values()];
}

export function markSent(id: string): Invoice | undefined {
  const invoice = invoices.get(id);
  if (invoice && invoice.status === 'draft') invoice.status = 'sent';
  return invoice;
}

export function resetStore(): void {
  invoices.clear();
  nextId = 1;
}
