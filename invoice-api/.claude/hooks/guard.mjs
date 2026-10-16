// PreToolUse hook: blocks .env and git push, and asks before the tax table changes.
// The checks are simple text matches that err on the side of blocking or asking.
import { readFileSync } from 'node:fs';

const input = JSON.parse(readFileSync(0, 'utf8'));
const tool = input.tool_name;
const args = input.tool_input ?? {};
const path = (args.file_path ?? args.path ?? '').replaceAll('\\', '/');
const glob = args.glob ?? '';
const command = args.command ?? '';

function decide(decision, reason) {
  const hookSpecificOutput = {
    hookEventName: 'PreToolUse',
    permissionDecision: decision,
    permissionDecisionReason: reason,
  };
  console.log(JSON.stringify({ hookSpecificOutput }));
  process.exit(0);
}

// .env and .env.local, .env.production, ... but not .env.example
const secretFile = /(^|\/)\.env(\.(?!example$)[\w.-]+)?$/;
const secretWord = /(^|[^\w.-])\.env(\.(?!example\b)[\w.-]+)?(?![\w.-])/;
if (
  secretFile.test(path) ||
  (glob.includes('.env') && !glob.includes('example')) ||
  secretWord.test(command)
) {
  decide(
    'deny',
    '.env holds the payment gateway key. Do not read, print, or edit it.',
  );
}

// git push, also with options before it, such as git -C . push
if (/\bgit(\s+-\S+(\s+[^\s-]\S*)?)*\s+push\b/.test(command)) {
  decide('deny', 'A person pushes after review. Do not run git push.');
}

const taxTable = 'config/tax-rates.json';
// A plain read: every part of the command, split at ; && || and |,
// starts with a read-only command, and nothing redirects into a file.
const readCommand =
  /^\s*(cat|grep|head|tail|echo|ls|wc|git (diff|show|log|status))\b/;
const readsOnly =
  !/[>`$]/.test(command) &&
  command
    .split(/;|&&|\|\||\|/)
    .every((part) => !part.trim() || readCommand.test(part));
const editsFile = tool === 'Edit' || tool === 'Write';
if (
  (editsFile && path.endsWith(`/${taxTable}`)) ||
  (command.includes('tax-rates.json') && !readsOnly)
) {
  decide(
    'ask',
    'Finance owns config/tax-rates.json. Approve only if Finance agreed to this change.',
  );
}
