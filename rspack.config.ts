import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
import * as RefreshPlugin from '@rspack/plugin-react-refresh';
import { resolve } from 'path';
import devConfig from './config/rspack.config.dev';
import prodConfig from './config/rspack.config.prod';

const isDev = process.env.NODE_ENV === 'dev';

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ['chrome >= 87', 'edge >= 88', 'firefox >= 78', 'safari >= 14'];

let RspackConfig = defineConfig({
  context: __dirname,
  entry: {
    main: './src/main.tsx',
  },
  resolve: {
    extensions: ['...', '.ts', '.tsx', '.jsx'],
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  module: {
    parser: {
      'css/auto': {
        namedExports: false,
      },
    },
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: 'less-loader',
          },
        ],
        type: 'css/auto',
      },
      {
        test: /\.css$/,
        use: ['postcss-loader'],
        type: 'css',
      },
      {
        test: /\.svg$/,
        type: 'asset',
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: 'automatic',
                    development: isDev,
                    refresh: isDev,
                  },
                },
              },
              env: { targets },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
    isDev ? new RefreshPlugin() : null,
  ].filter(Boolean),
  experiments: {
    css: true
  },
});

if (isDev) {
  RspackConfig = { ...RspackConfig, ...devConfig  };
} else {
  RspackConfig = { ...RspackConfig, ...prodConfig  };
}


export default RspackConfig;