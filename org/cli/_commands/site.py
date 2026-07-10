"""``org site`` — operator surface for the Astro site in ``site-astro/``.

Noun group mirroring ``cli`` (see :mod:`org.cli._commands.cli`): a bare
``org site`` prints the noun's own overview, and ``site overview`` satisfies
the agent-first rubric's ``overview_cli_noun_exists``-style contract (any noun
with action-verbs must also expose ``overview``).

Verbs:

* ``build`` — ``npm run build`` in ``site-astro/`` (Astro production build).
* ``preview`` — ``npm run preview`` (long-running; serves until interrupted).
* ``link-check`` — walk ``site-astro/dist/`` for internal links/anchors that
  404 within the built output. Pure stdlib (:mod:`html.parser`) — the
  zero-runtime-dependency rule (``pyproject.toml``'s ``dependencies = []``)
  is a hard constraint, so this never imports a third-party HTML parser.
* ``deploy`` — dry-run by default (repo convention: write verbs default to
  dry-run, ``--apply`` to commit). Prints the ``wrangler pages deploy`` plan;
  ``--apply`` actually execs it. Deploy target facts (project name, dist
  path, required env vars) come from ``docs/deploy-runbook.md``.

None of these add a runtime dependency: ``npm``/``npx``/``git`` are external
binaries resolved via :func:`shutil.which`, the same way a Python package
would shell out to any other tool.
"""

from __future__ import annotations

import argparse
import os
import shutil
import subprocess  # noqa: S404 - no shell=True; argv lists only (bandit skips B404/B603)
from html.parser import HTMLParser
from pathlib import Path

from org.cli._commands.overview import emit_overview
from org.cli._commands.whoami import find_culture_yaml
from org.cli._errors import EXIT_ENV_ERROR, EXIT_USER_ERROR, CliError
from org.cli._output import emit_diagnostic, emit_result

_SITE_DIR_NAME = "site-astro"
_PROJECT_NAME = "agentculture-org"
_REQUIRED_ENV = ("CLOUDFLARE_API_TOKEN", "CLOUDFLARE_ACCOUNT_ID")
_EXTERNAL_PREFIXES = ("http://", "https://", "//", "mailto:", "tel:", "javascript:")

_VERBS = [
    "site build — run the Astro production build (npm run build in site-astro/)",
    "site preview — serve the built site locally (npm run preview; runs until interrupted)",
    "site link-check — walk dist/ for internal links/anchors that 404 within dist",
    "site deploy — deploy dist/ to Cloudflare Pages (dry-run by default, --apply to commit)",
    "site overview — describe the site operator surface (this command)",
]


# --- shared helpers ---------------------------------------------------------


def _repo_root() -> Path | None:
    """Locate the org repo root (parent of this agent's own ``culture.yaml``)."""
    cfg = find_culture_yaml()
    return cfg.parent if cfg else None


def _require_repo_root() -> Path:
    root = _repo_root()
    if root is None:
        raise CliError(
            EXIT_ENV_ERROR,
            "cannot locate the org repo root (no culture.yaml found alongside the package)",
            remediation="run this command from within an org source checkout, not a wheel install",
        )
    return root


def _require_site_dir(site_dir: Path) -> None:
    if not site_dir.is_dir():
        raise CliError(
            EXIT_ENV_ERROR,
            f"{site_dir} not found",
            remediation=(
                "the Astro site lives in site-astro/ at the repo root — check out the full org repo"
            ),
        )


def _require_npm() -> str:
    npm = shutil.which("npm")
    if npm is None:
        raise CliError(
            EXIT_ENV_ERROR,
            "npm not found on PATH",
            remediation=(
                "install Node.js (see site-astro/.nvmrc for the pinned version) so npm is on PATH"
            ),
        )
    return npm


def _run_streaming(argv: list[str], *, cwd: Path) -> int:
    """Run ``argv``, echoing its combined output to stderr as diagnostics."""
    try:
        proc = subprocess.run(  # noqa: S603 - argv is a fixed list, no shell
            argv,
            cwd=cwd,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            check=False,
        )
    except OSError as err:
        raise CliError(
            EXIT_ENV_ERROR,
            f"failed to launch {argv[0]}: {err}",
            remediation="ensure the binary is installed, executable, and on PATH",
        ) from err
    for line in proc.stdout.splitlines():
        emit_diagnostic(line)
    return proc.returncode


