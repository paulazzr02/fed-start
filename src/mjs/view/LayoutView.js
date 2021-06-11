import View from './View.js';

export default class extends View {
  constructor(el) {
    super(el);
    this.headerEl = this.qs('.layout-header');
    this.mainEl = this.qs('.layout-main');
    this.footerEl = this.qs('.layout-footer');
  }

  bind(bindCmd) {
    const bindCommands = {
      load: () => {
        this.setContentHeight();
      },
    };

    bindCommands[bindCmd]();
    return this;
  }

  setContentHeight() {
    let height =
      this.getBodyHeight() -
      this.headerEl.offsetHeight -
      this.footerEl.offsetHeight;
    this.mainEl.style.minHeight = height + 'px';
  }

  getBodyHeight() {
    if (window.innerHeight > 0) {
      return window.innerHeight;
    } else {
      return document.documentElement.clientHeight;
    }
  }
}
