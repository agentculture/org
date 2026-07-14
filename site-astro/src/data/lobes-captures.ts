// Real transcripts for /agents/lobes — captured 2026-07-14 from the live
// deployments this page describes: `lobes` 0.40.1 running locally on spark
// (DGX Spark, GB10) and the gateway on thor (Jetson Thor), reached over the
// LAN. Nothing here is invented; outputs are trimmed (marked "…") but not
// rewritten. No tokens, no keys, no public hostnames — `thor` and `spark`
// are local mesh names.
//
// The page REPLAYS these strings. It never dials the machines: every call
// below was made locally, once, while authoring.

export interface CaptureLine {
  /**
   * "cmd" renders with a prompt and types in; "cont" is a typed shell
   * continuation line; "out" fades in as output.
   */
  kind: "cmd" | "cont" | "out";
  text: string;
}

export interface CaptureSession {
  /** Which machine the session ran on / against. */
  machine: string;
  /** Short pane title, e.g. "single machine". */
  title: string;
  /** Capture date, shown in the pane header. */
  captured: string;
  lines: CaptureLine[];
}

export const capturedOn = "2026-07-14";

/** One machine: identity, health, and a profile-resolving dry run. */
export const singleMachine: CaptureSession = {
  machine: "spark",
  title: "one machine, many lobes",
  captured: capturedOn,
  lines: [
    { kind: "cmd", text: "lobes whoami" },
    { kind: "out", text: "tool: lobes" },
    { kind: "out", text: "version: 0.40.1" },
    { kind: "out", text: "machine: spark-f8a9 (GPU 0: NVIDIA GB10)" },
    {
      kind: "out",
      text: "served_model: sakamakismile/Qwen3.6-27B-Text-NVFP4-MTP  port: 8001",
    },
    { kind: "out", text: "gear: balanced / spark" },
    { kind: "cmd", text: "lobes status" },
    { kind: "out", text: "  model-gear-vllm-primary — running (healthy)" },
    { kind: "out", text: "  model-gear-vllm-multimodal — running (healthy)" },
    { kind: "out", text: "  model-gear-vllm-embed — running (healthy)" },
    { kind: "out", text: "  model-gear-vllm-rerank — running (healthy)" },
    { kind: "out", text: "  model-gear-gateway — running (healthy)" },
    { kind: "out", text: "  model-gear-stt — running (healthy)" },
    { kind: "out", text: "  model-gear-chatterbox — running (healthy)" },
    { kind: "out", text: "  … health: ok (:8001)" },
  ],
};

/** The profile layering, demonstrated by a real dry run (no --apply). */
export const profileDryRun: CaptureSession = {
  machine: "spark",
  title: "profiles — dry-run first",
  captured: capturedOn,
  lines: [
    { kind: "cmd", text: "lobes switch sakamakismile/Qwen3.6-27B-Text-NVFP4-MTP \\" },
    { kind: "cont", text: "  --purpose decode-heavy --machine thor" },
    { kind: "out", text: "DRY RUN — would update ~/.lobes/.env:" },
    { kind: "out", text: "  VLLM_PURPOSE=decode-heavy" },
    { kind: "out", text: "  VLLM_MACHINE=thor" },
    { kind: "out", text: "  VLLM_MAX_MODEL_LEN=32768" },
    { kind: "out", text: "  VLLM_GPU_MEM_UTIL=0.6" },
    { kind: "out", text: "  VLLM_ATTENTION_BACKEND=flashinfer" },
    { kind: "out", text: "  VLLM_MAX_NUM_SEQS=2" },
    { kind: "out", text: "  VLLM_MAX_NUM_BATCHED_TOKENS=4096" },
    { kind: "out", text: "  tool-call parser (auto-selected): qwen3_coder" },
    { kind: "out", text: "  quantization (from catalog): modelopt" },
    { kind: "out", text: "Re-run with --apply to execute." },
  ],
};

/** Pane 1 of the mesh story: spark's own fleet, seen from spark. */
export const meshSpark: CaptureSession = {
  machine: "spark",
  title: "its own full brain",
  captured: capturedOn,
  lines: [
    { kind: "cmd", text: "lobes fleet status" },
    { kind: "out", text: "gateway: ok (:8001)" },
    { kind: "out", text: "  model-gear-vllm-primary — running (healthy)" },
    { kind: "out", text: "  model-gear-vllm-multimodal — running (healthy)" },
    { kind: "out", text: "  model-gear-vllm-embed — running (healthy)" },
    { kind: "out", text: "  model-gear-vllm-rerank — running (healthy)" },
    { kind: "out", text: "  … 8 containers healthy" },
    { kind: "out", text: "models: Qwen3.6-27B-Text-NVFP4-MTP," },
    { kind: "out", text: "        gemma-4-12B-it-NVFP4A16," },
    { kind: "out", text: "        Qwen3-Embedding-0.6B, Qwen3-Reranker-0.6B, …" },
  ],
};

/** Pane 2 of the mesh story: thor's identical contract, over the LAN. */
export const meshThor: CaptureSession = {
  machine: "thor",
  title: "same contract, one hop away",
  captured: capturedOn,
  lines: [
    { kind: "cmd", text: "curl -s http://thor:8000/health" },
    { kind: "out", text: '{"status": "ok",' },
    { kind: "out", text: ' "service": "model-gear-gateway", "version": "0.40.1"}' },
    { kind: "cmd", text: "curl -s http://thor:8000/v1/models" },
    { kind: "out", text: '{"data": [' },
    { kind: "out", text: '  {"id": "sakamakismile/Qwen3.6-27B-Text-NVFP4-MTP"},' },
    { kind: "out", text: '  {"id": "coolthor/gemma-4-12B-it-NVFP4A16"},' },
    { kind: "out", text: '  {"id": "Qwen/Qwen3-Embedding-0.6B"},' },
    { kind: "out", text: '  {"id": "Qwen/Qwen3-Reranker-0.6B"} ]}' },
    { kind: "cmd", text: "curl -s http://thor:8000/capabilities" },
    { kind: "out", text: '{"cortex":   {"model": "…Qwen3.6-27B…", "ready": true,' },
    { kind: "out", text: '   "responsibilities": ["reasoning", "deciding", …]},' },
    { kind: "out", text: ' "senses":   {"model": "…gemma-4-12B…", "ready": true},' },
    { kind: "out", text: ' "embedder": {"ready": true}, "reranker": {"ready": true},' },
    { kind: "out", text: ' "stt": {…}, "tts": {…}}' },
  ],
};

/** The closer: ask thor's cortex, by role alias, from another machine. */
export const meshAsk: CaptureSession = {
  machine: "thor",
  title: "ask a lobe by role, from anywhere",
  captured: capturedOn,
  lines: [
    { kind: "cmd", text: "curl -s http://thor:8000/v1/chat/completions \\" },
    {
      kind: "cont",
      text: '  -d \'{"model": "cortex", "messages": [{"role": "user", "content": "Introduce yourself."}]}\'',
    },
    {
      kind: "out",
      text: '"Greetings from the Cortex Lobe on Thor; I am a vital thread in our collective mesh, and I am delighted to connect with you."',
    },
  ],
};
