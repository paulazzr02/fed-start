const { src, dest } = require('gulp');

/* Configuration */
const {
  PATH,
} = require('./config.json');

function copy() {
  return src('public/**/*.*')
    .pipe(dest(PATH.dest));
}

module.exports = copy;