# org

The AgentCulture org site — source of the web presence published to AgentCulture.org. Replaces the deleted landing-page repo. Not distributed on PyPI: the CLI stays repo-local; the deliverable is the published site.

## What you get

- **An agent-first CLI** cited from [teken](https://github.com/agentculture/teken)
  (`afi-cli`) — the runtime package has no third-party dependencies. It is the
  site's operator surface and stays repo-local: run it as `uv run org …`.
- **A mesh identity** — `culture.yaml` (`suffix` + `backend`) and the matching
  resident prompt file (`AGENTS.colleague.md`, since this agent runs
  `backend: colleague`).
- **The canonical guildmaster skill kit** under `.claude/skills/`,
  vendored cite-don't-import. See [`docs/skill-sources.md`](docs/skill-sources.md).
- **A build baseline** — pytest, lint, and the agent-first rubric gate wired
  into GitHub Actions. **No PyPI publishing** — this repo's deliverable is the
  site published to AgentCulture.org, not a package.

## Quickstart

```bash
uv sync
uv run pytest -n auto                 # run the test suite
uv run org whoami  # identity from culture.yaml
uv run org learn   # self-teaching prompt (add --json)
uv run teken cli doctor . --strict    # the agent-first rubric gate CI runs
```

## CLI

| Verb | What it does |
|------|--------------|
| `whoami` | Report this agent's nick, version, backend, and model from `culture.yaml`. |
| `learn` | Print a structured self-teaching prompt. |
| `explain <path>` | Markdown docs for any noun/verb path. |
| `overview` | Read-only descriptive snapshot of the agent. |
| `doctor` | Check the agent-identity invariants (prompt-file-present, backend-consistency). |
| `cli overview` | Describe the CLI surface itself. |

Every command supports `--json`. Results go to stdout, errors/diagnostics to
stderr (never mixed). Exit codes: `0` success, `1` user error, `2` environment
error, `3+` reserved.

## The site

**Not built yet.** The stack, information architecture, and deploy target are
open decisions owed to
[org#2](https://github.com/agentculture/org/issues/2), which asks for a proposal
on the issue before any code lands. DNS for AgentCulture.org is operator-owned,
so a cutover is coordinated, not self-serve.

Two things worth knowing before you start: the sibling repos' `publish.yml` are
all **PyPI** workflows, not deploy templates — the deploy workflow has to be
written fresh. And a top-level `site/` directory is silently ignored by
`.gitignore`; the house name is `site-astro/`. Both are explained in
[`CLAUDE.md`](CLAUDE.md).

## Contributing

Every PR bumps the version (CI enforces it) — use the `version-bump` skill. See
[`CLAUDE.md`](CLAUDE.md) for the full conventions: the three stable CLI
contracts, the agent-first rubric gate, the `cicd` PR lane, and the
cite-don't-import rule for `.claude/skills/`.

## License

Apache 2.0 — see [`LICENSE`](LICENSE).
