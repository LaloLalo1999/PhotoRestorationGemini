#!/usr/bin/env bash
set -euo pipefail

echo "======================================"
echo "OpenSpec Validation Test Suite"
echo "======================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

cd "$(dirname "$0")"

echo "Running markdown linting..."
if bun run lint-markdown.ts; then
    echo -e "${GREEN}✓ Markdown linting passed${NC}"
else
    echo -e "${RED}✗ Markdown linting failed${NC}"
    exit 1
fi

echo ""
echo "Running validation tests..."
if bun test; then
    echo -e "${GREEN}✓ All validation tests passed${NC}"
    echo ""
    echo "======================================"
    echo "Summary:"
    echo "- File structure: ✓"
    echo "- Cross-document consistency: ✓"
    echo "- Requirement coverage: ✓"
    echo "- Scenario quality: ✓"
    echo "- Design quality: ✓"
    echo "======================================"
else
    echo -e "${RED}✗ Some validation tests failed${NC}"
    exit 1
fi