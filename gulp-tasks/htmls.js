const { src, dest } = require('gulp');
const fileinclude = require('gulp-file-include');
const plugins = require('gulp-load-plugins');

/* Plugins */
// { if, notify, plumber }
const $ = plugins();

/* Configuration */
const {
  ERROR,
  HTMLS,
  PATH,
} = require('./config.json');


/* HTML */
function htmls() {
  return src(PATH.src + HTMLS.src, { allowEmpty: true })
    .pipe($.plumber({ errorHandler: $.notify.onError(ERROR) }))
    .pipe(fileinclude({
      prefix: '@@',
      basepath: PATH.src + HTMLS.basePath,
    }))
    .pipe(dest(PATH.dest + HTMLS.dest));
}

module.exports = htmls;
