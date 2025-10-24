import path from 'path';

const pathResolve = {
  alias: {
    '@pages': path.resolve(__dirname, './src/pages'),
    '@features': path.resolve(__dirname, './src/features'),
    '@components': path.resolve(__dirname, './src/components'),
  },
};

export { pathResolve };
