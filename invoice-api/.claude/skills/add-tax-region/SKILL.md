---
description: Adds a sales tax region to config/tax-rates.json with a
  matching test, then reminds the user that Finance must approve it.
  Use when the user asks to add or change a tax region or tax rate.
argument-hint: "[region-code] [rate]"
arguments: [region, rate]
disable-model-invocation: true
---

Add the tax region $region with the rate $rate.

1. Check the input. The region code looks like `US-OR`. The rate is a
   decimal between 0 and 0.15, such as `0.0725`. If either is missing
   or invalid, stop and ask the user. Do not guess a rate.
2. Add the region to `config/tax-rates.json`. Keep the file on one line
   and keep the existing regions unchanged.
3. Add a test to `test/invoices.test.ts` that calculates the totals of
   a one-item invoice in the new region.
4. Run `npm test` and show the result.
5. End with this line, exactly: "Finance must approve this tax table
   change before it is merged."
