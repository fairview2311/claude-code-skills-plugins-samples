# Claude Code Skills & Plugins: companion repository

<img src=".github/book-cover.jpg" alt="Cover of Claude Code Skills & Plugins: Turn Your Team's Best Workflows into Skills, Hooks and Subagents That Trigger Reliably, Then Test and Ship Them as Plugins" width="200" align="right">

Code for *Claude Code Skills & Plugins* by Toru Hayase (Claude Code in Practice, Book 1). The book turns the instructions your team keeps retyping into skills, hooks, and a subagent that run when they should, then tests and ships them as one plugin.

You start with a small TypeScript API and a crowded `CLAUDE.md`, and end with `team-kit`, a plugin that contains:

- skills for procedures, written so that Claude picks them when it should
- hooks for rules that must hold on every tool call
- a subagent for heavy reading that should not fill your conversation
- evals with `claude plugin eval` that compare runs with and without the plugin, and run again in GitHub Actions
- a private marketplace, so teammates get the plugin when they open the project

Every command in the book was run on Claude Code 2.1.295. Every file the book asks you to create is in this repository at that chapter's tag, except the settings that name your own GitHub repository.

## Get the book

- Kindle: https://www.amazon.com/dp/B0H764GFX3
- Paperback: https://www.amazon.com/dp/B0HMNRLT8T

## What you build, chapter by chapter

| Chapter | Tag | What you add |
|---|---|---|
| 1. Where Your Workflows Leak | `ch01` | An inventory of your repeated requests, and where each one belongs |
| 2. Your First Skill That Actually Triggers | `ch02` | `customer-release-notes`, a skill that triggers reliably |
| 3. Skills That Carry Files, Scripts, and Arguments | `ch03` | `pr-review`, a skill with a checklist, a script, and an argument |
| 4. Decide Who Can Run a Skill | `ch04` | `add-tax-region`, a skill that only a person can start |
| 5. Hooks: Rules Claude Cannot Skip | `ch05` | Three hooks: a guard for secrets and the tax table, a formatter, and a test check |
| 6. Subagents for the Heavy Jobs | `ch06` | A read-only `reviewer` subagent that runs the review on a cheaper model |
| 7. Bundle Everything into a Plugin | `ch07` | The `team-kit` plugin, with a setting each user can fill in |
| 8. Prove It Works with Plugin Evals | `ch08` | Five eval cases that compare the plugin with no plugin |
| 9. Ship It Through Your Own Marketplace | `ch09` | `.claude-plugin/marketplace.json` and a project setting that turns the plugin on |
| 10. Keep It Alive: Versions, Updates, and Fixes | `ch10` | Version 1.0.0, auto-update for teammates, and a GitHub Actions workflow that runs the evals |

## Get started

You need Claude Code 2.1.295 or later, signed in, Node.js 22 or later, and git 2.31 or later. On Windows, install Git for Windows, which includes Git Bash. Chapter 8 runs in WSL2 on Windows, because plugin evals need a sandbox that native Windows does not have.

```bash
git clone https://github.com/fairview2311/claude-code-skills-plugins-samples.git
cd claude-code-skills-plugins-samples/invoice-api
npm install
npm test
```

`npm test` ends with `Tests  5 passed (5)`. Then start Claude Code in the `invoice-api` folder and follow Chapter 1.

## How this repository is organized

- `main` is the starting point: invoice-api with its long `CLAUDE.md`, before any skill or hook. The `start` tag marks the same code.
- Tags `ch01` to `ch10` mark the end of each chapter.
- `solutions` is the finished state at the end of Chapter 10.

```text
invoice-api/                      the TypeScript and Express API you work in
patches/                          the change you review in Chapter 3
team-kit/                         the plugin (from Chapter 7 on)
.claude-plugin/marketplace.json   the catalog (from Chapter 9 on)
```

From the `invoice-api` folder, compare your work with the end of a chapter, or take one file from it:

```bash
git diff ch05 -- .claude
git checkout ch05 -- .claude/settings.json
```

Your own commits stay in your clone. The book never asks you to push to this repository; Chapter 9 adds a private repository of your own.

## Try the finished plugin

To see where the book ends up, switch to the finished state and open it in Claude Code:

```bash
git switch solutions
cd invoice-api
npm install
claude
```

Select **Yes, I trust this folder**. The folder's `.claude/settings.json` names this repository's `acme-tools` marketplace and turns `team-kit` on, so Claude Code adds the marketplace for you. Exit, install the plugin once for yourself, and start Claude Code again:

```bash
claude plugin install team-kit@acme-tools --scope local
```

`/skills` now lists the three `team-kit:` skills. To remove the plugin later, run `claude plugin uninstall team-kit@acme-tools --scope local`.

`team-kit` is built for invoice-api: its hooks guard `config/tax-rates.json` and `.env`, and its review checklist is for an Express API. To look at it from another project anyway, add the marketplace by hand with `/plugin marketplace add fairview2311/claude-code-skills-plugins-samples#solutions`.

## Problems and questions

If a command in the book prints something different on a newer version of Claude Code, or a file here does not match the text, please open an issue with the chapter, the command, and what you saw.

## License

The code in this repository is released under the MIT License. See [LICENSE](LICENSE).
