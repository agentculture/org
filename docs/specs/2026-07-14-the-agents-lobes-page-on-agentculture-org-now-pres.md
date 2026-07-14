# The /agents/lobes page on AgentCulture.org now presents the Mesh-brain as shipped infrastructure, not vision: deployment shapes let specialized devices act as a single brain — one safe command gives a box the lobes it is best at, with measured budget reclaim and honest capabilities — and the one-lobe-per-box end-state is presented as the converged spec it is

> The /agents/lobes page on AgentCulture.org now presents the Mesh-brain as shipped infrastructure, not vision: deployment shapes let specialized devices act as a single brain — one safe command gives a box the lobes it is best at, with measured budget reclaim and honest capabilities — and the one-lobe-per-box end-state is presented as the converged spec it is
> instruction: Update site-astro/src/data/lobes.ts (Mesh-brain section, machine table, facts, header note) and any lobes.astro structure the new content needs; verify with astro build + grep-traceable numbers

## Audience

- Visitors to agentculture.org/agents/lobes — mesh operators sizing up the Culture local-brain stack, and readers following the AgentCulture agents' work — plus the page's future maintainers, who rely on its 'lobes-cli is the single source of truth; when it moves, this file follows' contract

## Before → After

- Before: The page presents the Mesh-brain as vision: 'the Mesh-brain is the direction that setup points at' — today-vs-direction framing, no deployment shapes, no --shape command, no reclaim numbers, no dropped-lobe honesty; facts verified against lobes-cli as of the /agents/lobes PR (org#10), before lobes-cli 0.41.x/0.42.0 landed
- After: The Mesh-brain section presents shipped infrastructure: deployment shapes (machine-as-brain default, spark-lobe, thor-lobe) selected by one safe command (lobes init --shape, dry-run by default, --apply to commit), measured budget reclaim (spark-lobe cortex 0.44 util / 262144 ctx vs co-resident 0.30/131072; thor-lobe senses 0.30/131072 vs the 32768 co-resident trim), and dropped-lobe honesty (capabilities flag it, /v1/models omits it, requests get 404 role_infeasible — never silent rerouting); the one-lobe-per-box end-state (#112) is presented as what it is — a converged spec with recorded decisions (direct + honest referral, cheap gears co-reside, orin declared-but-unvalidated), not shipped code

## Why it matters

- The page's own header contract says lobes-cli is the single source of truth and 'when it moves, this file follows' — lobes moved (0.41.x profiles, 0.42.0 shapes, both merged 2026-07-14) and the page now undersells shipped, physically-validated work as vision; the mesh-mind story (specialized devices acting as a single brain, lobes split for device/model efficiency) is the site's strongest proof that the mesh direction is real

## Requirements

- The shipped-vs-future split is explicit on the page: deployment shapes (machine-as-brain / spark-lobe / thor-lobe, lobes init --shape, measured reclaim, dropped-lobe honesty) are presented as shipped in lobes-cli 0.42.0 and validated live on the physical Spark and Thor 2026-07-14; the one-lobe-per-box end-state (#112: direct + honest referral, cheap gears co-reside) is presented as a converged spec; the Orin (JetPack 7.2) joining the mesh brain is presented as the named next step
  - honesty: A reader of the rendered page alone can tell which Mesh-brain facts are shipped (0.42.0, validated live 2026-07-14 on the physical Spark and Thor) and which are future (#112 converged spec; Orin JetPack 7.2 as next step) — no sentence blurs the line
- Every number and mechanism named on the page is sourced from lobes-cli shipped artifacts, not from memory: shape TOML overrides (spark-lobe cortex gpu_mem_util 0.44 / max_model_len 262144; thor-lobe senses 0.30 / 131072), the co-resident values they reclaim from (cortex 0.30/131072, senses trimmed to 32768), CHANGELOG 0.42.0, and the two 2026-07-14 spec docs
  - honesty: Every number in the updated content diffs clean against its named source in lobes-cli main @ 8aa2d2f: spark-lobe.toml (0.44/262144), thor-lobe.toml (0.30/131072), the co-resident values they cite, and CHANGELOG 0.42.0 — checkable by grep, no remembered values
- Stale facts elsewhere on the page are reconciled in the same pass — the machine-profile table (e.g. thor context 32768, which is the co-resident senses trim, not a shape-aware value), the facts strip's 'planned' chip, and the data-file header's verified-on date — so the page doesn't contradict its own new Mesh-brain section
  - honesty: After the update, no element of the page contradicts the new Mesh-brain content: the machine-profile table, fact chips, hero copy, and the data-file header's verified-on note are all consistent with the shapes story

## Honesty conditions

- The merged page presents deployment shapes as shipped-and-validated mesh-mind infrastructure and the one-lobe end-state + Orin as future — and a reader who then opens lobes-cli finds every claim true at main
- Each audience leg is served by the merged page: an operator can follow the shapes story to the lobes-cli commands and repo; a maintainer finds the data-file header naming the artifacts each fact came from and the date it was verified
- The before-state is checkable in git: org main @ 70779ba renders the Mesh-brain section as direction/vision copy and site-astro/src contains no occurrence of '--shape', 'spark-lobe', or 'thor-lobe'
- The merged page renders the shapes as shipped with the exact measured values from the shape TOMLs (0.44/262144, 0.30/131072) and labels the #112 end-state as a converged spec, the Orin as future — verified by reading the built page
- 'lobes moved' is evidenced in lobes-cli main: CHANGELOG 0.41.0–0.42.0 entries dated 2026-07-13/14, commits 6e47b61…8aa2d2f merged
- The PR diff touches only the org repo, within site-astro content/data plus version/changelog bookkeeping; every terminal-capture line on the page traces to a real recorded run
- astro build exits 0 on the branch; each named number greps in both the page data and its lobes-cli source artifact; the PR's CI checks are green

## Success signals

- The updated page builds clean (astro build) and every number on it is traceable to a shipped lobes-cli artifact: shape TOMLs (0.44/262144, 0.30/131072), CHANGELOG 0.42.0, or the #112/#113 spec docs; the Mesh-brain section reads shipped-vs-specced honestly; lint + existing checks green on the PR

## Scope / boundaries

- Content update within the existing page structure and components — no page redesign, no new page; org repo only (no lobes-cli changes); no claim that the #112 end-state or Orin support has shipped: Orin stays future work and #112 stays a converged spec; the existing real-captures discipline holds — no fabricated terminal output

## Assumptions

- lobes-cli main at 0.42.0 (commit 8aa2d2f) is the content source; the page update does not wait for the #112 implementation or the Orin boot — future items are presented as future

## Decisions

- The page's 'next steps' / future-plans framing centers on adding the Jetson AGX Orin (JetPack 7.2) to the mesh brain — the declared-but-unvalidated orin small-model lobe becomes the named next box, presented as future work per the user's direction
- A fresh live terminal capture of the shape move ships on the page: a real 'lobes init --shape spark-lobe' dry-run executed on this box (dry-run changes zero bytes) — recorded, not fabricated, per the page's existing captures bar
