const { src, dest } = require('gulp');
const path = require('path');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const plugins = require('gulp-load-plugins');

const production = require('./helper/mode');

/* Configuration */
const {
  COMPATIBILITY,
  CSS,
  ERROR,
  PATH,
} = require('./config.json');

/* Plugins */
// { if, notify, plumber }
const $ = plugins();

/* CSS */
function css() {
  return src(PATH.src + CSS.src, { sourcemaps: !production })
    .pipe($.plumber({ errorHandler: $.notify.onError(ERROR) }))
    // .pipe(sassGlob())
    .pipe(sass({
      includePaths: ['node_modules'],
      outputStyle: 'nested'
    }).on('error', sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: COMPATIBILITY,
        cascade: false,
      }),
    )
    .pipe($.if(production, cleanCss({ compatibility: 'ie9' })))
    .pipe(dest(PATH.dest + CSS.dest, { sourcemaps: '.' }));
}

module.exports = css;
