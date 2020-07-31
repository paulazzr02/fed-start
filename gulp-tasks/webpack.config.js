// node modules
const args = require('yargs').argv;
const path = require('path');
const webpack = require('webpack');

const production = !!args.production;

/* Configuration */
const {
  ESM,
  PATH,
} = require('./config.json');

// const APP_DIR = path.resolve(__dirname, `../${PATH.src}/es6`);
// const MODULES_DIR = path.resolve(__dirname, `../${PATH.vendor}`);
const APP_DIR = path.resolve(__dirname, '../src/esm');
const MODULES_DIR = path.resolve(__dirname, '../node_modules');

const webpackConfig = {
  mode: production ? 'production' : 'development',
  devtool: !production && 'source-map',
  entry: {
    // 'main.fed':  path.resolve(__dirname, `../${PATH.src}`) + ESM.entry
    'main.fed':  path.resolve(__dirname, '../src') + ESM.entry
  },
  output: {
    filename: '[name].js',
    // publicPath: '../dist/js/'
  },
  resolve: {
    extensions: ['.js', '.json'],
    modules: [ MODULES_DIR ],
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader'],
      //   include: [ MODULES_DIR ],
      // },
      // {
      //   test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //   use: [{
      //     loader: 'file-loader',
      //     options: {
      //       name: '[name].[hash:8].[ext]',
      //       outputPath: 'assets/'
      //     }
      //   }],
      //   include: [ MODULES_DIR ]
      // },
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components|lib)/,
        use: [
          'babel-loader',
          // 'eslint-loader'
        ]
      },
      {
        test: /jquery.+\.js$/,
        use: [{
          loader: 'expose-loader',
          options: 'window.jQuery',
        },
        {
          loader: 'expose-loader',
          options: 'jQuery',
        }, {
          loader: 'expose-loader',
          options: '$',
        }]
      },
      {
        test : /bootstrap\/dist\/\/js\//,
        // loader : 'imports?jQuery=jquery'
        loader: 'imports?jQuery=jquery,$=jquery,this=>window',
      },
    ]
  },
  optimization: {
    // runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: MODULES_DIR,
          chunks: 'initial',
          name: 'vendor.bundle',
          // reuseExistingChunk: true,
          // minChunks: 1,
          enforce: true,
        }
      },
    },
    minimize: production
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'] // Bootstrap 4 Dependency.
    }),
  ],
};

module.exports = webpackConfig;
