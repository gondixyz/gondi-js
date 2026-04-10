#!/usr/bin/env bash
# Manages GitHub Issues for scheduled dependency audit results.
# Called by .github/workflows/scheduled-audit.yaml after bun audit runs.
#
# Required env vars:
#   BRANCH          — branch that was audited (e.g. "main")
#   AUDIT_OUTPUT    — full stdout/stderr from bun audit
#   AUDIT_EXIT_CODE — exit code from bun audit (0 = clean, non-zero = vulnerabilities)
#
# Uses GITHUB_SERVER_URL, GITHUB_REPOSITORY, GITHUB_RUN_ID from the runner.

set -euo pipefail

LABEL="security"
BRANCH_LABEL="audit:${BRANCH}"
TITLE="Security: dependency vulnerabilities found on \`${BRANCH}\`"
RUN_URL="${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}"
DATE=$(date -u +%Y-%m-%d)

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
AUDIT_DIR="${SCRIPT_DIR}/../audit"

ensure_labels() {
  gh label create "$LABEL" --color d73a4a --description "Security vulnerability" --force 2>/dev/null || true
  gh label create "$BRANCH_LABEL" --color 0075ca --description "Audit findings for ${BRANCH} branch" --force 2>/dev/null || true
}

find_open_issue() {
  gh issue list --label "$LABEL,$BRANCH_LABEL" --state open --limit 1 --json number --jq '.[0].number // empty'
}

build_ignored_cves_table() {
  local ignore_file="${AUDIT_DIR}/ignored-cves"
  echo "| CVE | Reason |"
  echo "|-----|--------|"
  local reason=""
  while IFS= read -r line; do
    if [[ "$line" =~ ^#\ (.+) ]]; then
      reason="${BASH_REMATCH[1]}"
    elif [[ -n "$line" && ! "$line" =~ ^# ]]; then
      echo "| ${line} | ${reason} |"
    fi
  done < "$ignore_file"
}

build_issue_body() {
  local template
  template=$(<"${AUDIT_DIR}/issue-body.md")
  local ignored_table
  ignored_table=$(build_ignored_cves_table)

  template="${template//\{\{BRANCH\}\}/$BRANCH}"
  template="${template//\{\{RUN_URL\}\}/$RUN_URL}"
  template="${template//\{\{DATE\}\}/$DATE}"
  template="${template//\{\{IGNORED_CVES_TABLE\}\}/$ignored_table}"
  template="${template//\{\{AUDIT_OUTPUT\}\}/$AUDIT_OUTPUT}"

  printf '%s\n' "$template"
}

if [[ "$AUDIT_EXIT_CODE" != "0" ]]; then
  echo "Vulnerabilities found on ${BRANCH}, managing issue..."
  ensure_labels

  BODY=$(build_issue_body)
  EXISTING=$(find_open_issue)

  if [[ -n "$EXISTING" ]]; then
    gh issue edit "$EXISTING" --body "$BODY"
    echo "Updated existing issue #${EXISTING}"
  else
    NEW_ISSUE=$(gh issue create --title "$TITLE" --body "$BODY" --label "$LABEL,$BRANCH_LABEL")
    echo "Created issue: ${NEW_ISSUE}"
  fi
else
  echo "No vulnerabilities on ${BRANCH}, checking for open issues to close..."
  EXISTING=$(find_open_issue)

  if [[ -n "$EXISTING" ]]; then
    gh issue close "$EXISTING" --comment "All vulnerabilities resolved as of ${DATE}. Closing.

[Workflow run](${RUN_URL})"
    echo "Closed resolved issue #${EXISTING}"
  else
    echo "No open issue to close."
  fi
fi
