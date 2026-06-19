#!/bin/bash
set -euo pipefail

# SessionStart hook — surfaces open TODO items at the start of every Claude Code session.
# Stop the nag by removing the SessionStart block from .claude/settings.json (or delete TODO.md).

TODO_FILE="${CLAUDE_PROJECT_DIR:-$(pwd)}/TODO.md"

if [ -f "$TODO_FILE" ]; then
  echo "================================================================="
  echo "  Open TODO — items needing YOUR action (Tal, not Claude)"
  echo "  Source: TODO.md · Edit that file to update · Delete the"
  echo "  SessionStart block in .claude/settings.json to stop the nag."
  echo "================================================================="
  echo ""
  cat "$TODO_FILE"
  echo ""
  echo "================================================================="
  echo "  End of TODO list."
  echo "================================================================="
else
  echo "TODO.md not found at $TODO_FILE — nothing to nag about."
  echo "Create one in the repo root to enable the session-start reminder."
fi
