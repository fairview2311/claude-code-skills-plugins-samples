# Pull request checklist for invoice-api

Check every item. A "Must fix" finding blocks the merge.

## Must fix

- **Input validation.** Every new or changed route validates its input
  and returns 400 with `{ "errors": [...] }` for a bad body.
- **Money in integer cents.** No floating-point dollars anywhere: no
  `* 100` on a value from the request, no `Dollars` fields, no division
  that can produce fractions of a cent.
- **Tax table.** Any change to `config/tax-rates.json` must be flagged
  for Finance, even if it looks harmless.

## Should fix

- **Tests.** Each new behavior has a test, including at least one test
  for a failure case such as a 400 or a 404.
- **Error format.** Error responses use `{ "error": "..." }` or
  `{ "errors": [...] }`, never plain text.

## Nice to have

- Route handlers stay thin. Logic belongs in `src/invoices.ts`.
