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
  ES6,
  PATH,
} = require('./config.json');

function es6() {
  return src(PATH.src + ES6.src, { allowEmpty: true, sourcemaps: !production })
    .pipe(named())
    .pipe($.plumber({ errorHandler: $.notify.onError(ERROR) }))
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(dest(PATH.dest + ES6.dest, { sourcemaps: '.' }));
}

module.exports = es6;
