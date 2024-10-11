import { rspack } from '@rspack/core';
const targets = ['chrome >= 87', 'edge >= 88', 'firefox >= 78', 'safari >= 14'];

export default {
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets },
      }),
    ],
  },
};