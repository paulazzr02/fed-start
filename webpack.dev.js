const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',

  devtool: 'inline-source-map',

  // devServer: {
  //   contentBase: path.join(__dirname, '/dist'), // serve your static files from here
  //   watchContentBase: true, // initiate a page refresh if static content changes
  //   proxy: [ // allows redirect of requests to webpack-dev-server to another destination
  //     {
  //       context: ['/api', '/auth'],  // can have multiple
  //       target: 'http://localhost:8080', // server and port to redirect to
  //       secure: false,
  //     },
  //   ],
  //   port: 3030, // port webpack-dev-server listens to, defaults to 8080
  //   overlay: { // Shows a full-screen overlay in the browser when there are compiler errors or warnings
  //     warnings: false, // defaults to false
  //     errors: false, // defaults to false
  //   },
  // },

  module: {},

  plugins: [],
});
