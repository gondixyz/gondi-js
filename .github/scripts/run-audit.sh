#!/usr/bin/env bash
# Runs `bun audit` with the project's ignored CVE list and emits results
# to GITHUB_OUTPUT for downstream steps.
#
# Reads ignored CVEs from .github/audit/ignored-cves (one GHSA ID per line, # comments allowed).
# Sets outputs:
#   exit_code — bun audit exit code
#   output    — full stdout/stderr from bun audit

set +e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
IGNORE_FILE="${SCRIPT_DIR}/../audit/ignored-cves"

IGNORE_FLAGS=()
while IFS= read -r line; do
  if [[ -n "$line" && ! "$line" =~ ^# ]]; then
    IGNORE_FLAGS+=("--ignore=${line}")
  fi
done < "$IGNORE_FILE"

AUDIT_OUTPUT=$(bun audit "${IGNORE_FLAGS[@]}" 2>&1)
AUDIT_EXIT=$?

echo "exit_code=$AUDIT_EXIT" >> "$GITHUB_OUTPUT"
{
  echo "output<<AUDIT_EOF"
  echo "$AUDIT_OUTPUT"
  echo "AUDIT_EOF"
} >> "$GITHUB_OUTPUT"

if [ $AUDIT_EXIT -ne 0 ]; then
  echo "::warning::Vulnerabilities found"
else
  echo "No new vulnerabilities found"
fi
