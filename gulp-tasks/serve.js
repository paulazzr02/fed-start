const browserSync = require('browser-sync');

/* Configuration */
const {
  APP,
  PATH,
  SERVER,
} = require('./config.json');

// Browsersync options
const syncOpts = {
  static: {
    server     : {
      baseDir  : PATH.dest,
    },
    port       : SERVER.port,
    // directory  : true,
    open       : false,
  },
  proxy: {
    proxy       : APP.proxyServer,
    files       : APP.watchFiles,
    notify      : false,
    ghostMode   : false,
    ui: {
      port: SERVER.port,
    }
  }
};

/* Serve */
const serve = (done) => {
  if (!APP.server) {
    browserSync.init(syncOpts.static);
  } else {
    browserSync.init(syncOpts.proxy);
  }
  done();
};

module.exports = serve;
