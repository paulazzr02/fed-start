const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    commons: ['bootstrap', './js/main.js', './scss/main.scss'],
    index: ['./js/views/home.js'],
    about: ['./js/views/about.js'],
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return packageName;
          },
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      //style and css extract
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      //image file loader
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: 'images',
              outputPath: 'images',
            },
          },
        ],
      },
      //fonts
      {
        test: /\.(woff(2)?|ttf|eot|otf|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: 'fonts',
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.jsx'],
    modules: ['node_modules', path.resolve(__dirname, 'src')],
  },

  plugins: [
    new webpack.BannerPlugin({
      banner: `빌드 날짜: ${new Date().toLocaleString()}`,
    }),
    new MiniCssExtractPlugin({
      filename: `css/[name].css`,
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3001,
      proxy: 'http://localhost:3000/',
      overlay: true,
      stats: 'errors-only',
      files: ['./src', './routes', './views'],
    }),
    new HtmlWebpackPlugin({
      template: 'html/index.html',
      filename: './../views/index.html',
      minify: false,
      templateParameters: {
        title: '<%= title %>',
      },
      chunks: ['commons', 'index'],
    }),
    new HtmlWebpackPlugin({
      template: 'html/about.html',
      filename: './../views/about.html',
      minify: false,
      templateParameters: {
        title: '<%= title %>',
      },
      chunks: ['commons', 'about'],
    }),
    new HtmlWebpackPlugin({
      template: 'html/error.html',
      filename: './../views/error.html',
      minify: false,
      templateParameters: {
        title: '<%= title %>',
        message: '<%= message %>',
        status: '<%= error.status %>',
        stack: '<%= error.stack %>',
      },
      chunks: ['commons', 'about'],
    }),
    new HtmlWebpackPartialsPlugin({
      path: path.resolve(__dirname, 'src/html/partials/navbar.html'),
      location: 'header',
      template_filename: [
        './../views/index.html',
        './../views/about.html',
        './../views/error.html',
      ],
    }),
    new HtmlWebpackPartialsPlugin({
      path: path.resolve(__dirname, 'src/html/partials/footer.html'),
      location: 'footer',
      template_filename: [
        './../views/index.html',
        './../views/about.html',
        './../views/error.html',
      ],
    }),
  ],
};
