// Stop hook: before Claude finishes, format the TypeScript files in src/ and
// test/ that differ from the last commit, then run the tests. If they fail,
// Claude must keep working. Other changes, such as config/, are not checked.
import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

// Claude Code sends JSON on standard input. This hook does not need it,
// but reads it so the sender never waits.
readFileSync(0, 'utf8');
const root = process.env.CLAUDE_PROJECT_DIR;
const run = (args) =>
  spawnSync(process.execPath, args, { cwd: root, encoding: 'utf8' });
const git = (args) =>
  (spawnSync('git', args, { cwd: root, encoding: 'utf8' }).stdout ?? '')
    .split('\n')
    .filter(Boolean);

const changed = [
  ...git(['diff', '--name-only', '--relative', 'HEAD', '--', 'src', 'test']),
  ...git(['ls-files', '--others', '--exclude-standard', '--', 'src', 'test']),
].filter((file) => file.endsWith('.ts') && existsSync(join(root, file)));
if (changed.length === 0) process.exit(0);

run([
  join(root, 'node_modules/prettier/bin/prettier.cjs'),
  '--write',
  ...changed,
]);

const tests = run([join(root, 'node_modules/vitest/vitest.mjs'), 'run']);
if (tests.status !== 0) {
  const output = `${tests.stdout}${tests.stderr}`.trim().split('\n');
  const reason = [
    'The tests fail. Fix the code, or if the new behavior is intended,',
    'update the tests and say so in your answer.',
    ...output.slice(-15),
  ].join('\n');
  console.log(JSON.stringify({ decision: 'block', reason }));
}
