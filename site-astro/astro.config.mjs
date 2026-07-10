// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://agentculture.org',
  // Pure static output — no adapter, no SSR. `astro build` emits a static
  // dist/ deployable as-is (Cloudflare Pages, per org's CLAUDE.md).
  output: 'static',
});
