import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { pathResolve } from './path.config';

// https://vite.dev/config/
export default defineConfig({
  resolve: pathResolve,
  plugins: [react()],
});
