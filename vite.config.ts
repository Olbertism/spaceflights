/// <reference types="vitest/config" />
import { vitePlugin as remix } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { vercelPreset } from '@vercel/remix/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

installGlobals();

export default defineConfig({
  plugins: [
    process.env.NODE_ENV === 'test' // see https://github.com/remix-run/remix/issues/8982
      ? null
      : remix({
          presets: [vercelPreset()],
          ignoredRouteFiles: ['**/*.css'],
        }),
    tsconfigPaths(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setupTests.js'],
  },
});
