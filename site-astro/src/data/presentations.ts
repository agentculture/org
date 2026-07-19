export const REACHY_MINI_COMMIT =
  "6eab58e5a2e83082c9b6cba1f50342fb2ecf40cf" as const;
export const ARM101_COMMIT =
  "c05bda23b2352bc80f7aca97c6268bbde7114c04" as const;

export type PresentationProjectId = "reachy-mini-cli" | "arm101-cli";
export type PresentationProjectLabel = "Reachy Mini CLI" | "ARM101 CLI";

export interface PresentationSourceProject {
  id: PresentationProjectId;
  label: PresentationProjectLabel;
  /** Discovery link that intentionally follows the repository's latest state. */
  repositoryUrl: `https://github.com/${string}/${string}`;
}

interface PresentationEvidenceBase {
  id: string;
  label: string;
  path: string;
}

interface ReachyMiniEvidence extends PresentationEvidenceBase {
  project: "reachy-mini-cli";
  commit: typeof REACHY_MINI_COMMIT;
  url: `https://github.com/agentculture/reachy-mini-cli/blob/${typeof REACHY_MINI_COMMIT}/${string}`;
}

interface Arm101Evidence extends PresentationEvidenceBase {
  project: "arm101-cli";
  commit: typeof ARM101_COMMIT;
  url: `https://github.com/agentculture/arm101-cli/blob/${typeof ARM101_COMMIT}/${string}`;
}

/** An immutable factual source, tied to the reviewed project revision. */
export type PresentationEvidenceSource =
  | ReachyMiniEvidence
  | Arm101Evidence;

export interface PresentationCard {
  title: string;
  summary: string;
  route: `/presentations/${string}/`;
  topic: string;
  sourceProjects: readonly PresentationProjectLabel[];
}

export const presentationProjects = [
  {
    id: "reachy-mini-cli",
    label: "Reachy Mini CLI",
    repositoryUrl: "https://github.com/agentculture/reachy-mini-cli",
  },
  {
    id: "arm101-cli",
    label: "ARM101 CLI",
    repositoryUrl: "https://github.com/agentculture/arm101-cli",
  },
] as const satisfies readonly PresentationSourceProject[];

export const presentationEvidence = [
  {
    id: "reachy-readme",
    project: "reachy-mini-cli",
    label: "Reachy Mini CLI overview",
    commit: REACHY_MINI_COMMIT,
    path: "README.md",
    url: `https://github.com/agentculture/reachy-mini-cli/blob/${REACHY_MINI_COMMIT}/README.md`,
  },
  {
    id: "reachy-operating-guide",
    project: "reachy-mini-cli",
    label: "Reachy Mini operating guide",
    commit: REACHY_MINI_COMMIT,
    path: "docs/operating-reachy.md",
    url: `https://github.com/agentculture/reachy-mini-cli/blob/${REACHY_MINI_COMMIT}/docs/operating-reachy.md`,
  },
  {
    id: "reachy-symbolic-runtime-delivery",
    project: "reachy-mini-cli",
    label: "Reachy Mini symbolic runtime delivery",
    commit: REACHY_MINI_COMMIT,
    path: "docs/deliveries/2026-07-17-symbolic-runtime-70.md",
    url: `https://github.com/agentculture/reachy-mini-cli/blob/${REACHY_MINI_COMMIT}/docs/deliveries/2026-07-17-symbolic-runtime-70.md`,
  },
  {
    id: "reachy-agent-attach",
    project: "reachy-mini-cli",
    label: "Reachy Mini external agent attach client",
    commit: REACHY_MINI_COMMIT,
    path: "reachy/cli/_commands/agent.py",
    url: `https://github.com/agentculture/reachy-mini-cli/blob/${REACHY_MINI_COMMIT}/reachy/cli/_commands/agent.py`,
  },
  {
    id: "reachy-forge-activation",
    project: "reachy-mini-cli",
    label: "Reachy Mini generated-skill activation",
    commit: REACHY_MINI_COMMIT,
    path: "reachy/forge/activate.py",
    url: `https://github.com/agentculture/reachy-mini-cli/blob/${REACHY_MINI_COMMIT}/reachy/forge/activate.py`,
  },
  {
    id: "reachy-forge-validation",
    project: "reachy-mini-cli",
    label: "Reachy Mini generated-skill validation",
    commit: REACHY_MINI_COMMIT,
    path: "reachy/forge/validator.py",
    url: `https://github.com/agentculture/reachy-mini-cli/blob/${REACHY_MINI_COMMIT}/reachy/forge/validator.py`,
  },
  {
    id: "reachy-stash-record",
    project: "reachy-mini-cli",
    label: "Reachy Mini persisted behavior record",
    commit: REACHY_MINI_COMMIT,
    path: "reachy/stash/record.py",
    url: `https://github.com/agentculture/reachy-mini-cli/blob/${REACHY_MINI_COMMIT}/reachy/stash/record.py`,
  },
  {
    id: "arm101-readme",
    project: "arm101-cli",
    label: "ARM101 CLI overview and operating limits",
    commit: ARM101_COMMIT,
    path: "README.md",
    url: `https://github.com/agentculture/arm101-cli/blob/${ARM101_COMMIT}/README.md`,
  },
  {
    id: "arm101-hardware-validation",
    project: "arm101-cli",
    label: "ARM101 reachability-map hardware validation",
    commit: ARM101_COMMIT,
    path: "docs/hardware-validation-arm-explore.md",
    url: `https://github.com/agentculture/arm101-cli/blob/${ARM101_COMMIT}/docs/hardware-validation-arm-explore.md`,
  },
  {
    id: "arm101-gentle-motion",
    project: "arm101-cli",
    label: "ARM101 overload-aware gentle motion",
    commit: ARM101_COMMIT,
    path: "arm101/hardware/gentle.py",
    url: `https://github.com/agentculture/arm101-cli/blob/${ARM101_COMMIT}/arm101/hardware/gentle.py`,
  },
  {
    id: "arm101-safety",
    project: "arm101-cli",
    label: "ARM101 torque ownership and release safety",
    commit: ARM101_COMMIT,
    path: "arm101/hardware/safety.py",
    url: `https://github.com/agentculture/arm101-cli/blob/${ARM101_COMMIT}/arm101/hardware/safety.py`,
  },
  {
    id: "arm101-reachability-map",
    project: "arm101-cli",
    label: "ARM101 persisted reachability map",
    commit: ARM101_COMMIT,
    path: "arm101/explore/reachmap.py",
    url: `https://github.com/agentculture/arm101-cli/blob/${ARM101_COMMIT}/arm101/explore/reachmap.py`,
  },
] as const satisfies readonly PresentationEvidenceSource[];

export const presentations = [
  {
    title: "Mind, nervous system, body",
    summary:
      "How an agent's harness and model become the mind, robot-specific code becomes a symbolic nervous system, and physical robots become the body — grounded in Reachy Mini CLI and ARM101 CLI.",
    route: "/presentations/mind-nervous-system-body/",
    topic: "Neurosymbolic robotics",
    sourceProjects: ["Reachy Mini CLI", "ARM101 CLI"],
  },
] as const satisfies readonly PresentationCard[];
