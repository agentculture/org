// Real transcripts for /agents/reachy-mini-cli — a capture batch run for
// real on the rig "spark" on 2026-07-17, under reachy-mini-cli 0.31.0, plus
// one pane ported from a committed public artifact in the reachy-mini-cli
// repo. Nothing here is invented; every "cmd" and "out" line is copied
// verbatim from a real terminal session or a committed doc, trimmed only for
// pane length. Where a run of real lines is omitted, the cut is marked with
// its own "ellipsis" line — it is never folded silently into a kept line,
// and no kept line is reworded.
//
// Two source classes, per the plan's provenance boundary (task t2: covers
// c3, h2, c22, h19):
//  - FRESH RUN — the pane's `source` names the rig + date ("fresh run ·
//    spark, 2026-07-17"). All thirteen fresh-run panes below replay one
//    capture batch, run once, for real, on this rig, right after upgrading
//    the installed CLI to 0.31.0 (repo HEAD). Raw transcripts live under the
//    run's session scratchpad (gitignored, ephemeral) — not in this repo and
//    not in reachy-mini-cli's.
//  - PORTED — the one `thinkPorted` pane names a committed, publicly
//    traceable path in github.com/agentculture/reachy-mini-cli (verified via
//    `git ls-files docs/verification/` at authoring time). It exists because
//    the live `think run` attempts made during today's batch (see
//    10-think-run.txt, 10-think-run-retry.txt in the capture set) produced a
//    clean zero-spoken-turn result — an empty event buffer, a documented
//    no-op, not a failure. Rather than invent cognition dialogue that never
//    happened live, the pane replays the committed verification doc's own
//    worked example: real spoken phrases and real expression markers, as
//    documented in the repo at v0.14.0 (2026-06-10) — that date is what
//    `capturedDate` records for this one pane, not the porting date.
//
// No tokens, no keys, no private URLs. Local rig endpoints (localhost:9000)
// and the SDK/daemon version-mismatch RuntimeWarning appear exactly as
// reachy-mini-cli printed them on this rig — the page REPLAYS these
// strings, it never runs reachy-mini-cli at build or view time.

export interface CaptureLine {
  /**
   * "cmd" renders with a prompt and types in; "out" fades in as real
   * command output; "ellipsis" is a curator's marker for a run of real
   * lines omitted for pane length — it is not itself a captured line.
   */
  kind: "cmd" | "out" | "ellipsis";
  text: string;
}

export interface CapturePane {
  /** Stable slug for the pane, e.g. "identity-whoami". */
  id: string;
  /** Short pane title, shown in the pane header. */
  title: string;
  /** What this pane is a session of — surface and machine, not marketing. */
  context: string;
  /** Capture date, shown in the pane header. */
  capturedDate: string;
  /** reachy-mini-cli version the session ran under. */
  cliVersion: string;
  /** Provenance: "ported · <public repo path>" or "fresh run · <rig, date>". */
  source: string;
  lines: CaptureLine[];
}

export const capturedOn = "2026-07-17";
export const cliVersion = "0.31.0";

/** Identity: one glance at the CLI's own self-report — no robot needed. */
export const identityWhoami: CapturePane = {
  id: "identity-whoami",
  title: "whoami — the CLI's own identity",
  context: "spark · reachy-mini-cli · identity probe",
  capturedDate: capturedOn,
  cliVersion,
  source: "fresh run · spark, 2026-07-17",
  lines: [
    { kind: "cmd", text: "reachy-mini-cli whoami" },
    { kind: "out", text: "nick: reachy-mini-cli" },
    { kind: "out", text: "version: 0.31.0" },
    { kind: "out", text: "backend: unknown" },
    { kind: "out", text: "model: unknown" },
  ],
};

/** The onboarding path: install, start the daemon, verify, do something,
 * put it back down — the real-mode flow the CLI prints unprompted. */
