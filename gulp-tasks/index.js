const { series, parallel, watch } = require('gulp');

const font = require('./font');
const image = require('./image');
const clean = require('./clean');
const copy = require('./copy');
const css = require('./css');
const mjs = require('./mjs');
const html = require('./html');
const icon = require('./icon');
const { serve, browserReload } = require('./serve');

/* Configuration */
const {
  CSS,
  IMG,
  HTML,
  ICON,
  JS,
  MJS,
  PATH,
} = require('./config.json');
const production = require('./helper/mode');

/* Build */
const buildTask = series(clean, parallel(copy, css, font, icon, image, html, mjs));

/* Dev */
const devTask = series(buildTask, serve, () => {
  // css
  watch(PATH.src + CSS.src, series(css, browserReload));
  // es6
  watch(PATH.src + MJS.src, series(mjs, browserReload));
  // image
  watch(PATH.src + IMG.src, series(image, browserReload));
  // html
  watch([PATH.src + HTML.src, PATH.src + HTML.basePath + '/*.html'], series(html, browserReload));
  // icon
  watch(PATH.src + ICON.src, series(icon, browserReload));
  // es5
  watch(PATH.public + JS.src, series(copy, browserReload));
});

/* Exports */
module.exports = {
  default: production ? series(buildTask) : series(devTask),
  build: buildTask,
  dev: devTask,
};
