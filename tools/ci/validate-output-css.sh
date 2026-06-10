#!/usr/bin/env bash

set -euo pipefail

FILE="dist/lib/core.css"

if [ ! -f "$FILE" ]; then
  echo "❌ File not found: $FILE"
  exit 1
fi

# Prefix-based allow list (starts with)
ALLOWED_PREFIXES=(
  vc-
  i-
  uno-
  vetro-
  sonner-
  theme-
)

# Exact match allow list (full selector without dot)
ALLOWED_CLASSES=(
  "form-main-input"
  "h2"
  "h3"
  "h4"
  "h6"
  "outline"
  "px"
  "static"
  "visible"
  "with-radius"
  "dark"
  "tab"
  "ms"
  "h1"
  "h5"
  "border"
  "transform"
  "transition"
  "ease"
  "invert"
  "table"
  "table-caption"
  "table-cell"
  "table-row"
  "bg-accent"
  "bg-muted"
  "bg-secondary"
  "text-accent-foreground"
  "text-muted-foreground"
  "text-secondary-foreground"
  "border-secondary"
  "-ml-4"
  "5"
  "bg-border"
  "bg-input"
  "bg-primary"
  "flex"
  "font-head"
  "inline-flex"
  "max-w-2xl"
  "max-w-fit"
  "max-w-lg"
  "max-w-md"
  "max-w-sm"
  "mb-2"
  "mr-2"
  "outline-muted"
  "overflow-hidden"
  "p-1"
  "p-2"
  "p-3"
  "p-4"
  "pl-4"
  "pt-4"
  "rotate-180"
  "rounded-full"
  "shrink-0"
  "size-2"
  "size-4"
  "size-5"
  "size-6"
  "sr-only"
  "text-blue-300"
  "text-foreground"
  "text-gray-400"
  "text-green-300"
  "text-green-400"
  "text-purple-300"
  "text-sm"
  "text-yellow-300"
  "transition-colors"
  "grid"
  "pie"
)

# Extract `.class(.class)* {`
matches=$(grep -oE '\.[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\s*\{' "$FILE" \
  | sed 's/[[:space:]]*{//' \
  | sed 's/^\.//')

invalid=()

for cls in $matches; do

  allowed=false

  # Check exact allow list
  for safe in "${ALLOWED_CLASSES[@]}"; do
    if [[ "$cls" == "$safe" ]]; then
      allowed=true
      break
    fi
  done

  # Check prefix allow list
  if [ "$allowed" = false ]; then
    for prefix in "${ALLOWED_PREFIXES[@]}"; do
      if [[ "$cls" == "$prefix"* ]]; then
        allowed=true
        break
      fi
    done
  fi

  # If not allowed → mark invalid
  if [ "$allowed" = false ]; then
    invalid+=("$cls")
  fi

done

# Remove duplicates
unique_invalid=$(printf "%s\n" "${invalid[@]+"${invalid[@]}"}" | sort -u)

if [ -n "$unique_invalid" ]; then
  echo "❌ Invalid raw class selectors found:"
  echo ""

  while IFS= read -r cls; do
    echo "  • .$cls"
  done <<< "$unique_invalid"

  echo ""
  echo "👉 Only compiled/allowed selectors should exist."

  exit 1
fi

echo "✅ CSS check passed"
