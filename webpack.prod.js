const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',

  module: {},

  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // 콘솔 로그 제거
          },
        },
      }),
    ],
  },

  performance: {
    maxEntrypointSize: 1000000,
    maxAssetSize: 1000000,
  },

  plugins: [new CleanWebpackPlugin()],
});
