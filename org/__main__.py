"""Entry point for ``python -m org``."""

from __future__ import annotations

import sys

from org.cli import main

if __name__ == "__main__":
    sys.exit(main())
