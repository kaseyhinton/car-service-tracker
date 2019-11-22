import cpy from 'rollup-plugin-cpy';
import { createDefaultConfig } from '@open-wc/building-rollup';

const config = createDefaultConfig({ input: './index.html' });

export default {
  ...config,
  plugins: [
    ...config.plugins,
    cpy({
      files: ['**/*.png', '**/*.svg', '**/*.ico', '_redirects', 'manifest.json'],
      dest: 'dist',
      options: {
        parents: true,
      },
    }),
  ],
};