export const quickstart: CapturePane = {
  id: "quickstart",
  title: "quickstart — the real-mode path",
  context: "spark · reachy-mini-cli · onboarding, no daemon required",
  capturedDate: capturedOn,
  cliVersion,
  source: "fresh run · spark, 2026-07-17",
  lines: [
    { kind: "cmd", text: "reachy-mini-cli quickstart" },
    {
      kind: "out",
      text: "reachy-mini-cli quickstart — install and start real mode",
    },
    { kind: "out", text: "" },
    { kind: "out", text: "Real mode — local robot (recommended)" },
    { kind: "out", text: "-------------------------------------" },
    { kind: "out", text: "1. Install once (CLI + daemon binary + SDK):" },
    { kind: "out", text: "     uv tool install 'reachy-mini-cli[daemon]'" },
    { kind: "out", text: "     # or: pip install 'reachy-mini-cli[daemon]'" },
    {
      kind: "out",
      text: "     # the installed command is 'reachy-mini-cli' (short alias: 'reachy')",
    },
    { kind: "out", text: "" },
    { kind: "out", text: "2. Start the daemon (wakes the robot on start):" },
    { kind: "out", text: "     reachy-mini-cli daemon start" },
    { kind: "out", text: "" },
    { kind: "out", text: "3. Verify it answers:" },
    { kind: "out", text: "     reachy-mini-cli device status" },
    { kind: "out", text: "" },
    { kind: "out", text: "4. Make it do something:" },
    {
      kind: "out",
      text: "     reachy-mini-cli listen run                  # orient to sound (Ctrl-C to stop)",
    },
    {
      kind: "out",
      text: "     reachy-mini-cli demo-mode start             # feel-alive idle loop (background)",
    },
    {
      kind: "out",
      text: "     reachy-mini-cli move goto --z 10 --pitch -5 # one motion command",
    },
    { kind: "out", text: "" },
    { kind: "out", text: "5. Put it back down when you are done:" },
    { kind: "out", text: "     reachy-mini-cli daemon stop" },
    { kind: "out", text: "" },
    {
      kind: "ellipsis",
      text: "… (the remote/HTTP-only path and the always-available no-daemon commands elided)",
    },
    {
      kind: "out",
      text: "Exit codes: 0 success, 1 user error, 2 environment/setup error.",
    },
  ],
};

/** Health check: the doctor verb's rubric-shaped report, run from an
 * installed wheel — no culture.yaml alongside the package, and that is
 * itself an expected, healthy result. */
export const doctor: CapturePane = {
  id: "doctor",
  title: "doctor — the health report",
  context: "spark · reachy-mini-cli · installed-wheel self-check",
  capturedDate: capturedOn,
  cliVersion,
  source: "fresh run · spark, 2026-07-17",
  lines: [
    { kind: "cmd", text: "reachy-mini-cli doctor" },
    { kind: "out", text: "reachy-mini-cli doctor: healthy" },
    { kind: "out", text: "" },
    {
      kind: "out",
      text: "[ok] source_checkout: no culture.yaml found alongside the package; identity checks skipped",
    },
  ],
};

/** The daemon's full status report against the live robot: control-loop
 * stats, camera, hardware id — the real machine behind the CLI. */
export const deviceStatus: CapturePane = {
  id: "device-status",
  title: "device status — the daemon's view of the robot",
  context: "spark · reachy-mini-cli · live daemon, hardware_id 37a38ce3a26e0727",
  capturedDate: capturedOn,
  cliVersion,
  source: "fresh run · spark, 2026-07-17",
  lines: [
    { kind: "cmd", text: "reachy-mini-cli device status" },
    { kind: "out", text: "type: daemon_status" },
    { kind: "out", text: "robot_name: reachy_mini" },
    { kind: "out", text: "state: running" },
    { kind: "out", text: "wireless_version: False" },
    { kind: "out", text: "desktop_app_daemon: False" },
    { kind: "out", text: "simulation_enabled: False" },
    { kind: "out", text: "mockup_sim_enabled: False" },
    { kind: "out", text: "no_media: False" },
    { kind: "out", text: "media_released: False" },
    { kind: "out", text: "camera_specs_name: arducam" },
    { kind: "out", text: "backend_status:" },
    { kind: "out", text: "  ready: False" },
    { kind: "out", text: "  motor_control_mode: enabled" },
    { kind: "out", text: "  last_alive: None" },
    { kind: "out", text: "  control_loop_stats:" },
    {
      kind: "out",
      text: "    mean_control_loop_frequency: 49.66561043533144",
    },
    {
      kind: "out",
      text: "    max_control_loop_interval: 0.02042984962463379",
    },
    { kind: "out", text: "    nb_error: 0" },
    {
      kind: "out",
      text: "    motor_controller: ControlLoopStats(period=~20.00ms, read_dt=~1.92 ms, write_dt=~0.19 ms)",
    },
    { kind: "out", text: "  error: None" },
    { kind: "out", text: "error: None" },
    { kind: "out", text: "wlan_ip: None" },
    { kind: "out", text: "version: 1.7.3" },
    { kind: "out", text: "hardware_id: 37a38ce3a26e0727" },
  ],
};

