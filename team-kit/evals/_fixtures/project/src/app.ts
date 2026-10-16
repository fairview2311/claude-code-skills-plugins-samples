import express from 'express';
import { calculateTotals, validateInvoice } from './invoices.js';
import { createInvoice, getInvoice, listInvoices, markSent } from './store.js';

export const app = express();
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/invoices', (_req, res) => {
  res.json(listInvoices().map((inv) => ({ ...inv, ...calculateTotals(inv) })));
});

app.post('/invoices', (req, res) => {
  const errors = validateInvoice(req.body);
  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }
  const invoice = createInvoice(req.body);
  res.status(201).json({ ...invoice, ...calculateTotals(invoice) });
});

app.get('/invoices/:id', (req, res) => {
  const invoice = getInvoice(req.params.id);
  if (!invoice) {
    res.status(404).json({ error: 'Invoice not found' });
    return;
  }
  res.json({ ...invoice, ...calculateTotals(invoice) });
});

app.post('/invoices/:id/send', (req, res) => {
  const invoice = markSent(req.params.id);
  if (!invoice) {
    res.status(404).json({ error: 'Invoice not found' });
    return;
  }
  res.json(invoice);
});
