# Deploy runbook — AgentCulture.org on Cloudflare Pages

Operational record + procedure for the site's Cloudflare state. Everything
here was provisioned via the `cultureflare` skills (dry-run first, `--apply`
to commit) from the `agentculture/cultureflare` checkout, which holds the
credentials. This file is the ledger the plan's provisioning task (t3)
requires: **record what the apply output said, never assume**.

## Provisioned state (2026-07-10)

| Resource | Value | Source |
|---|---|---|
| Pages project | `agentculture-org` (Direct Upload, production branch `main`) | `cf-pages-project-create.sh --apply` |
| Project id | `a5fb18a3-4918-4710-8aa8-63b0b5e93505` | apply output |
| **Real subdomain** | `https://agentculture-org.pages.dev` (no auto-suffix) | apply output |
| Compatibility date | `2026-04-20` (pinned, matches sibling sub-sites) | apply input |
| Custom domain | `agentculture.org` — status `initializing` | `cf-pages-domain-add.sh --apply` |
| Custom domain | `www.agentculture.org` — status `initializing` | `cf-pages-domain-add.sh --apply` |
| Zone id | `02969f1ac3da7107eb54a0b12a992cbc` (`agentculture.org`) | `cf-zones.sh` |

## Current DNS + routing (pre-cutover)

The apex is **shielded by a redirect**: the zone's
`http_request_dynamic_redirect` entrypoint (`claudeflare managed redirect`,
ruleset `331cd7a31996419ca7179fe6914fcdfe`) holds exactly one rule matching
`agentculture.org` / `www.agentculture.org` → `concat("https://culture.dev",
path)`. The ruleset is zone-scoped: editing it cannot affect any other zone.

Records that must survive every step untouched (live email + tunnel):

- `MX` ×3 → `route{1,2,3}.mx.cloudflare.net`
- `TXT` SPF (`v=spf1 include:_spf.mx.cloudflare.net ~all`) and DKIM
  (`cf2024-1._domainkey`)
- `CNAME chat.agentculture.org` → `…cfargotunnel.com` (proxied)

Site-relevant records as of today (still pre-cutover):

- `A agentculture.org` → `192.0.2.1` (proxied dummy — redirect-only pattern)
- `CNAME www.agentculture.org` → `agentculture.org` (proxied)

## Cutover procedure (t11 — operator-authorized, in order)

Custom-domain validation and go-live both land here, deliberately: the DNS
swap was deferred out of provisioning so the whole visible change happens in
one authorized step.

1. **Repoint DNS at the project** (redirect rule still winning — no visible
   change yet):

   ```sh
   S=.claude/skills/cultureflare-write/scripts
   bash $S/cf-dns-delete.sh agentculture.org agentculture.org --type=A --content=192.0.2.1 --apply
   bash $S/cf-dns-create.sh  agentculture.org CNAME agentculture.org agentculture-org.pages.dev --proxied --apply
   bash $S/cf-dns-delete.sh agentculture.org www.agentculture.org --type=CNAME --apply
   bash $S/cf-dns-create.sh  agentculture.org CNAME www.agentculture.org agentculture-org.pages.dev --proxied --apply
   ```

   Then confirm the custom domains flip from `initializing` to `active`
   (`cf-pages.sh --json`) and the apex **still 301s to culture.dev**.

2. **Drop the redirect rule** (the actual go-live):
   delete/edit the single rule in ruleset `331cd7a31996419ca7179fe6914fcdfe`
   so it no longer matches `agentculture.org`/`www` (fetch entrypoint →
   modify → PUT; `cf-redirect-delete.sh` covers the delete path).

3. **Verify, immediately:**

   ```sh
   curl -sI https://agentculture.org      # expect HTTP 200, no location: culture.dev
   curl -sI https://www.agentculture.org  # expect the site (200 or 301 → apex)
   dig +short MX agentculture.org        # expect the three route*.mx.cloudflare.net
   dig +short chat.agentculture.org      # tunnel CNAME chain intact
   curl -sI https://culture.dev           # unaffected
   ```

   Email TXT records (SPF/DKIM) must be byte-identical to the table above.

**Rollback:** recreate the redirect rule (`cf-redirect-create.sh
agentculture.org 'https://culture.dev' …`) — DNS can stay pointed at Pages;
the rule wins as soon as it exists.

## CI deploy (deploy.yml)

- Repo Actions secrets (operator-set): `CLOUDFLARE_API_TOKEN` (Pages Edit
  scope), `CLOUDFLARE_ACCOUNT_ID` (`1f094060341ce8c2b246505d869d8968`).
- Deploy command: `wrangler pages deploy site-astro/dist
  --project-name agentculture-org` — push to `main` = production deployment;
  other branches get preview deployments at
  `https://<branch>.agentculture-org.pages.dev`.
- No PyPI anything, ever, in this workflow (org#1).
