"""Markdown catalog for ``org explain <path>``.

Each entry is verbatim markdown. Keys are command-path tuples. The empty tuple
and ``("org",)`` both resolve to the root entry.

Keep bodies self-contained: an agent reading one entry should get enough
context without chaining reads.
"""

from __future__ import annotations

_ROOT = """\
# org

The AgentCulture org site — source of the web presence published to
AgentCulture.org. This CLI is the site's operator surface: it stays repo-local
(`uv run org …`) and is never published to PyPI. The repo also carries this
agent's mesh identity (`culture.yaml` + `AGENTS.colleague.md`, since it runs
`backend: colleague`) and the guildmaster skill kit under `.claude/skills/`.

The site itself is not built yet — the build brief is
<https://github.com/agentculture/org/issues/2>.

## Verbs

- `org whoami` — identity probe from `culture.yaml`.
- `org learn` — structured self-teaching prompt.
- `org explain <path>` — markdown docs for any noun/verb.
- `org overview` — descriptive snapshot of the agent.
- `org doctor` — check the agent-identity invariants.
- `org cli overview` — describe the CLI surface.

## Exit-code policy

- `0` success
- `1` user-input error
- `2` environment / setup error
- `3+` reserved

## See also

- `org explain whoami`
- `org explain doctor`
"""

_WHOAMI = """\
# org whoami

Reports the agent's identity from `culture.yaml`: nick (`suffix`), backend,
served model, and the package version. Read-only.

## Usage

    org whoami
    org whoami --json
"""

_LEARN = """\
# org learn

Prints a structured self-teaching prompt covering purpose, command map,
exit-code policy, `--json` support, and the `explain` pointer.

## Usage

    org learn
    org learn --json
"""

_EXPLAIN = """\
# org explain <path>

Prints markdown documentation for any noun/verb path. Unlike `--help` (terse,
positional), `explain` is global and addressable by path.

## Usage

    org explain org
    org explain whoami
    org explain --json <path>
"""

_OVERVIEW = """\
# org overview

Read-only descriptive snapshot of the agent: identity (from `culture.yaml`), the
verb surface, and the sibling-pattern artifacts this repo carries. Accepts an
ignored `target` so a stray path never hard-fails.

## Usage

    org overview
    org overview --json
"""

_DOCTOR = """\
# org doctor

Checks the agent-identity invariants `steward doctor` verifies:
prompt-file-present and backend-consistency (`colleague` → `AGENTS.colleague.md`), plus a
skills-present check. Exits 1 when unhealthy.

## Usage

    org doctor
    org doctor --json
"""

_CLI = """\
# org cli

Noun group for CLI-surface introspection. `cli overview` describes the CLI
itself (distinct from the global `overview`, which describes the agent).

## Usage

    org cli overview
    org cli overview --json
"""


ENTRIES: dict[tuple[str, ...], str] = {
    (): _ROOT,
    ("org",): _ROOT,
    ("whoami",): _WHOAMI,
    ("learn",): _LEARN,
    ("explain",): _EXPLAIN,
    ("overview",): _OVERVIEW,
    ("doctor",): _DOCTOR,
    ("cli",): _CLI,
    ("cli", "overview"): _CLI,
}
