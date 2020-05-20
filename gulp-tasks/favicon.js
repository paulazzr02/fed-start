const { src, dest, lastRun } = require('gulp');
const gulpFavicons = require('gulp-favicons');

/* Configuration */
const {
  FAVICON,
  PATH,
} = require('./config.json');
const pkg = require('../package.json');

const faviconConfig = {
  appName: pkg.name,
  appShortName: pkg.name,
  appDescription: pkg.description,
  developerName: pkg.author,
  developerURL: '',
  background: '#020307',
  path: 'favicon/',
  url: '',
  display: 'standalone',
  orientation: 'portrait',
  scope: '/',
  start_url: '/?homescreen=1',
  version: pkg.version,
  logging: false,
  html: 'index.html',
  pipeHTML: true,
  replace: true,
};

/* FAVICONS */
function favicon() {
  return src(PATH.src + FAVICON.entry, { since: lastRun(favicon), allowEmpty: true })
    .pipe(gulpFavicons(faviconConfig))
    .pipe(dest(PATH.dest + FAVICON.dest));
}

module.exports = favicon;
