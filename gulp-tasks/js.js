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
  JS,
  PATH,
} = require('./config.json');

function jsConcat() {
  return src(PATH.src + JS.src, { allowEmpty: true, sourcemaps: !production })
    .pipe(named())
    .pipe($.plumber({ errorHandler: $.notify.onError(ERROR) }))
    .pipe(babel())
    .pipe($.if(production, uglify()))
    .pipe(concat('main.js'))
    .pipe(dest(PATH.dest + JS.dest, { sourcemaps: '.' }));
}

function js() {
  return src(PATH.src + JS.src, { allowEmpty: true, sourcemaps: !production })
    .pipe(named())
    .pipe($.plumber({ errorHandler: $.notify.onError(ERROR) }))
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(dest(PATH.dest + JS.dest, { sourcemaps: '.' }));
}

module.exports = js;
