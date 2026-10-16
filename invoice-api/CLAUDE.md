# invoice-api

Small invoicing API for Acme Supplies Inc. TypeScript, Express 4, Vitest, Node 22.

## Commands

- `npm test` runs the test suite. `npm run typecheck` runs the TypeScript compiler.
- `npm run format` formats the code with Prettier.

## Code style

- Use single quotes and semicolons. Prettier enforces the rest.
- Money is always an integer number of cents. Never use floating-point dollars.
- Keep route handlers thin. Put logic in `src/invoices.ts`.
