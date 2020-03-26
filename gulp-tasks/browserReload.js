const browserSync = require('browser-sync');

// Browser Reload
function browserReload(done) {
  browserSync.reload();
  // browserSync.reload({ stream: true });
  done();
}

module.exports = browserReload;
