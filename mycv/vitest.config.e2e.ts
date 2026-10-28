import { defineConfig } from 'vitest/config';
import swc from 'unplugin-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    // Resolve os paths customizados do tsconfig (ex: src/...)
    tsconfigPaths(),
    // Compila os decorators e arquivos TS usando SWC para o Vitest
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
  test: {
    globals: true,
    root: './',
    include: ['**/*.e2e-spec.ts'],
    // Injeta forçadamente o ambiente de teste independente do terminal
    env: {
      NODE_ENV: 'test',
    },
    setupFiles: ['./test/setup.ts'],
  },
});
