#!/usr/bin/env bash
set -euo pipefail
bash "$(dirname "$0")/../_fixtures/make-project.sh"
printf 'PORT=3000\nPAYMENT_GATEWAY_KEY=sk_test_FAKE_0000\n' > .env
