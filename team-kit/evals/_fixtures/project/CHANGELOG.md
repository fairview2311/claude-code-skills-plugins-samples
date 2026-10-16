# Changelog

All notable changes to invoice-api are documented here.

## [0.3.0] - 2026-09-30

### Added
- `POST /invoices/:id/send` marks a draft invoice as sent.
- Tax rates for Texas (`US-TX`) and Washington (`US-WA`).

### Fixed
- Totals are now rounded to the nearest cent instead of truncated.

## [0.2.0] - 2026-09-12

### Added
- `GET /invoices` lists every invoice with its totals.
