const { src, dest } = require('gulp');

/* Configuration */
const {
  FONTS,
  PATH,
} = require('./config.json');

/* ASSETS - json and fonts */
function fonts() {
  return src(PATH.src + FONTS.src)
    .pipe(dest(PATH.dest + FONTS.dest)); // fonts (*.{eot,otf,svg,ttf,woff,woff2})
}

module.exports = fonts;
