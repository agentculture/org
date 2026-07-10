"""``org learn`` — the learnability affordance.

Prints a structured self-teaching prompt. Must satisfy the agent-first rubric:
>=200 chars and mention purpose, command map, exit codes, --json, and explain.
"""

from __future__ import annotations

import argparse

from org import __version__
from org.cli._output import emit_result

_TEXT = """\
org — the AgentCulture org site agent.

Purpose
-------
Source of the web presence published to AgentCulture.org. This CLI is the site's
operator surface: it stays repo-local (run it as `uv run org`) and is never
published to PyPI. The repo also carries this agent's mesh identity
(culture.yaml + AGENTS.colleague.md, since it runs backend: colleague) and the
guildmaster skill kit under .claude/skills/. The site itself is not built yet —
the build brief is https://github.com/agentculture/org/issues/2.

Commands
--------
  org whoami             Identity from culture.yaml.
  org learn              This self-teaching prompt.
  org explain <path>...  Markdown docs for any noun/verb path.
  org overview           Descriptive snapshot of the agent.
  org doctor             Check the agent-identity invariants.
  org cli overview       Describe the CLI surface itself.

Machine-readable output
-----------------------
Every command supports --json. Errors in JSON mode emit
{"code", "message", "remediation"} to stderr. Stdout and stderr never mix.

Exit-code policy
----------------
  0 success
  1 user-input error (bad flag, bad path, missing arg)
  2 environment / setup error
  3+ reserved

More detail
-----------
  org explain org
"""


def _as_json_payload() -> dict[str, object]:
    return {
        "tool": "org",
        "version": __version__,
        "purpose": "Source of the AgentCulture.org web presence; this CLI is its operator surface.",
        "commands": [
            {"path": ["whoami"], "summary": "Identity probe from culture.yaml."},
            {"path": ["learn"], "summary": "Self-teaching prompt."},
            {"path": ["explain"], "summary": "Markdown docs by path."},
            {"path": ["overview"], "summary": "Descriptive snapshot of the agent."},
            {"path": ["doctor"], "summary": "Check the agent-identity invariants."},
            {"path": ["cli", "overview"], "summary": "Describe the CLI surface."},
        ],
        "exit_codes": {
            "0": "success",
            "1": "user-input error",
            "2": "environment/setup error",
        },
        "json_support": True,
        "explain_pointer": "org explain <path>",
    }


def cmd_learn(args: argparse.Namespace) -> int:
    if getattr(args, "json", False):
        emit_result(_as_json_payload(), json_mode=True)
    else:
        emit_result(_TEXT, json_mode=False)
    return 0


def register(sub: argparse._SubParsersAction) -> None:
    p = sub.add_parser(
        "learn",
        help="Print a structured self-teaching prompt for agent consumers.",
    )
    p.add_argument("--json", action="store_true", help="Emit structured JSON.")
    p.set_defaults(func=cmd_learn)
