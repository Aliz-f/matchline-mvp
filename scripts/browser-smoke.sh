#!/usr/bin/env bash
set -euo pipefail

if ! command -v chromium >/dev/null 2>&1; then
  echo "Chromium is required for browser smoke checks." >&2
  exit 1
fi

npm run build >/dev/null
vite preview --host 127.0.0.1 --port 4317 --strictPort >/tmp/matchline-preview.log 2>&1 &
preview_pid=$!
trap 'kill "$preview_pid" 2>/dev/null || true' EXIT

ready=0
for _ in {1..20}; do
  if curl -fsS http://127.0.0.1:4317/ >/dev/null 2>&1; then
    ready=1
    break
  fi
  sleep 0.25
done

if [ "$ready" -ne 1 ]; then
  cat /tmp/matchline-preview.log >&2
  exit 1
fi

for route in / /matches /matches/m01 /stadiums /how-it-works; do
  dom=$(chromium --headless --no-sandbox --disable-gpu --virtual-time-budget=1500 --dump-dom "http://127.0.0.1:4317$route")
  printf '%s' "$dom" | grep -q 'id="root"'
done

echo "Browser smoke checks passed."
