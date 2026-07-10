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
| `site overview` | Describe the site operator surface. |
| `site build` | Astro production build (`npm run build` in `site-astro/`). |
| `site preview` | Serve the built site locally (`npm run preview`; runs until interrupted). |
| `site link-check` | Walk `dist/` for internal links/anchors that 404. |
| `site deploy` | Deploy `dist/` to Cloudflare Pages (dry-run by default, `--apply` to commit). |

Every command supports `--json`. Results go to stdout, errors/diagnostics to
stderr (never mixed). Exit codes: `0` success, `1` user error, `2` environment
error, `3+` reserved.

## The site

The site lives in [`site-astro/`](site-astro/) — Astro, `output: 'static'`, no
adapter, so `astro build` emits a pure-static `dist/`. It's deployed to
**Cloudflare Pages** as `agentculture.org` (project `agentculture-org`) via
`.github/workflows/deploy.yml` and the `org site` command group above; the
provisioned Cloudflare state and the DNS cutover procedure are recorded in
[`docs/deploy-runbook.md`](docs/deploy-runbook.md). DNS for AgentCulture.org
is operator-owned, so cutover is coordinated, not self-serve.

Two things worth knowing if you're extending it: the sibling repos'
`publish.yml` are all **PyPI** workflows, not deploy templates — this repo's
deploy workflow was written fresh, in the filename slot the removed
`publish.yml` vacated. And a top-level `site/` directory is silently ignored
by `.gitignore`; the house name is `site-astro/`. Both are explained in
[`CLAUDE.md`](CLAUDE.md).

## Contributing

Every PR bumps the version (CI enforces it) — use the `version-bump` skill. See
[`CLAUDE.md`](CLAUDE.md) for the full conventions: the three stable CLI
contracts, the agent-first rubric gate, the `cicd` PR lane, and the
cite-don't-import rule for `.claude/skills/`.

## License

Apache 2.0 — see [`LICENSE`](LICENSE).
