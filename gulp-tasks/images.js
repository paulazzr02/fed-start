const { src, dest, lastRun } = require('gulp');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const imagemin = require('gulp-imagemin');

/* Configuration */
const {
  IMAGES,
  PATH,
} = require('./config.json');

/* IMAGES */
function images() {
  return src(PATH.src + IMAGES.src, { since: lastRun(images) })
    .pipe($.if(production, imagemin([
        pngquant({ quality: [0.5, 0.5] }),
        mozjpeg({ quality: 50 })
      ])
    ))
    .pipe(dest(PATH.dest + IMAGES.dest));
}

module.exports = images;
