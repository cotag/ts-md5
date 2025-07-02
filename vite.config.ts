/// <reference types="vitest" />
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
// import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        sourcemap: true,
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'ts-md5',
            formats: ['es', 'cjs', 'umd'],
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            external: [
                // ...Object.keys(pkg.dependencies), // don't bundle dependencies
                /^node:.*/, // don't bundle built-in Node.js modules (use protocol imports!)
            ],
        },
        target: 'esnext', // transpile as little as possible
    },
    test: {
        environment: 'jsdom',
    },
    plugins: [dts()],
});