/** The live head pose: real joint numbers off the robot, not a mock —
 * captured mid-batch, antennas and all. */
export const deviceState: CapturePane = {
  id: "device-state",
  title: "device state — the live head pose",
  context: "spark · reachy-mini-cli · live joint/pose telemetry",
  capturedDate: capturedOn,
  cliVersion,
  source: "fresh run · spark, 2026-07-17",
  lines: [
    { kind: "cmd", text: "reachy-mini-cli device state" },
    { kind: "out", text: "control_mode: enabled" },
    { kind: "out", text: "head_pose:" },
    { kind: "out", text: "  x: 0.0007060431511311815" },
    { kind: "out", text: "  y: 0.0005256924657005011" },
    { kind: "out", text: "  z: -0.0011491551363928543" },
    { kind: "out", text: "  roll: -0.005241699183951121" },
    { kind: "out", text: "  pitch: -0.004407163898566546" },
    { kind: "out", text: "  yaw: -0.07900591329492851" },
    { kind: "out", text: "head_joints: None" },
    { kind: "out", text: "body_yaw: 0.0015339807878858025" },
    { kind: "out", text: "antennas_position:" },
    { kind: "out", text: "  - 0.01687378866674205" },
    { kind: "out", text: "  - -0.024543692606170175" },
    { kind: "out", text: "timestamp: 2026-07-17T00:25:15.449314Z" },
    { kind: "out", text: "passive_joints: None" },
    { kind: "out", text: "doa: None" },
  ],
};

/** The shortest possible motion command: wake, and the daemon hands back a
 * tracking uuid for the queued move. */
export const moveWake: CapturePane = {
  id: "move-wake",
  title: "move wake — one queued motion",
  context: "spark · reachy-mini-cli · motion queue, uuid-tracked",
  capturedDate: capturedOn,
  cliVersion,
  source: "fresh run · spark, 2026-07-17",
  lines: [
    { kind: "cmd", text: "reachy-mini-cli move wake" },
    { kind: "out", text: "uuid: f020512e-0567-4a76-a894-8cc5e3d521e6" },
  ],
};

/** The error:/hint: contract, live: no TTS server running, and the CLI
 * refuses cleanly with the endpoint it tried — the same shape every org CLI
 * uses for a user-facing failure. */
export const sayTtsRefusal: CapturePane = {
  id: "say-tts-refusal",
  title: "say run — the TTS refusal",
  context: "spark · reachy-mini-cli · error:/hint: contract, no TTS server",
  capturedDate: capturedOn,
  cliVersion,
  source: "fresh run · spark, 2026-07-17",
  lines: [
    {
      kind: "cmd",
      text: 'reachy-mini-cli say run "Hello — I am the page material now."',
    },
    { kind: "out", text: "[say] synthesizing 35 char(s) …" },
    {
      kind: "out",
      text: "error: TTS endpoint unreachable: [Errno 111] Connection refused",
    },
    {
      kind: "out",
      text: "hint: start the TTS server or point REACHY_TTS_URL at a reachable host (tried http://localhost:9000/v1/audio/synthesize)",
    },
  ],
};

/** Same say verb, this time the harmonic voice engine answers and the robot
 * speaks — plus the real SDK/daemon version-mismatch RuntimeWarning this rig
 * prints on every sdk-transport call. Kept verbatim here; ellipsis-trimmed
 * in the panes below where it recurs. */
