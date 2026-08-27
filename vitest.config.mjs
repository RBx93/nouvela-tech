import { defineConfig } from 'vitest/config'

// Vitest ignores vite.config.js when this file exists.
//
// The app build uses @vitejs/plugin-react, but this repo is on vite 8 while
// vitest bundles its own older vite, and the plugin does not hook into that
// one, which leaves JSX compiled against the classic runtime and every render
// failing with "React is not defined". Compiling JSX with esbuild's automatic
// runtime here sidesteps the mismatch entirely and needs no plugin. React 19
// wants the automatic runtime anyway.
export default defineConfig({
  esbuild: { jsx: 'automatic' },
  test: {
    include: ['tests/unit/**/*.test.{js,jsx}'],
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.js'],
  },
})