# --- site overview -----------------------------------------------------------


def _site_sections() -> list[dict[str, object]]:
    return [
        {"title": "Verbs", "items": list(_VERBS)},
        {
            "title": "Layout",
            "items": [
                "site-astro/ — the Astro source (output: 'static', no adapter)",
                "site-astro/dist/ — build output (gitignored; created by `site build`)",
            ],
        },
        {
            "title": "Deploy target",
            "items": [
                f"Cloudflare Pages project: {_PROJECT_NAME}",
                f"--apply requires: {', '.join(_REQUIRED_ENV)}",
                "see docs/deploy-runbook.md for the full provisioning record",
            ],
        },
    ]


def cmd_site_overview(args: argparse.Namespace) -> int:
    emit_overview(
        "org site",
        _site_sections(),
        json_mode=bool(getattr(args, "json", False)),
    )
    return 0


def _no_verb(args: argparse.Namespace) -> int:
    # `org site` with no sub-verb prints the noun's overview.
    return cmd_site_overview(args)


# --- site build --------------------------------------------------------------


def cmd_site_build(args: argparse.Namespace) -> int:
    json_mode = bool(getattr(args, "json", False))
    root = _require_repo_root()
    site_dir = root / _SITE_DIR_NAME
    _require_site_dir(site_dir)
    npm = _require_npm()

    emit_diagnostic(f"org site build: running `npm run build` in {site_dir}")
    rc = _run_streaming([npm, "run", "build"], cwd=site_dir)
    if rc != 0:
        raise CliError(
            EXIT_ENV_ERROR,
            f"`npm run build` exited {rc}",
            remediation=(
                "inspect the build diagnostics above, fix the failure, and re-run `org site build`"
            ),
        )

    dist_dir = site_dir / "dist"
    pages = len(list(dist_dir.rglob("*.html"))) if dist_dir.is_dir() else 0
    payload = {"dist": str(dist_dir), "pages": pages}
    if json_mode:
        emit_result(payload, json_mode=True)
    else:
        emit_result(f"build succeeded: {pages} page(s) in {dist_dir}", json_mode=False)
    return 0


# --- site preview --------------------------------------------------------------


def cmd_site_preview(args: argparse.Namespace) -> int:
    json_mode = bool(getattr(args, "json", False))
    root = _require_repo_root()
    site_dir = root / _SITE_DIR_NAME
    _require_site_dir(site_dir)
    npm = _require_npm()

    emit_diagnostic(
        f"org site preview: running `npm run preview` in {site_dir} "
        "— serves until interrupted (Ctrl-C to stop)"
    )
    try:
        proc = subprocess.run(  # noqa: S603 - argv is a fixed list, no shell
            [npm, "run", "preview"],
            cwd=site_dir,
            check=False,
        )
    except OSError as err:
        raise CliError(
            EXIT_ENV_ERROR,
            f"failed to launch npm: {err}",
            remediation="ensure npm is installed, executable, and on PATH",
        ) from err
    except KeyboardInterrupt:
        emit_diagnostic("org site preview: interrupted, server stopped")
        return 0

    if proc.returncode != 0:
        raise CliError(
            EXIT_ENV_ERROR,
            f"`npm run preview` exited {proc.returncode}",
            remediation="inspect npm's own output above",
        )

    payload = {"site_dir": str(site_dir), "status": "stopped"}
    emit_result(payload if json_mode else "preview server stopped", json_mode=json_mode)
    return 0


# --- site link-check -----------------------------------------------------------


class _LinkCollector(HTMLParser):
    """Collect `<a href>` targets and element ids/anchors from one HTML page."""

    def __init__(self) -> None:
        super().__init__()
        self.links: list[str] = []
        self.ids: set[str] = set()

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr_dict = dict(attrs)
        if tag == "a":
            href = attr_dict.get("href")
            if href:
                self.links.append(href)
            name = attr_dict.get("name")
            if name:
                self.ids.add(name)
        an_id = attr_dict.get("id")
        if an_id:
            self.ids.add(an_id)


def _is_external(href: str) -> bool:
    return href.startswith(_EXTERNAL_PREFIXES)


