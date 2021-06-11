const args = require('yargs').argv;
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const production = !!args.production;

/* Configuration */
const { MJS, PATH } = require('./config.json');

const webpackConfig = {
  mode: production ? 'production' : 'development',

  entry: {
    'main.fed': [path.resolve(__dirname, `../${PATH.src}`) + MJS.entry],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },

  module: {
    rules: [
      // Transpile ES6 to ES5
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      // Bundle and CSS extract
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      // font-awesome
      {
        test: /font-awesome\.config\.js/,
        use: [{ loader: 'style-loader' }, { loader: 'font-awesome-loader' }],
      },
      // Bootstrap 4
      {
        test: /bootstrap\/dist\/js\/umd\//,
        use: 'imports-loader?jQuery=jquery',
      },
    ],
  },

  devtool: !production && 'source-map',

  resolve: {
    extensions: ['.js'],
    modules: ['node_modules'],
    // alias: {
    //   jquery: 'jquery/dist/jquery.min.js',
    // }
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'vendors.fed',
          // name(module) {
          //   const packageName = module.context.match(
          //     /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
          //   )[1];
          //   return `lib/${packageName}`;
          // },
        },
      },
    },
  },

  plugins: [
    new webpack.BannerPlugin({
      banner: `빌드 날짜: ${new Date().toLocaleString()}`,
    }),
    new CopyPlugin({
      patterns: [
        // {
        //   from: './node_modules/bootstrap/dist/js/bootstrap.min.js',
        //   to: 'libs',
        // },
        // {
        //   from: './node_modules/popper.js/dist/umd/popper.min.js',
        //   to: 'lib',
        // },
        {
          from: './node_modules/jquery/dist/jquery.min.js',
          to: '../lib',
        },
        // {
        //   from: './node_modules/multi-clamp/MultiClamp.min.js',
        //   to: '../lib',
        // },
      ],
    }),
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery',
    //   Popper: ['popper.js', 'default'],
    // }),
  ],
  externals: {
    jquery: 'jQuery',
    // multiClamp: 'MultiClamp',
  },
};

module.exports = webpackConfig;
