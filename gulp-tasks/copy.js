const { src, dest } = require('gulp');

/* Configuration */
const {
  PATH,
} = require('./config.json');

function copy() {
  return src(PATH.public + '/**/*.*')
    .pipe(dest(PATH.dest));
}

// function copy() {
//   return src([
//     PATH.src + '../public/**/*.*'
//   ], { base: PATH.src })
//     .pipe(dest(PATH.dest));
// }

module.exports = copy;