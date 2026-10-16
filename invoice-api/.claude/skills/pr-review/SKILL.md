---
description: Reviews the current branch against the team's pull
  request checklist and reports findings by severity. Use when the
  user asks to review a PR, a branch, or their changes before merging.
when_to_use: For example "review this PR", "look over my branch
  against develop", or "anything to fix before I merge?"
argument-hint: "[base-branch]"
arguments: [base]
allowed-tools: Bash(node ${CLAUDE_SKILL_DIR}/scripts/pr-facts.mjs *)
---

## Facts about this branch

!`node ${CLAUDE_SKILL_DIR}/scripts/pr-facts.mjs $base`

## Your task

Review the changes in this branch compared with the base branch above.

1. Read the full diff with `git diff <base>...HEAD`, using the base
   branch from the facts.
2. Go through every item in [checklist.md](checklist.md). Read it now.
3. Report findings in three groups: "Must fix", "Should fix", and
   "Nice to have". For each finding, give the file, the line, and one
   sentence on how to fix it.
4. If a group is empty, write "None." under it. Do not change any files.
