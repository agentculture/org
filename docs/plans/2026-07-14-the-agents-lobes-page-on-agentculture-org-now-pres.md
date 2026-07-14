# Build Plan — The /agents/lobes page on AgentCulture.org now presents the Mesh-brain as shipped infrastructure, not vision: deployment shapes let specialized devices act as a single brain — one safe command gives a box the lobes it is best at, with measured budget reclaim and honest capabilities — and the one-lobe-per-box end-state is presented as the converged spec it is

slug: `the-agents-lobes-page-on-agentculture-org-now-pres` · status: `exported` · from frame: `the-agents-lobes-page-on-agentculture-org-now-pres`

> The /agents/lobes page on AgentCulture.org now presents the Mesh-brain as shipped infrastructure, not vision: deployment shapes let specialized devices act as a single brain — one safe command gives a box the lobes it is best at, with measured budget reclaim and honest capabilities — and the one-lobe-per-box end-state is presented as the converged spec it is

## Tasks

### t1 — Capture a real 'lobes init --shape spark-lobe' dry-run on this box and add it as a new session in site-astro/src/data/lobes-captures.ts

- instruction: Ensure lobes-cli >= 0.42.0 is runnable on this box (uv tool upgrade lobes-cli, or uv run from ~/git/lobes-cli); hash the deploy dir, run 'lobes init --shape spark-lobe' (dry-run default, NO --apply), re-hash to prove zero bytes, save the verbatim transcript, then add it as a CaptureSession export in lobes-captures.ts with trim-only edits and update the file header (tool version, date, provenance)
- covers: h9, c4
- acceptance:
  - The capture is a verbatim (trim-only, no rewriting) transcript of a real run recorded on this box with lobes-cli >= 0.42.0, and the file header records the run's tool version and date
  - The dry-run changes zero bytes on disk, verified by hashing the deploy dir before and after
  - No tokens, keys, or public hostnames appear in the capture (local mesh names only), matching the file's existing redaction bar

### t2 — Update site-astro/src/data/lobes.ts: rewrite the meshBrain section as shipped deployment shapes (machine-as-brain / spark-lobe / thor-lobe, lobes init --shape, measured reclaim 0.44/262144 + 0.30/131072, dropped-lobe honesty), present the #112 end-state as converged spec, add the Orin (JetPack 7.2) next-step framing, and reconcile stale facts (machine table context values, facts chips, header source list + verified-on note)

- instruction: Sources: lobes/profiles/builtin_shapes/*.toml, CHANGELOG 0.42.0, docs/specs/2026-07-14-*.md in lobes-cli. Rewrite meshBrain.{intro,todayLabel,directionLabel} for shipped shapes; keep the existing TS interfaces; update machines table notes (thor 32768 is the co-resident senses trim; shapes change it), facts chips, and the file-header contract note (verified 2026-07-14 against 0.42.0)
- covers: c1, c2, c4, c6, c9, c10, c11
- acceptance:
  - The meshBrain copy states shapes shipped in 0.42.0 and were validated live on the physical Spark and Thor 2026-07-14, and labels one-lobe-per-box (#112) as a converged spec — no sentence blurs shipped vs future
  - Every number in the file greps against its lobes-cli source: spark-lobe.toml (0.44, 262144), thor-lobe.toml (0.30, 131072), the co-resident values they reclaim from, CHANGELOG 0.42.0
  - The Orin appears as the named next step joining the mesh brain (JetPack 7.2), never as validated/shipped
  - No element of lobes.ts contradicts the new meshBrain section: machine table, fact chips, hero, header note all consistent

### t4 — Rewire site-astro/src/pages/agents/lobes.astro's Mesh-brain section for the shipped story: import and place the new shapes capture terminal, update the diagram captions from today-vs-direction to machine-as-brain-vs-mesh-shapes framing, and render the next-steps (Orin) note

- instruction: Import the new session from lobes-captures.ts and place it in the Mesh-brain section (term-grid or ask-wrap slot); pass the reframed captions through the existing LobesDiagram props; keep data-reveal/reveal-delay idioms and the existing style block's classes — no new component
- depends on: t1, t2
- covers: c1, c4, c9
- acceptance:
  - The new capture session renders in the Mesh-brain section via LobesTerminal, and the section's headings/captions match the shipped-vs-spec copy from lobes.ts (no leftover 'direction it points at' vision framing)
  - The rendered page presents: shapes shipped (with the one safe command), #112 as converged spec, Orin JetPack 7.2 as next step — in that reading order

### t6 — Verify and ship: astro build green, grep-traceability audit of every number against lobes-cli main @ 8aa2d2f, whole-page consistency read, before-state check against org main @ 70779ba, diff-scope audit (org-only, content+bookkeeping), then version-bump + changelog and the PR via cicd

- instruction: Run: npx astro build (from site-astro/); grep each number in both repos; git grep -e '--shape' -e 'spark-lobe' -e 'thor-lobe' -- site-astro/src at org main to prove absence; /version-bump patch; cicd open with evidence; cicd await for green
- depends on: t4
- covers: c3, c7, c8, h1, h2, h3, h4, h5, h6, h7, h8, h10, c2
- acceptance:
  - astro build exits 0; each named number (0.44, 262144, 0.30, 131072, 32768, 0.42.0) greps in both the page data and its named lobes-cli artifact
  - org main @ 70779ba demonstrably lacks the shapes story (git grep for --shape/spark-lobe/thor-lobe in site-astro/src is empty there), and the branch page presents it — the before/after of the spec is real
  - The PR diff touches only org: site-astro content/data files plus pyproject.toml/CHANGELOG.md/uv.lock and devague artifacts; every capture line traces to a recorded run
  - Version bumped per the version-check gate; PR opened via the cicd skill with the evidence (build output, grep audit, capture provenance) in the description; CI green

## Risks

- [unknown_nonblocking] The installed lobes on this box may predate 0.42.0 (the existing captures were taken on 0.40.1) — t1 needs the tool upgraded (uv tool install/upgrade lobes-cli) or run from the lobes-cli checkout against the live deploy dir; dry-run stays zero-byte either way (task t1)
- [follow_up] LobesTerminal inert typing animation (dead scoped CSS vs set:html; :global() fix per DevagueTerminal) ships as its own follow-up PR — user decision, kept out of this content update
