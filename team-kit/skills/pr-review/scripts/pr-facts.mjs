// Prints facts about the current branch for the pr-review skill.
// Usage: node pr-facts.mjs [base-branch]   (default: main)
import { execFileSync } from 'node:child_process';

const base = process.argv[2] || 'main';
const git = (...args) =>
  execFileSync('git', args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  }).trim();

let files;
try {
  files = git('diff', '--relative', '--name-only', `${base}...HEAD`)
    .split('\n')
    .filter(Boolean);
} catch {
  console.log(
    `Could not compare with "${base}". Ask the user which branch to compare with.`,
  );
  process.exit(0);
}

const branch = git('rev-parse', '--abbrev-ref', 'HEAD');
const tests = files.filter((f) => f.startsWith('test/'));
console.log(`- Branch: ${branch}`);
console.log(`- Base branch: ${base}`);
console.log(`- Changed files (${files.length}): ${files.join(', ') || 'none'}`);
console.log(
  `- Test files changed: ${tests.length ? tests.join(', ') : 'none'}`,
);
console.log(
  `- Tax table changed: ${files.includes('config/tax-rates.json') ? 'YES, flag for Finance' : 'no'}`,
);
