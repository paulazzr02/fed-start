/* Imports */
const { series, parallel, watch } = require('gulp');

/* Configuration */
const {
  APP,
  CSS,
  ESM,
  FAVICON,
  HTML,
  ICONS,
  IMAGES,
  PATH,
} = require('./gulp-tasks/config.json');
const production = require('./gulp-tasks/helper/mode');

/* Tasks */
const {
  archive,
  browserReload,
  clean,
  css,
  esm,
  favicon,
  html,
  icons,
  images,
  serve,
} = require('./gulp-tasks');


/* Archive */
const archiveTask = series(archive);

/* Build */
const buildTask = series(clean, parallel(css, esm, favicon, icons, images, html));

/* Watching */
const watchTask = series(buildTask, serve, () => {
  // css
  watch(PATH.src + CSS.src, series(css, browserReload));
  // es6
  watch(PATH.src + ESM.src, series(esm, browserReload));
  // favicons
  // watch(PATH.src + FAVICON.src, series(favicon, browserReload));
  // htmls
  watch(PATH.src + HTML.src, series(html, browserReload));
  // icons
  watch(PATH.src + ICONS.src, series(icons, browserReload));
  // images
  watch(PATH.src + IMAGES.src, series(images, browserReload));
});

/* Exports */
module.exports = {
  default: production ? series(buildTask) : series(watchTask),
  archive: archiveTask,
  build: buildTask,
  watch: watchTask,
};
