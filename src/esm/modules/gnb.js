// FILE: gnb.js

import { Dom } from './'

export const Gnb = {
  element: null,

  init(element) {
    this.element = element;
    this.items = Array.from(this.element.children);

    this.subItemsDropdown()

  },

  subItemsDropdown() {
    this.items.forEach(item => {
      if (item.getElementsByClassName('subnav').length < 1) return;

      Dom.toggleClass(item, 'dropdown');

      const dropdownToggler = item.getElementsByClassName('nav-link');
      dropdownToggler.forEach(item => {
        Dom.toggleClass(item, 'dropdown-toggler');
        (item.dataset.toggle !== 'dropdown') ? item.setAttribute('data-toggle', 'dropdown') : item.removeAttribute('data-toggle');
      });

      const dropdownMenus = item.getElementsByClassName('subnav');
      dropdownMenus.forEach(item => {
        Dom.toggleClass(item, 'dropdown-menu');
      });

      const dropdownItems = item.getElementsByClassName('subnav-link');
      dropdownItems.forEach(item => {
        Dom.toggleClass(item, 'dropdown-item');
      });
    });
  },

  getBreakpoint() {
    return window.getComputedStyle(body, ':before').
      content.
      replace(/\"/g, '');
  },

  checkResponsiveBreakpoint() {
    let breakpoint;
    breakpoint = this.getBreakpoint();

    return (breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md' || breakpoint === 'lg');
  }
};
