#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
JAVA_FILE="${1:-}"

if [[ -z "$JAVA_FILE" || "$JAVA_FILE" != *.java ]]; then
  echo "Usage: bash scripts/project-id.sh path/to/Project.java" >&2
  exit 1
fi

if [[ ! -f "$JAVA_FILE" ]]; then
  echo "Java source not found: $JAVA_FILE" >&2
  exit 1
fi

CATALOG="$ROOT_DIR/data/projects.json"
CLASS_NAME="$(
  grep -E -m 1 -o 'public[[:space:]]+(abstract[[:space:]]+|final[[:space:]]+)?(class|record|enum)[[:space:]]+[A-Za-z_$][A-Za-z0-9_$]*' "$JAVA_FILE" \
    | sed -E 's/.*[[:space:]](class|record|enum)[[:space:]]+([A-Za-z_$][A-Za-z0-9_$]*)/\2/' \
    || true
)"

BASE_ID="${CLASS_NAME:-$(basename "$JAVA_FILE" .java)}"
USED_IDS="$(python -c '
import json
import sys

with open(sys.argv[1], encoding="utf-8") as catalog_file:
    catalog = json.load(catalog_file)
print("\n".join(project["id"] for project in catalog))
' "$CATALOG")"

PROJECT_ID="$BASE_ID"
SUFFIX=2
while printf '%s\n' "$USED_IDS" | grep -Fxq -- "$PROJECT_ID"; do
  PROJECT_ID="${BASE_ID}${SUFFIX}"
  SUFFIX=$((SUFFIX + 1))
done

printf '%s\n' "$PROJECT_ID"
