#!/usr/bin/env bash
# Builds a copy of invoice-api in the current (empty) eval workspace and
# commits it on main. A case's scaffold script calls this file.
set -euo pipefail
FIXTURES="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cp -R "$FIXTURES/project/." .
git init -q -b main
git add -A
git -c user.name=alex-smith -c user.email=test@example.com commit -qm "Start"
