// FILE: layout.js

import { Dom } from './';

const body = document.body;
const BREAKPOINT = 1200;
const HEADER_HEIGH = 0;
const HEADER_HEIGH_MOBILE = 0;

export const Layout = {
  header: null,
  footer: null,
  content: null,

  init(header, footer, content) {
    this.header = header;
    this.footer = footer;
    this.content = content;

    let breakpoint = this.getBreakpoint();
    this.displayBreakpoint();
    this.setContentMinHeight();
  },

  getBreakpoint() {
    return window.getComputedStyle(body, ':before').
      content.
      replace(/\"/g, '');
  },

  displayBreakpoint() {
    let breakpoint;
    breakpoint = this.getBreakpoint();

    switch (breakpoint) {
      case 'xs':
        return console.log(`current-breakpoint is ${breakpoint}
              , Extra small devices (portrait phones)`);
        break;
      case 'sm':
        return console.log(`current-breakpoint is ${breakpoint}
              , Small devices (portrait phone to Landscape phone)`);
        break;
      case 'md':
        return console.log(`current-breakpoint is ${breakpoint}
              , Medium devices (Landscape phone to portrait tablet)`);
        break;
      case 'lg':
        return console.log(`current-breakpoint is ${breakpoint}
              , Large devices (Portrait tablet to landscape and desktop)`);
        break;
      case 'xl':
        return console.log(`current-breakpoint is ${breakpoint}
              , Extra large devices (Landscape tablet and large desktop)`);
        break;
      case 'xxl':
        return console.log(`current-breakpoint is ${breakpoint}
              , Double extra large devices (extra large desktop)`);
        break;
      default:
        return (`current-breakpoint is others`)
    }
  },

  getHeight(element) {
    // return element.offsetHeight;
    console.log('getHeight: ' + (element.innerHeight || element.clientHeight));
    return element.innerHeight || element.clientHeight
  },

  setContentMinHeight() {
    let bodyH, headerH, footerH;
    bodyH   = Dom.documentHeight();
    headerH = (window.innerWidth <= BREAKPOINT) ? HEADER_HEIGH_MOBILE : HEADER_HEIGH;
    footerH = this.getHeight(this.footer);
    this.content.style.minHeight = (bodyH - headerH - footerH) + 'px';
    // console.log('Dom.documentHeight(): ' + Dom.documentHeight() + ', Dom.windowHeight: ' + Dom.windowHeight())
    // console.log('bH: ' + bodyH + ', hH: ' + headerH + ', fH: ' + footerH)
  }

};