export const sayHarmonic: CapturePane = {
  id: "say-harmonic",
  title: "say run — the harmonic voice, live",
  context: "spark · reachy-mini-cli · sdk transport, audio played",
  capturedDate: capturedOn,
  cliVersion,
  source: "fresh run · spark, 2026-07-17",
  lines: [
    {
      kind: "cmd",
      text: 'reachy-mini-cli say run "Hello from the capture batch" --voice-engine harmonic',
    },
    { kind: "out", text: "[say] synthesizing 28 char(s) …" },
    { kind: "out", text: "[say] playing 44640 PCM bytes …" },
    {
      kind: "out",
      text: "/home/spark/.local/share/uv/tools/reachy-mini-cli/lib/python3.12/site-packages/reachy_mini/reachy_mini.py:164: RuntimeWarning: Reachy Mini SDK and daemon versions do not match: SDK=1.9.0, daemon=1.7.3. Running different versions can create issues. Install matching reachy_mini versions for the SDK and daemon.",
    },
    {
      kind: "out",
      text: "  self.media_manager = self._configure_mediamanager(media_backend, log_level)",
    },
  ],
};

/** The two-tier reaction: quick antenna/look flinches for a brief sound,
 * escalating full-body turns for a sustained one, idle holds in between —
 * 79 real ticks before Ctrl-C-equivalent (--max-ticks) stopped it. */
export const listenRun: CapturePane = {
  id: "listen-run",
  title: "listen run — the two-tier reaction",
  context: "spark · reachy-mini-cli · sdk transport, orient-to-sound loop",
  capturedDate: capturedOn,
  cliVersion,
  source: "fresh run · spark, 2026-07-17",
  lines: [
    { kind: "cmd", text: "reachy-mini-cli listen run --max-ticks 120" },
    {
      kind: "ellipsis",
      text: "… (SDK/daemon version-mismatch RuntimeWarning elided — kept verbatim in the say · harmonic pane above)",
    },
    {
      kind: "out",
      text: "[listen] orienting to sound via sdk: dwell=1.5s hold=3s speed=18deg/s; Ctrl-C to stop",
    },
    { kind: "out", text: "[listen] antenna lean +22 (0.3s)" },
    { kind: "out", text: "[listen] look +17 (1.5s)" },
    { kind: "out", text: "[listen] idle +17 (2.2s)" },
    { kind: "out", text: "[listen] idle +7 (2.2s)" },
    { kind: "out", text: "[listen] escalate body -45 head -8 (3.8s)" },
    { kind: "out", text: "[listen] idle -8 (2.2s)" },
    { kind: "out", text: "[listen] idle -8 (2.2s)" },
    { kind: "out", text: "[listen] escalate body +44 head +0 (4.0s)" },
    { kind: "out", text: "[listen] idle +0 (2.2s)" },
    { kind: "out", text: "[listen] idle +0 (2.2s)" },
    { kind: "out", text: "[listen] escalate body -35 head +0 (4.0s)" },
    { kind: "out", text: "[listen] idle +0 (2.2s)" },
    { kind: "out", text: "[listen] idle +0 (2.2s)" },
    { kind: "out", text: "[listen] antenna lean +15 (0.3s)" },
    { kind: "out", text: "[listen] antenna lean +10 (0.3s)" },
    { kind: "out", text: "[listen] escalate body -45 head -9 (1.6s)" },
    { kind: "out", text: "[listen] idle -9 (2.2s)" },
    { kind: "out", text: "[listen] idle -9 (2.2s)" },
    { kind: "out", text: "[listen] antenna lean +16 (0.3s)" },
    { kind: "out", text: "[listen] antenna lean -21 (0.3s)" },
    { kind: "out", text: "[listen] stopped after 79 tick(s)" },
  ],
};

/** The live cognition loop, bounded to one turn: a clean zero-spoken-turn
 * result. This is a documented no-op, not a failure — the retry run below
 * the first attempt, kept because it is the clean version of the same
 * result. Real cognition dialogue lives in the ported pane further down. */