def _resolve_target(dist_dir: Path, source_file: Path, href: str) -> tuple[Path, str | None]:
    """Resolve ``href`` (found in ``source_file``) to a file under ``dist_dir``."""
    path_part, _, fragment = href.partition("#")
    fragment = fragment or None
    if not path_part:
        return source_file, fragment  # pure fragment link — resolves within this page

    base = (
        dist_dir / path_part.lstrip("/")
        if path_part.startswith("/")
        else source_file.parent / path_part
    )

    if path_part.endswith("/"):
        candidates = [base / "index.html"]
    else:
        candidates = [base]
        if base.suffix == "":
            candidates += [base.with_suffix(".html"), base / "index.html"]

    for candidate in candidates:
        resolved = candidate.resolve()
        if resolved.is_file():
            return resolved, fragment
    return candidates[0].resolve(), fragment


def cmd_site_link_check(args: argparse.Namespace) -> int:
    json_mode = bool(getattr(args, "json", False))
    root = _require_repo_root()
    dist_dir = root / _SITE_DIR_NAME / "dist"
    if not dist_dir.is_dir():
        raise CliError(
            EXIT_ENV_ERROR,
            f"{dist_dir} not found",
            remediation="run `org site build` first",
        )

    html_files = sorted(dist_dir.rglob("*.html"))
    page_ids: dict[Path, set[str]] = {}
    page_links: dict[Path, list[str]] = {}
    for html_file in html_files:
        parser = _LinkCollector()
        parser.feed(html_file.read_text(encoding="utf-8", errors="replace"))
        page_ids[html_file] = parser.ids
        page_links[html_file] = parser.links

    broken: list[dict[str, str]] = []
    for html_file in html_files:
        for href in page_links[html_file]:
            if not href or _is_external(href):
                continue
            target, fragment = _resolve_target(dist_dir, html_file, href)
            if not target.is_file():
                broken.append(
                    {
                        "file": str(html_file.relative_to(dist_dir)),
                        "link": href,
                        "reason": "missing file",
                    }
                )
                continue
            if fragment:
                ids = page_ids.get(target, set())
                if fragment not in ids:
                    broken.append(
                        {
                            "file": str(html_file.relative_to(dist_dir)),
                            "link": href,
                            "reason": f"missing anchor #{fragment}",
                        }
                    )

    if broken:
        lines = [f"{b['file']}: {b['link']} ({b['reason']})" for b in broken]
        raise CliError(
            EXIT_USER_ERROR,
            f"found {len(broken)} broken link(s) in {dist_dir}:\n" + "\n".join(lines),
            remediation=(
                "fix the internal hrefs above, then re-run `org site build` "
                "and `org site link-check`"
            ),
        )

    payload = {"dist": str(dist_dir), "pages_checked": len(html_files), "broken": []}
    if json_mode:
        emit_result(payload, json_mode=True)
    else:
        emit_result(
            f"link-check passed: {len(html_files)} page(s), 0 broken links",
            json_mode=False,
        )
    return 0


# --- site deploy ---------------------------------------------------------------


def _current_git_branch(root: Path) -> str | None:
    git = shutil.which("git")
    if git is None:
        return None
    try:
        proc = subprocess.run(  # noqa: S603 - argv is a fixed list, no shell
            [git, "-C", str(root), "rev-parse", "--abbrev-ref", "HEAD"],
            capture_output=True,
            text=True,
            check=False,
            timeout=5.0,
        )
    except (OSError, subprocess.TimeoutExpired):
        return None
    if proc.returncode != 0:
        return None
    branch = proc.stdout.strip()
    return branch if branch and branch != "HEAD" else None


def _wrangler_argv(dist_dir: Path, branch: str | None) -> list[str]:
    argv = ["npx", "wrangler", "pages", "deploy", str(dist_dir), "--project-name", _PROJECT_NAME]
    if branch:
        argv += ["--branch", branch]
    return argv


