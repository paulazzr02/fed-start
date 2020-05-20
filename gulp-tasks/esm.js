const { src, dest } = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const named = require('vinyl-named');
const plugins = require('gulp-load-plugins');
const uglify = require('gulp-uglify');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config');

const production = require('./helper/mode');

/* Plugins */
// { if, notify, plumber }
const $ = plugins();

/* Configuration */
const {
  ERROR,
  ESM,
  PATH,
} = require('./config.json');

function esm() {
  return src(PATH.src + ESM.src, { allowEmpty: true, sourcemaps: !production })
    .pipe(named())
    .pipe($.plumber({ errorHandler: $.notify.onError(ERROR) }))
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(dest(PATH.dest + ESM.dest, { sourcemaps: '.' }));
}

module.exports = esm;
