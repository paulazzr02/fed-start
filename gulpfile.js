/* Imports */
const { series, parallel, watch } = require('gulp');

/* Configuration */
const {
  APP,
  CSS,
  ESM,
  FAVICONS,
  FONTS,
  HTMLS,
  ICONS,
  IMAGES,
  JS,
  PATH,
} = require('./gulp-tasks/config.json');
const production = require('./gulp-tasks/helper/mode');

/* Tasks */
const {
  archive,
  browserReload,
  clean,
  css,
  favicons,
  fonts,
  htmls,
  icons,
  images,
  js,
  serve,
} = require('./gulp-tasks');


/* Archive */
const archiveTask = series(archive);

/* Build */
const buildTask = series(clean, parallel(css, favicons, fonts, icons, images, js, htmls));

/* Watching */
const watchTask = series(buildTask, serve, () => {
  // css
  watch(PATH.src + CSS.src, series(css, browserReload));
  // favicons
  watch(PATH.src + FAVICONS.src, series(favicons, browserReload));
  // fonts
  watch(PATH.src + FONTS.src, series(fonts, browserReload));
  // htmls
  watch(PATH.src + HTMLS.src, series(htmls, browserReload));
  // icons
  watch(PATH.src + ICONS.src, series(icons, browserReload));
  // images
  watch(PATH.src + IMAGES.src, series(images, browserReload));
  // javascript
  watch(PATH.src + JS.src, series(js, browserReload));
});

/* Exports */
module.exports = {
  default: production ? series(buildTask) : series(watchTask),
  archive: archiveTask,
  build: buildTask,
  watch: watchTask,
};
