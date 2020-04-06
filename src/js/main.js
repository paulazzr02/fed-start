// FILE: main.js

// from node_modules folder
import 'matchmedia-polyfill'
import 'matchmedia-polyfill/matchMedia.addListener'
import jQuery from 'jquery'
window.$ = window.jQuery = jQuery
import 'retinajs/dist/retina'
import SimpleScrollbar from 'simple-scrollbar'
import 'bootstrap'

import Dom from './modules/dom'

/* foreach polyfill */
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

/**
 * Element.matches() polyfill (simple version)
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
 */
if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

const log = console.log
const body = document.body

const mediaQueryList = matchMedia('screen and (max-width: 767px) and (orientation: portrait)')
const detectMediaSize = () => {

  if ( mediaQueryList.matches ) {
    // log('Mobile');
    Dom.removeClass(body, 'contextual-sidebar')
    Dom.addClass(body, 'contextual-sidebar-mobile')
  } else {
    // log('PC');
    Dom.removeClass(body, 'contextual-sidebar-mobile')
    Dom.addClass(body, 'contextual-sidebar')
  }

}

const handleSidebarToggle = () => Dom.toggleClass(body, 'contextual-sidebar-active')

// App
const app = () => {

  // Toggle sidebar
  detectMediaSize()

  // Scroll menu using simple-scrollbar
  const scrollDivs = document.querySelectorAll('.js-simple-scrollbar')
  scrollDivs.forEach((el) => SimpleScrollbar.initEl(el))

  // Customize Bootstrap Accordion
  $('.collapse').on('show.bs.collapse', function() {
    $(this).parent('li').addClass('active')
  });
  $('.collapse').on('hide.bs.collapse', function() {
    $(this).parent('li').removeClass('active')
  });
  $('.js-collapse-nav').click(function() {
    $(this).next().collapse('toggle')
  });
  $('#accordionMenu').find('.collapse:first')
    .addClass('show')
    .parent('li')
    .addClass('active')

};

document.addEventListener('DOMContentLoaded', app, false)
document.querySelector('.body-overlay').addEventListener('click', handleSidebarToggle)
document.querySelector('.js-toggle-sidebar').addEventListener('click', handleSidebarToggle)

// Auto resizing textarea height
// const dataAutoResizing = (el) => {
//   element.style.boxSizing = 'border-box';
//   let offset = element.offsetHeight - element.clientHeight;
//   document.addEventListener('input', (e) => {
//     e.target.style.height = 'auto';
//     e.target.style.height = e.target.scrollHeight + offset + 'px';
//   });
//   element.removeAttribute('data-autoresize');
// }

// function scrollToTop() {
//   (function smoothscroll() {
//     var y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
//     if (y > 0) {
//       window.requestAnimationFrame(smoothscroll);
//       window.scrollTo(0, y - (y / 5));
//     }
//   })();
// }

// const bodyEl = document.querySelector('body'),
//     headerEl = document.querySelector('header'),
//     mainEl = document.querySelector('.main-container'),
//     uHeight = utilbar.offsetHeight;
//
// const scrollToTopBtn = document.querySelector('.scroll-to-top'),
//     onWindowScrollClass = 'onWindowScroll',
//     showClass = 'show';
//
// function onScroll() {
//     window.addEventListener('scroll', _.throttle(callbackFunc, 150));
//     // window.addEventListener("scroll", callbackFunc);
//
//     function callbackFunc() {
//         var y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
//         if (y > uHeight) {
//             bodyEl.classList.add(onWindowScrollClass);
//             scrollToTopBtn.classList.add(showClass);
//         } else {
//             bodyEl.classList.remove(onWindowScrollClass);
//             scrollToTopBtn.classList.remove(showClass);
//         }
//     }
// }

// const app = () => {
//     const scrollDivs = document.querySelectorAll('.js-simple-scrollbar');
//     scrollDivs.forEach((el) => {
//       SimpleScrollbar.initEl(el);
//     });
//
//     const autoResizeableTextareas = document.querySelectorAll('[data-autoresize]');
//     autoResizeableTextareas.forEach((el) => {
//       dataAutoResizing(el)
//     });
//
//     // onScroll();
// };
// document.addEventListener('DOMContentLoaded', app);
//
// let rtime, timeout = false, delta = 200;
// const doneResizing = () => {
//   if (new Date() - rtime < delta) {
//     setTimeout(doneResizing, delta);
//   } else {
//     timeout = false;
//     app;
//     console.log('Done resizing');
//   }
// }
// // Window resizing...
// window.addEventListener('resize', () => {
//   rtime = new Date();
//   if (timeout === false) {
//     timeout = true;
//     setTimeout(doneResizing, delta);
//   }
// });