def cmd_site_deploy(args: argparse.Namespace) -> int:
    json_mode = bool(getattr(args, "json", False))
    apply_ = bool(getattr(args, "apply", False))
    root = _require_repo_root()
    site_dir = root / _SITE_DIR_NAME
    dist_dir = site_dir / "dist"
    branch = _current_git_branch(root)
    argv = _wrangler_argv(dist_dir, branch)
    missing_env = [name for name in _REQUIRED_ENV if not os.environ.get(name)]

    if not apply_:
        plan = {
            "mode": "dry-run",
            "project": _PROJECT_NAME,
            "source": str(dist_dir),
            "command": argv,
            "required_env": list(_REQUIRED_ENV),
            "missing_env": missing_env,
        }
        if json_mode:
            emit_result(plan, json_mode=True)
        else:
            lines = [
                "org site deploy — dry-run (pass --apply to commit)",
                f"  project: {_PROJECT_NAME}",
                f"  source: {dist_dir}",
                f"  command: {' '.join(argv)}",
                f"  required env: {', '.join(_REQUIRED_ENV)}",
            ]
            if missing_env:
                lines.append(f"  currently unset: {', '.join(missing_env)}")
            emit_result("\n".join(lines), json_mode=False)
        return 0

    # --apply: validate preconditions, then actually deploy.
    if not dist_dir.is_dir():
        raise CliError(
            EXIT_ENV_ERROR,
            f"{dist_dir} not found",
            remediation="run `org site build` first",
        )
    if missing_env:
        raise CliError(
            EXIT_ENV_ERROR,
            f"missing required env var(s): {', '.join(missing_env)}",
            remediation=(
                "export CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID before retrying "
                "(see docs/deploy-runbook.md)"
            ),
        )
    npx = shutil.which("npx")
    if npx is None:
        raise CliError(
            EXIT_ENV_ERROR,
            "npx not found on PATH",
            remediation="install Node.js (npx ships with npm; see site-astro/.nvmrc)",
        )

    real_argv = [npx, *argv[1:]]
    emit_diagnostic(f"org site deploy: running {' '.join(argv)}")
    rc = _run_streaming(real_argv, cwd=root)
    if rc != 0:
        raise CliError(
            EXIT_ENV_ERROR,
            f"wrangler deploy exited {rc}",
            remediation="inspect the deploy diagnostics above",
        )

    payload = {"project": _PROJECT_NAME, "source": str(dist_dir), "deployed": True}
    emit_result(
        payload if json_mode else f"deployed {dist_dir} to {_PROJECT_NAME}",
        json_mode=json_mode,
    )
    return 0


# --- registration ----------------------------------------------------------


def register(sub: argparse._SubParsersAction) -> None:
    p = sub.add_parser(
        "site",
        help=(
            "Operate the Astro site (build, preview, link-check, deploy; see 'org site overview')."
        ),
    )
    p.add_argument("--json", action="store_true", help="Emit structured JSON.")
    p.set_defaults(func=_no_verb, json=False)
    # `p` is a _CliArgumentParser (the top-level subparsers were built with that
    # parser_class); propagate it so nested parse errors route through the
    # structured error contract instead of argparse's default stderr/exit 2.
    noun_sub = p.add_subparsers(dest="site_command", parser_class=type(p))

    overview = noun_sub.add_parser("overview", help="Describe the site operator surface.")
    overview.add_argument("--json", action="store_true", help="Emit structured JSON.")
    overview.set_defaults(func=cmd_site_overview)

    build = noun_sub.add_parser("build", help="Run the Astro production build (npm run build).")
    build.add_argument("--json", action="store_true", help="Emit structured JSON.")
    build.set_defaults(func=cmd_site_build)

    preview = noun_sub.add_parser(
        "preview",
        help="Serve the built site locally (npm run preview; runs until interrupted).",
    )
    preview.add_argument("--json", action="store_true", help="Emit structured JSON.")
    preview.set_defaults(func=cmd_site_preview)

    link_check = noun_sub.add_parser(
        "link-check",
        help="Walk site-astro/dist/ for internal links/anchors that 404 within dist.",
    )
    link_check.add_argument("--json", action="store_true", help="Emit structured JSON.")
    link_check.set_defaults(func=cmd_site_link_check)

    deploy = noun_sub.add_parser(
        "deploy",
        help="Deploy dist/ to Cloudflare Pages (dry-run by default; --apply to commit).",
    )
    deploy.add_argument(
        "--apply",
        action="store_true",
        help="Actually run the deploy (default is a dry-run plan).",
    )
    deploy.add_argument("--json", action="store_true", help="Emit structured JSON.")
    deploy.set_defaults(func=cmd_site_deploy)
