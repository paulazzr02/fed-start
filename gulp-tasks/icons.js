const { src, dest, lastRun } = require('gulp');
const iconfont = require('gulp-iconfont');
const consolidate = require('gulp-consolidate');

/* Configuration */
const {
  ICONS,
  PATH,
} = require('./config.json');

const customFontConfig = {
  fontName: 'customfont',
  formats: ['ttf', 'eot', 'woff', 'woff2'],
  appendCodepoints: true,
  appendUnicode: false,
  normalize: true,
  fontHeight: 1000,
  centerHorizontally: true
};

/* ICONS */
function icons() {
  return src(PATH.src + ICONS.src, { since: lastRun(icons), allowEmpty: true })
    .pipe(iconfont(customFontConfig)).on('glyphs', function (glyphs, options) {
      src(PATH.src + ICONS.templates + 'customFont.css')
      .pipe(consolidate('underscore', {
        glyphs: glyphs,
        fontName: options.fontName,
        fontDate: new Date().getTime()
      }))
      .pipe(dest(PATH.dest + ICONS.dest));

      src(PATH.src + ICONS.templates + 'customFont.html')
      .pipe(consolidate('underscore', {
        glyphs: glyphs,
        fontName: options.fontName
      }))
      .pipe(dest(PATH.dest + ICONS.dest));
    })
    .pipe(dest(PATH.dest + ICONS.dest));
}

module.exports = icons;
