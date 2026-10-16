#!/usr/bin/env bash
set -euo pipefail
HERE="$(dirname "$0")"
bash "$HERE/../_fixtures/make-project.sh"
git switch -q -c add-discounts
git -c user.name=alex-smith -c user.email=test@example.com \
  am -q -p2 "$HERE/../_fixtures/add-discounts.patch"