export const thinkRunNoop: CapturePane = {
  id: "think-run-noop",
  title: "think run — the bounded, zero-turn result",
  context: "spark · reachy-mini-cli · live cognition loop, --max-turns 1",
  capturedDate: capturedOn,
  cliVersion,
  source: "fresh run · spark, 2026-07-17",
  lines: [
    {
      kind: "cmd",
      text: "reachy-mini-cli think run --max-turns 1 --max-ticks 40 --voice-engine harmonic",
    },
    {
      kind: "out",
      text: "/home/spark/.local/share/uv/tools/reachy-mini-cli/lib/python3.12/site-packages/reachy_mini/reachy_mini.py:164: RuntimeWarning: Reachy Mini SDK and daemon versions do not match: SDK=1.9.0, daemon=1.7.3. Running different versions can create issues. Install matching reachy_mini versions for the SDK and daemon.",
    },
    {
      kind: "out",
      text: "  self.media_manager = self._configure_mediamanager(media_backend, log_level)",
    },
    {
      kind: "out",
      text: "[think] thinking out loud via sdk; voice engine: harmonic; turn-interval=1s mute-after-speak=2.5s; Ctrl-C to stop",
    },
    { kind: "out", text: "[think] stopped after 0 spoken turn(s)" },
  ],
};

/** The built-in scripted demo: a fixed 3-gesture, 3-phrase script that
 * exercises the same expression path the live loop uses — it ran to
 * completion, unlike the live loop's zero-turn result above. */
export const thinkDemo: CapturePane = {
  id: "think-demo",
  title: "think demo — the scripted 3-gesture script",
  context: "spark · reachy-mini-cli · built-in demo, sdk transport",
  capturedDate: capturedOn,
  cliVersion,
  source: "fresh run · spark, 2026-07-17",
  lines: [
    { kind: "cmd", text: "reachy-mini-cli think demo --voice-engine harmonic" },
    {
      kind: "out",
      text: "/home/spark/.local/share/uv/tools/reachy-mini-cli/lib/python3.12/site-packages/reachy_mini/reachy_mini.py:164: RuntimeWarning: Reachy Mini SDK and daemon versions do not match: SDK=1.9.0, daemon=1.7.3. Running different versions can create issues. Install matching reachy_mini versions for the SDK and daemon.",
    },
    {
      kind: "out",
      text: "  self.media_manager = self._configure_mediamanager(media_backend, log_level)",
    },
    {
      kind: "out",
      text: "[think demo] done — expressed 3 gesture(s), spoke 3 phrase(s)",
    },
  ],
};

/** The full expression table: seven emotion markers, each a named joint
 * offset recipe — the vocabulary the think loop draws gestures from. */
export const thinkExpressions: CapturePane = {
  id: "think-expressions",
  title: "think expressions — the gesture vocabulary",
  context: "spark · reachy-mini-cli · expression-marker → joint-offset table",
  capturedDate: capturedOn,
  cliVersion,
  source: "fresh run · spark, 2026-07-17",
  lines: [
    { kind: "cmd", text: "reachy-mini-cli think expressions" },
    {
      kind: "out",
      text: "🤔  head_z+2, head_roll+8, head_pitch+6, head_yaw-5, antenna_right-10, antenna_left-10",
    },
    {
      kind: "out",
      text: "😮  head_x-3, head_z+5, head_pitch-8, antenna_right+30, antenna_left+30",
    },
    {
      kind: "out",
      text: "🙂  head_pitch+5, antenna_right+12, antenna_left+12",
    },
    {
      kind: "out",
      text: "👂  head_y+2, head_roll-5, head_pitch+3, head_yaw+15, antenna_right+20, antenna_left-5, body_yaw+8",
    },
    {
      kind: "out",
      text: "😐  head_z+3, head_pitch-3, antenna_right+5, antenna_left+5",
    },
    {
      kind: "out",
      text: "🎉  head_z+6, head_pitch-10, antenna_right+40, antenna_left-40, body_yaw+10",
    },
    {
      kind: "out",
      text: "😔  head_x+2, head_z-3, head_pitch+12, antenna_right-25, antenna_left-25",
    },
  ],
};

/** After the whole batch: the rig's standing presence brought back up —
 * mode (live) and presence unit match the pre-batch capture, and the
 * reachy-live.service unit was restarted to active (the pre-batch capture
 * had found it inactive: an external upgrade had stopped it minutes
 * earlier, so the batch left the rig MORE restored than it found it).
 * Service status was captured before and after; this is the after. */
