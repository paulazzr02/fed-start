// FILE: main.js

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import jQuery from 'jquery'
window.$ = window.jQuery = jQuery;
import 'retinajs/dist/retina'
import 'bootstrap'

import { Dom } from './modules';

const log  = console.log;
const body = document.body;

// Start ~!!
const handleDomContentLoaded = () => {

  log( 'DOM loaded' )

};
window.addEventListener('DOMContentLoaded', handleDomContentLoaded);


// 리사이징
const handleResize = () => {

  log( 'Done resizing' )

};
window.addEventListener('resize', handleResize);


// 기기 모션 체크
const handleOrientationChange = () => {

  switch(window.orientation) {
    case -90: case 90:
      body.setAttribute('data-orientation', 'landscape');
      break;
    default:
      body.setAttribute('data-orientation', 'portrait');
      break
  }

  log( 'Done orientation changing' )

};
window.addEventListener('orientationchange', handleOrientationChange);
