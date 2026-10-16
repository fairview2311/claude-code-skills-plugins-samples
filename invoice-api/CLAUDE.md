# invoice-api

Small invoicing API for Acme Supplies Inc. TypeScript, Express 4, Vitest, Node 22.

## Commands

- `npm test` runs the test suite. `npm run typecheck` runs the TypeScript compiler.
- `npm run format` formats the code with Prettier.

## Code style

- Use single quotes and semicolons. Prettier enforces the rest.
- Money is always an integer number of cents. Never use floating-point dollars.
- Keep route handlers thin. Put logic in `src/invoices.ts`.

## IMPORTANT: never touch these

- NEVER read, print, or edit `.env`. It holds the payment gateway key.
- NEVER edit `config/tax-rates.json` without asking. Finance owns this file.
- Do not run `git push`. A human pushes after review.

## After every change

- ALWAYS run `npm run format` and `npm test` after you edit a file in `src/`.
- Do not say you are done while tests are failing.

## Adding a tax region

When I ask to add a tax region, add it to `config/tax-rates.json` with the
rate as a decimal, add a test in `test/invoices.test.ts`, and remind me to get
Finance to approve it.
