"""Tests for the ``org site`` noun group: overview/build/preview/link-check/deploy.

All subprocess-touching verbs are exercised with ``shutil.which`` and
``subprocess.run`` monkeypatched — no real ``npm``/``npx``/network calls.
"""

from __future__ import annotations

import json
from pathlib import Path

import pytest

from org.cli import main
from org.cli._commands import site as site_cmd
from org.explain import known_paths, resolve


class _FakeCompletedProcess:
    def __init__(self, returncode: int = 0, stdout: str = "", stderr: str = "") -> None:
        self.returncode = returncode
        self.stdout = stdout
        self.stderr = stderr


def _write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


@pytest.fixture()
def fake_repo(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> Path:
    """Point ``site._repo_root()`` at a scratch dir with a ``site-astro/`` directory."""
    (tmp_path / "site-astro").mkdir()
    monkeypatch.setattr(site_cmd, "_repo_root", lambda: tmp_path)
    return tmp_path


# --- parser registration -----------------------------------------------------


def test_site_in_top_help(capsys: pytest.CaptureFixture[str]) -> None:
    with pytest.raises(SystemExit) as exc:
        main(["--help"])
    assert exc.value.code == 0
    assert "site" in capsys.readouterr().out


def test_site_help_lists_all_verbs(capsys: pytest.CaptureFixture[str]) -> None:
    with pytest.raises(SystemExit) as exc:
        main(["site", "--help"])
    assert exc.value.code == 0
    out = capsys.readouterr().out
    for verb in ("overview", "build", "preview", "link-check", "deploy"):
        assert verb in out


def test_site_bare_prints_overview(capsys: pytest.CaptureFixture[str]) -> None:
    rc = main(["site"])
    assert rc == 0
    assert "# org site" in capsys.readouterr().out


def test_site_unknown_flag_structured_error(capsys: pytest.CaptureFixture[str]) -> None:
    # Nested parse errors must route through error:/hint: + exit 1, not
    # argparse's default stderr/exit 2 (same contract `cli overview` guards).
    with pytest.raises(SystemExit) as exc:
        main(["site", "build", "--bogus"])
    assert exc.value.code == 1
    err = capsys.readouterr().err
    assert err.startswith("error:")
    assert "hint:" in err


# --- site overview ------------------------------------------------------------


def test_site_overview_text(capsys: pytest.CaptureFixture[str]) -> None:
    rc = main(["site", "overview"])
    assert rc == 0
    out = capsys.readouterr().out
    assert "# org site" in out
    assert "Verbs" in out


def test_site_overview_json_shape(capsys: pytest.CaptureFixture[str]) -> None:
    rc = main(["site", "overview", "--json"])
    assert rc == 0
    payload = json.loads(capsys.readouterr().out)
    assert payload["subject"] == "org site"
    assert isinstance(payload["sections"], list)
    assert payload["sections"]


# --- site build -----------------------------------------------------------


def test_site_build_missing_site_dir(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch, capsys: pytest.CaptureFixture[str]
) -> None:
    monkeypatch.setattr(site_cmd, "_repo_root", lambda: tmp_path)  # no site-astro/ created
    rc = main(["site", "build"])
    assert rc == 2
    err = capsys.readouterr().err
    assert err.startswith("error:")
    assert "site-astro" in err
    assert "hint:" in err


def test_site_build_missing_npm(
    fake_repo: Path, monkeypatch: pytest.MonkeyPatch, capsys: pytest.CaptureFixture[str]
) -> None:
    monkeypatch.setattr(site_cmd.shutil, "which", lambda name: None)
    rc = main(["site", "build"])
    assert rc == 2
    assert "npm" in capsys.readouterr().err


def test_site_build_success(
    fake_repo: Path, monkeypatch: pytest.MonkeyPatch, capsys: pytest.CaptureFixture[str]
) -> None:
    monkeypatch.setattr(site_cmd.shutil, "which", lambda name: f"/usr/bin/{name}")
    calls: list[list[str]] = []

    def fake_run(argv: list[str], **kwargs: object) -> _FakeCompletedProcess:
        calls.append(argv)
        return _FakeCompletedProcess(returncode=0, stdout="astro build ok\n")

    monkeypatch.setattr(site_cmd.subprocess, "run", fake_run)
    rc = main(["site", "build", "--json"])
    assert rc == 0
    payload = json.loads(capsys.readouterr().out)
    assert payload["dist"].endswith("dist")
    assert payload["pages"] == 0
    assert calls == [["/usr/bin/npm", "run", "build"]]


def test_site_build_npm_failure(
    fake_repo: Path, monkeypatch: pytest.MonkeyPatch, capsys: pytest.CaptureFixture[str]
) -> None:
    monkeypatch.setattr(site_cmd.shutil, "which", lambda name: f"/usr/bin/{name}")
    monkeypatch.setattr(
        site_cmd.subprocess,
        "run",
        lambda argv, **kwargs: _FakeCompletedProcess(returncode=1, stdout="boom\n"),
    )
    rc = main(["site", "build"])
    assert rc == 2
    err = capsys.readouterr().err
    assert "npm run build" in err
    assert "hint:" in err


# --- site preview -----------------------------------------------------------


def test_site_preview_missing_npm(
    fake_repo: Path, monkeypatch: pytest.MonkeyPatch, capsys: pytest.CaptureFixture[str]
) -> None:
    monkeypatch.setattr(site_cmd.shutil, "which", lambda name: None)
    rc = main(["site", "preview"])
    assert rc == 2
    assert "npm" in capsys.readouterr().err


def test_site_preview_success(
    fake_repo: Path, monkeypatch: pytest.MonkeyPatch, capsys: pytest.CaptureFixture[str]
) -> None:
    monkeypatch.setattr(site_cmd.shutil, "which", lambda name: f"/usr/bin/{name}")

    def fake_run(argv: list[str], **kwargs: object) -> _FakeCompletedProcess:
        assert argv == ["/usr/bin/npm", "run", "preview"]
        return _FakeCompletedProcess(returncode=0)

    monkeypatch.setattr(site_cmd.subprocess, "run", fake_run)
    rc = main(["site", "preview", "--json"])
    assert rc == 0
    payload = json.loads(capsys.readouterr().out)
    assert payload["status"] == "stopped"


def test_site_preview_npm_nonzero_exit(
    fake_repo: Path, monkeypatch: pytest.MonkeyPatch, capsys: pytest.CaptureFixture[str]
) -> None:
    monkeypatch.setattr(site_cmd.shutil, "which", lambda name: f"/usr/bin/{name}")
    monkeypatch.setattr(
        site_cmd.subprocess, "run", lambda argv, **kwargs: _FakeCompletedProcess(returncode=1)
    )
    rc = main(["site", "preview"])
    assert rc == 2
    assert "npm run preview" in capsys.readouterr().err


# --- site link-check ----------------------------------------------------------


def test_site_link_check_missing_dist(fake_repo: Path, capsys: pytest.CaptureFixture[str]) -> None:
    rc = main(["site", "link-check"])
    assert rc == 2
    err = capsys.readouterr().err
    assert "site build" in err


def test_site_link_check_passes(fake_repo: Path, capsys: pytest.CaptureFixture[str]) -> None:
    dist = fake_repo / "site-astro" / "dist"
    _write(
        dist / "index.html",
        '<html><body><a href="/about/">About</a>' '<a href="#top" id="top">Top</a></body></html>',
    )
    _write(dist / "about" / "index.html", "<html><body>About page</body></html>")
    rc = main(["site", "link-check", "--json"])
    assert rc == 0
    payload = json.loads(capsys.readouterr().out)
    assert payload["pages_checked"] == 2
    assert payload["broken"] == []


def test_site_link_check_relative_link(fake_repo: Path, capsys: pytest.CaptureFixture[str]) -> None:
    dist = fake_repo / "site-astro" / "dist"
    _write(dist / "index.html", '<html><body><a href="about.html">About</a></body></html>')
    _write(dist / "about.html", "<html><body>About</body></html>")
    rc = main(["site", "link-check"])
    assert rc == 0
    assert "link-check passed" in capsys.readouterr().out


def test_site_link_check_skips_external_links(
    fake_repo: Path, capsys: pytest.CaptureFixture[str]
) -> None:
    dist = fake_repo / "site-astro" / "dist"
    _write(
        dist / "index.html",
        '<html><body><a href="https://example.com">Ext</a>'
        '<a href="mailto:hi@example.com">Mail</a></body></html>',
    )
    rc = main(["site", "link-check"])
    assert rc == 0


def test_site_link_check_finds_broken_file_link(
    fake_repo: Path, capsys: pytest.CaptureFixture[str]
) -> None:
    dist = fake_repo / "site-astro" / "dist"
    _write(dist / "index.html", '<html><body><a href="/nope">Missing</a></body></html>')
    rc = main(["site", "link-check"])
    assert rc == 1
    err = capsys.readouterr().err
    assert "missing file" in err
    assert "/nope" in err


def test_site_link_check_finds_broken_anchor(
    fake_repo: Path, capsys: pytest.CaptureFixture[str]
) -> None:
    dist = fake_repo / "site-astro" / "dist"
    _write(dist / "index.html", '<html><body><a href="#nope">Nope</a></body></html>')
    rc = main(["site", "link-check"])
    assert rc == 1
    assert "missing anchor" in capsys.readouterr().err


def test_site_link_check_broken_json_error_shape(
    fake_repo: Path, capsys: pytest.CaptureFixture[str]
) -> None:
    dist = fake_repo / "site-astro" / "dist"
    _write(dist / "index.html", '<html><body><a href="/nope">X</a></body></html>')
    rc = main(["site", "link-check", "--json"])
    assert rc == 1
    payload = json.loads(capsys.readouterr().err)
    assert payload["code"] == 1
    assert "broken link" in payload["message"]
    assert payload["remediation"]


# --- site deploy -----------------------------------------------------------


def test_site_deploy_dry_run_default(
    fake_repo: Path, monkeypatch: pytest.MonkeyPatch, capsys: pytest.CaptureFixture[str]
) -> None:
    monkeypatch.setattr(site_cmd, "_current_git_branch", lambda root: "main")
    monkeypatch.delenv("CLOUDFLARE_API_TOKEN", raising=False)
    monkeypatch.delenv("CLOUDFLARE_ACCOUNT_ID", raising=False)
    rc = main(["site", "deploy", "--json"])
    assert rc == 0
    payload = json.loads(capsys.readouterr().out)
    assert payload["mode"] == "dry-run"
    assert payload["project"] == "agentculture-org"
    assert payload["command"][0] == "npx"
    assert "--branch" in payload["command"]
    assert payload["missing_env"] == ["CLOUDFLARE_API_TOKEN", "CLOUDFLARE_ACCOUNT_ID"]


def test_site_deploy_dry_run_omits_branch_when_unresolvable(
    fake_repo: Path, monkeypatch: pytest.MonkeyPatch, capsys: pytest.CaptureFixture[str]
) -> None:
    monkeypatch.setattr(site_cmd, "_current_git_branch", lambda root: None)
    rc = main(["site", "deploy", "--json"])
    assert rc == 0
    payload = json.loads(capsys.readouterr().out)
    assert "--branch" not in payload["command"]


def test_site_deploy_dry_run_never_requires_dist_or_env(
    fake_repo: Path, monkeypatch: pytest.MonkeyPatch, capsys: pytest.CaptureFixture[str]
) -> None:
    # Dry-run is purely descriptive: no dist/, no env vars, still exits 0.
    monkeypatch.setattr(site_cmd, "_current_git_branch", lambda root: "main")
    monkeypatch.delenv("CLOUDFLARE_API_TOKEN", raising=False)
    monkeypatch.delenv("CLOUDFLARE_ACCOUNT_ID", raising=False)
    rc = main(["site", "deploy"])
    assert rc == 0
    out = capsys.readouterr().out
    assert "dry-run" in out
    assert "--apply" in out


def test_site_deploy_apply_missing_dist(
    fake_repo: Path, monkeypatch: pytest.MonkeyPatch, capsys: pytest.CaptureFixture[str]
) -> None:
    monkeypatch.setattr(site_cmd, "_current_git_branch", lambda root: "main")
    monkeypatch.setenv("CLOUDFLARE_API_TOKEN", "tok")
    monkeypatch.setenv("CLOUDFLARE_ACCOUNT_ID", "acct")
    rc = main(["site", "deploy", "--apply"])
    assert rc == 2
    err = capsys.readouterr().err
    assert "site build" in err


def test_site_deploy_apply_missing_env(
    fake_repo: Path, monkeypatch: pytest.MonkeyPatch, capsys: pytest.CaptureFixture[str]
) -> None:
    (fake_repo / "site-astro" / "dist").mkdir()
    monkeypatch.setattr(site_cmd, "_current_git_branch", lambda root: "main")
    monkeypatch.delenv("CLOUDFLARE_API_TOKEN", raising=False)
    monkeypatch.delenv("CLOUDFLARE_ACCOUNT_ID", raising=False)
    rc = main(["site", "deploy", "--apply"])
    assert rc == 2
    err = capsys.readouterr().err
    assert "CLOUDFLARE_API_TOKEN" in err
    assert "CLOUDFLARE_ACCOUNT_ID" in err


def test_site_deploy_apply_missing_npx(
    fake_repo: Path, monkeypatch: pytest.MonkeyPatch, capsys: pytest.CaptureFixture[str]
) -> None:
    (fake_repo / "site-astro" / "dist").mkdir()
    monkeypatch.setattr(site_cmd, "_current_git_branch", lambda root: "main")
    monkeypatch.setenv("CLOUDFLARE_API_TOKEN", "tok")
    monkeypatch.setenv("CLOUDFLARE_ACCOUNT_ID", "acct")
    monkeypatch.setattr(site_cmd.shutil, "which", lambda name: None)
    rc = main(["site", "deploy", "--apply"])
    assert rc == 2
    assert "npx" in capsys.readouterr().err


def test_site_deploy_apply_success(
    fake_repo: Path, monkeypatch: pytest.MonkeyPatch, capsys: pytest.CaptureFixture[str]
) -> None:
    (fake_repo / "site-astro" / "dist").mkdir()
    monkeypatch.setattr(site_cmd, "_current_git_branch", lambda root: "main")
    monkeypatch.setenv("CLOUDFLARE_API_TOKEN", "tok")
    monkeypatch.setenv("CLOUDFLARE_ACCOUNT_ID", "acct")
    monkeypatch.setattr(site_cmd.shutil, "which", lambda name: f"/usr/bin/{name}")
    calls: list[list[str]] = []

    def fake_run(argv: list[str], **kwargs: object) -> _FakeCompletedProcess:
        calls.append(argv)
        return _FakeCompletedProcess(returncode=0, stdout="Deployed!\n")

    monkeypatch.setattr(site_cmd.subprocess, "run", fake_run)
    rc = main(["site", "deploy", "--apply", "--json"])
    assert rc == 0
    payload = json.loads(capsys.readouterr().out)
    assert payload["deployed"] is True
    assert calls
    assert calls[0][0] == "/usr/bin/npx"
    assert calls[0][1:4] == ["wrangler", "pages", "deploy"]


def test_site_deploy_apply_failure(
    fake_repo: Path, monkeypatch: pytest.MonkeyPatch, capsys: pytest.CaptureFixture[str]
) -> None:
    (fake_repo / "site-astro" / "dist").mkdir()
    monkeypatch.setattr(site_cmd, "_current_git_branch", lambda root: "main")
    monkeypatch.setenv("CLOUDFLARE_API_TOKEN", "tok")
    monkeypatch.setenv("CLOUDFLARE_ACCOUNT_ID", "acct")
    monkeypatch.setattr(site_cmd.shutil, "which", lambda name: f"/usr/bin/{name}")
    monkeypatch.setattr(
        site_cmd.subprocess,
        "run",
        lambda argv, **kwargs: _FakeCompletedProcess(returncode=1, stdout="error!\n"),
    )
    rc = main(["site", "deploy", "--apply"])
    assert rc == 2
    assert "wrangler deploy" in capsys.readouterr().err


# --- explain catalog resolution ------------------------------------------------


def test_catalog_site_paths_resolve() -> None:
    expected = [
        ("site",),
        ("site", "overview"),
        ("site", "build"),
        ("site", "preview"),
        ("site", "link-check"),
        ("site", "deploy"),
    ]
    for path in expected:
        assert path in known_paths()
        markdown = resolve(path)
        assert markdown.startswith("#")


def test_explain_site_deploy_json(capsys: pytest.CaptureFixture[str]) -> None:
    rc = main(["explain", "site", "deploy", "--json"])
    assert rc == 0
    payload = json.loads(capsys.readouterr().out)
    assert payload["path"] == ["site", "deploy"]
    assert "org site deploy" in payload["markdown"]


def test_explain_site_link_check(capsys: pytest.CaptureFixture[str]) -> None:
    rc = main(["explain", "site", "link-check"])
    assert rc == 0
    assert "org site link-check" in capsys.readouterr().out
