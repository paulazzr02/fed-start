// FILE: main.js

// From node_modules folder
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;
import 'retinajs/dist/retina';
import SimpleScrollbar from 'simple-scrollbar';
// import 'bootstrap/dist/js/bootstrap';
import 'bootstrap';

// Auto resizing textarea height
const dataAutoResizing = (el) => {
  element.style.boxSizing = 'border-box';
  let offset = element.offsetHeight - element.clientHeight;
  document.addEventListener('input', (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + offset + 'px';
  });
  element.removeAttribute('data-autoresize');
}

const app = () => {
    const scrollDivs = document.querySelectorAll('.js-simple-scrollbar');
    scrollDivs.forEach((el) => {
      SimpleScrollbar.initEl(el);
    });

    const autoResizeableTextareas = document.querySelectorAll('[data-autoresize]');
    autoResizeableTextareas.forEach((el) => {
      dataAutoResizing(el)
    });
};
document.addEventListener('DOMContentLoaded', app);

let rtime, timeout = false, delta = 200;
const doneResizing = () => {
  if (new Date() - rtime < delta) {
    setTimeout(doneResizing, delta);
  } else {
    timeout = false;
    app;
    console.log('Done resizing');
  }
}
// Window resizing...
window.addEventListener('resize', () => {
  rtime = new Date();
  if (timeout === false) {
    timeout = true;
    setTimeout(doneResizing, delta);
  }
});
