const { src, dest } = require('gulp');
const zip = require('gulp-zip');

/* Configuration */
const {
  PATH,
} = require('./config.json');

// Archive
function archive() {
  return src(PATH.base + '**/*')
    .pipe(zip(`${process.env.npm_package_name}.zip`))
    .pipe(dest('./'));
}

module.exports = archive;
