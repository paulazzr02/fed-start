// FILE: dom.js

// From node_modules folder

// How to use
// https://github.com/nickeljew/es6-dom
// removeClassByPrefix function 추가
// <div id="item1">Hello World</div>
// import dom from 'dom'
//
// let el = dom.nodeById(id)
// dom.addClass(el, 'info-list')

function animationFrame(tick) {
  (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
}

export const Dom = {

  isDescendant(parent, child) {
      let node = child.parentNode;

      while (node !== null) {
          if (node === parent) return true;
          node = node.parentNode
      }

      return false;
  },

  offset(el) {
      const rect = el.getBoundingClientRect()
          , body = document.body
          , html = document.documentElement
          , scrollTop = html && html.scrollTop ? html.scrollTop : body.scrollTop
          , scrollLeft = html && html.scrollLeft ? html.scrollLeft : body.scrollLeft;
      return {
          top: rect.top + scrollTop,
          left: rect.left + scrollLeft,
      }
  },

  getStyleAttributeAsNumber(el, attr) {
      const attrStyle = el.style[attr];
      let attrNum = 0;
      if (attrStyle && attrStyle.length) {
          attrNum = parseInt(attrStyle)
      }

      return attrNum
  },

  addClass(el, className) {
      if (el.classList)
          el.classList.add(className);
      else
          el.className += ' ' + className
  },

  removeClass(el, className) {
      if (el.classList)
          el.classList.remove(className);
      else
          el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
  },

  removeClassByPrefix(el, prefix) {
    const regx = new RegExp('\\b' + prefix + '.*?\\b', 'g');
    el.className = el.className.replace(regx, '');
    return el;
  },

  hasClass(el, className) {
      if (el.classList)
          return el.classList.contains(className);
      else
          return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className)
  },

  toggleClass(el, className) {
      if (this.hasClass(el, className))
          this.removeClass(el, className);
      else
          this.addClass(el, className)
  },

  setAttributes(el, attrs) {
    for (var key in attrs) {
      el.setAttribute(key, attrs[key])
    }
  },

  forceRedraw(el) {
      const originalDisplay = el.style.display;

      el.style.display = 'none';
      el.offsetHeight // no need to store this anywhere, the reference is enough
      el.style.display = originalDisplay
  },

  withoutTransition(el, callback) {
      let originalTransition = el.style.transition;

      //turn off transition
      el.style.transition = null;

      callback();

      //force a redraw
      this.forceRedraw(el);

      //put the transition back
      el.style.transition = originalTransition
  },

  nodeById(id) {
      return document.getElementById(id)
  },

  nodeBySelector(el, s) {
      return (el || document).querySelector(s)
  },

  nodesBySelector(el, s) {
      return (el || document).querySelectorAll(s)
  },

  text(el, text) {
      if (typeof text === 'string') {
          el && (el.innerText = text)
          return this
      }
      return el ? (el.innerText || el.textContent || '') : ''
  },

  documentWidth() {
      return Math.max(document.body.scrollWidth,
          document.body.offsetWidth,
          document.documentElement.clientWidth,
          document.documentElement.scrollWidth,
          document.documentElement.offsetWidth
      )
  },

  documentHeight() {
      return Math.max(document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight
      )
  },

  windowWidth() {
      return window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth
  },

  windowHeight() {
      return window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight
  },

  animate(tick, duration = 200, easing = 'linear') {
      const easings = {
          linear(t) {
              return t
          },
          easeInQuad(t) {
              return t * t
          },
          easeOutQuad(t) {
              return t * (2 - t)
          },
          easeInOutQuad(t) {
              return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
          },
          easeInCubic(t) {
              return t * t * t
          },
          easeOutCubic(t) {
              return (--t) * t * t + 1
          },
          easeInOutCubic(t) {
              return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
          },
          easeInQuart(t) {
              return t * t * t * t
          },
          easeOutQuart(t) {
              return 1 - (--t) * t * t * t
          },
          easeInOutQuart(t) {
              return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
          },
          easeInQuint(t) {
              return t * t * t * t * t
          },
          easeOutQuint(t) {
              return 1 + (--t) * t * t * t * t
          },
          easeInOutQuint(t) {
              return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
          },
      };

      const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

      const _tick = () => {
          const now = 'now' in window.performance ? performance.now() : new Date().getTime()
              , time = duration <= 0 ? 1 : Math.min(1, ((now - startTime) / duration));
          const percent = easings[easing](time);
          if (duration <= 0 || !tick(percent))
              return;

          animationFrame(_tick)
      };

      _tick()
  },

  // Throttle
  // 로직 실행 주기를 만드는 함수, 밀리세컨드마다 실행의 흐름을 일정하게 유지함
  // 연이은 이벤트의 Interval 단위 실행 보장 (실행 횟수 제한)
  //
  // 사용예.
  // 페이지의 스크롤 위치를 측정하고 최대 50ms 마다 응답하기를 바랄 경우에
  // 앱에서 요소를 드래그 할 때 좋은 성능을 보장하기 위해
  //
  // 사용법.
  // const myHandler = (event) => // do something with the event
  // const tHandler = throttle(myHandler, 200);
  // domNode.addEventListener('mousemove, tHandler);
  throttle(fn, delay) {
    let lastCall = 0;
    return function (...args) {
      const now = (new Date).getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return fn(...args);
    }
  },

  // Debounce
  // 연이어 호출되는 함수들 중 마지막 함수(또는 제일 처음)만 호출함
  // Interval 내 반복되는 이벤트 무시 (과다한 이벤트 실행 방지)
  //
  // 사용예.
  // ajax 검색 (사용자가 키보드 입력을 중지(예: 검색창) 할 때까지 ajax 이벤트를 발생시키지 않기 위해)
  // 사용자가 창 크기 조정을 멈출 때까지 기다렸다가 resizing event 사용하기 위해
  //
  // 사용법.
  // const myHandler = (event) => // do something with the event
  // const dHandler = debounce(myHandler, 200);
  // domNode.addEventListener('input', dHandler);
  debounce(fn, delay) {
    let timerId;
    return function (...args) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        fn(...args);
        timerId = null;
        }, delay);
    }
  },

  scrollTo(x, y, duration = 200, easing = 'linear') {
      const startX = window.pageXOffset
          , startY = window.pageYOffset
          , docW = dom.documentWidth()
          , docH = dom.documentHeight()
          , winW = dom.windowWidth()
          , winH = dom.windowHeight()
          , offsetLeft = Math.round(docW - x < winW ? docW - winW : x)
          , offsetTop = Math.round(docH - y < winH ? docH - winH : y);

      dom.animate(percent => {
          const scrollLeft =  Math.ceil((percent * (offsetLeft - startX)) + startX)
              , scrollTop = Math.ceil((percent * (offsetTop - startY)) + startY);

          window.scroll(scrollLeft, scrollTop);

          return (window.pageXOffset < offsetLeft || window.pageYOffset < offsetTop)

      }, duration, easing)
  },

};
