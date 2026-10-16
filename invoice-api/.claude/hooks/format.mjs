// PostToolUse hook: formats TypeScript files in src/ and test/ after each edit.
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

const input = JSON.parse(readFileSync(0, 'utf8'));
const file = (input.tool_input?.file_path ?? '').replaceAll('\\', '/');
if (!/\/(src|test)\/.+\.ts$/.test(file)) process.exit(0);

const prettier = join(
  process.env.CLAUDE_PROJECT_DIR,
  'node_modules/prettier/bin/prettier.cjs',
);
const result = spawnSync(process.execPath, [prettier, '--write', file], {
  encoding: 'utf8',
});
if (result.status !== 0) {
  console.error(`Prettier could not format ${file}:\n${result.stderr}`);
  process.exit(2);
}
