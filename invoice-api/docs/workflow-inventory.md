# Workflow inventory

Where each section of `CLAUDE.md` goes as the workflows move out of it.

| Instruction | Becomes | Why |
|---|---|---|
| Commands and Code style | stays | Every session needs the commands and the money and style rules. |
| Never touch these | hook | A `PreToolUse` hook can block reading `.env` and `git push` every time, not just most times, and ask a person before the tax table is edited. (Chapter 5) |
| After every change | hook | `PostToolUse` and `Stop` hooks can run the formatter and the tests without relying on Claude to remember. (Chapter 5) |
| Writing release notes | skill | A procedure for one task. The `customer-release-notes` skill loads it only when release notes come up. (Chapter 2) |
| Reviewing a pull request | skill + subagent | A procedure with long output. The `pr-review` skill hands the reading to a `reviewer` subagent. (Chapters 3 and 6) |
| Adding a tax region | skill | Changes a file Finance owns, so only a person may start the `add-tax-region` skill. (Chapter 4) |
| Explaining an endpoint | deleted | Claude already reads the route and its tests before it explains an endpoint. |
