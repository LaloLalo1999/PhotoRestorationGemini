#!/bin/bash
# Quick validation runner for the Image Restoration OpenSpec proposal
# Usage: ./validate.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/tests"

echo "🔍 Validating Image Restoration OpenSpec Proposal..."
echo ""

node validate-standalone.js