export const serviceStatus: CapturePane = {
  id: "service-status",
  title: "service status — the rig, restored",
  context: "spark · reachy-mini-cli · presence unit, post-batch",
  capturedDate: capturedOn,
  cliVersion,
  source: "fresh run · spark, 2026-07-17",
  lines: [
    { kind: "cmd", text: "reachy-mini-cli service status" },
    { kind: "out", text: "mode: live" },
    { kind: "out", text: "presence_unit: reachy-live.service" },
    { kind: "out", text: "daemon_healthy: True" },
    { kind: "out", text: "units:" },
    { kind: "out", text: "  reachy-daemon.service:" },
    { kind: "out", text: "    enabled: enabled" },
    { kind: "out", text: "    active: active" },
    { kind: "out", text: "  reachy-demo-mode.service:" },
    { kind: "out", text: "    enabled: disabled" },
    { kind: "out", text: "    active: inactive" },
    { kind: "out", text: "  reachy-live.service:" },
    { kind: "out", text: "    enabled: enabled" },
    { kind: "out", text: "    active: active" },
  ],
};

/** PORTED — the one pane not from today's batch. Today's live `think run`
 * produced a clean zero-spoken-turn result (see thinkRunNoop above): an
 * honest no-op, but not a demonstration of what the cognition loop actually
 * says or does when it has something to say. Rather than invent turns that
 * never happened live, this excerpt replays the committed verification
 * doc's own worked example for the built-in demo script — the same script
 * behind thinkDemo above — where three spoken phrases each pair with one of
 * the real expression markers from thinkExpressions' table (🤔, 👂, 🙂).
 * Excerpt boundaries: docs/verification/think-body-expression.md lines
 * 32–44 (Gate 2's intro and its c1/h1 timing checklist) and lines 108–111
 * (the Notes section's JSON-result shape). Two ellipsis lines mark what was
 * cut in between: Gate 2's remaining c5/h5 and c7/h7 checklist items, and
 * the Notes section's coalescing-behaviour and rubric-path bullets. */
export const thinkPorted: CapturePane = {
  id: "ported-think-body-expression",
  title: "think demo — the real cognition, ported",
  context: "reachy-mini-cli repo · think-body-expression verification doc",
  capturedDate: "2026-06-10",
  cliVersion: "v0.14.0 (as documented)",
  source:
    "ported · docs/verification/think-body-expression.md (documents 2026-06-10, v0.14.0 — the artifact's date, not the port date)",
  lines: [
    { kind: "out", text: "## Gate 2 — Demo run (scripted verification)" },
    { kind: "out", text: "Run `reachy-mini-cli think demo` and observe:" },
    {
      kind: "out",
      text: "### c1 / h1 — Movement is timed to thoughts, not random",
    },
    {
      kind: "out",
      text: "- [ ] The **first gesture** (`🤔`) fires **before or with** the first spoken",
    },
    {
      kind: "out",
      text: 'phrase ("I wonder what that sound was."), not after it is finished.',
    },
    {
      kind: "out",
      text: "- [ ] The **second gesture** (`👂`) fires **before or with** the second phrase",
    },
    {
      kind: "out",
      text: '("There it is again, to my left."), not before the first phrase starts.',
    },
    {
      kind: "out",
      text: "- [ ] The **third gesture** (`🙂`) fires **before or with** the third phrase",
    },
    { kind: "out", text: '("Ah — it\'s just the fan.").' },
    {
      kind: "out",
      text: "- [ ] No gesture fires **during silence** between phrases.",
    },
    {
      kind: "ellipsis",
      text: "… (Gate 2's remaining c5/h5 calm-body and c7/h7 distinct-expression checklist items elided — same three gestures, judged for stillness and visual distinctness)",
    },
    { kind: "out", text: "## Notes" },
    {
      kind: "ellipsis",
      text: "… (the coalescing-behaviour and rubric-path notes elided)",
    },
    {
      kind: "out",
      text: '- **JSON result:** `reachy-mini-cli think demo --json` should output a JSON',
    },
    {
      kind: "out",
      text: 'object with `"status": "ok"`, `"expressed"` (list of 3 emojis), and',
    },
    { kind: "out", text: '`"spoken"` (list of 3 phrase strings).' },
  ],
};
