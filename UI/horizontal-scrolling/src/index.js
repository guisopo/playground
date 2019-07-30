// import {TweenMax} from "gsap/TweenMax";
// var imagesLoaded = require('imagesloaded');
import "./main.scss";

// TO-DO
// 1. Speed is relative to the width of the content. Make it independent
// 2. DONE------Move content transform styles boilerplate to constructor
// 3. Fix transformations calculations (1500)
// 4. DONE------Fix wheelY bug
// 5. Add content styles directly in the class
// 6. Manage image loading through JS
// 7. Create a class for images to make transforms with them
// 8. Add destroy method to be able to removeListeners
// 9. Add vertical option
// 10. RAF just when content is visible


class SweetScroll {
  constructor(options = {}) {
    this.options = {
      content: options.content,
      lerpFactor: options.lerpFactor || 0.1,
      scaleFactor: options.scaleFactor || 0.15,
      skewFactor: options.skewFactor || 4 
    }

    this.data = {
      current: 0,
      last: 0
    }

    this.renderedStyles = ''
    this.scrollingSpeed = 0;

    this.animatedStyles = {
      translateX: {
        animate: true,
        previous: 0,
        current: 0,
        setStyle: () => `translate3d(-${this.animatedStyles.translateX.current}px, 0, 0)`,
        setValue: () => {
          this.data.last = this.lerp(this.data.last, this.data.current, this.options.lerpFactor);
          this.data.last = Math.floor(this.data.last* 1000) / 1000;
          return this.data.last;
        }
      },
      skewX: {
        animate: true,
        previous: 0,
        current: 0,
        setStyle: () => `skewX(${this.animatedStyles.skewX.current}deg)`,
        setValue: () => {
          const fromValue = this.options.skewFactor * -1;
          const toValue = this.options.skewFactor;
          return Math.floor(this.map(this.scrollingSpeed, -1500, 1500, fromValue, toValue));
        }
      },
      scale: {
        animate: true,
        previous: 1,
        current: 1,
        setStyle: () => `scale(${this.animatedStyles.scale.current})`,
        setValue: () => {
          const fromValue = this.options.scaleFactor * -1;
          const toValue = this.options.scaleFactor;
          return 1 - Math.abs(Math.floor((this.map(this.scrollingSpeed, -1500, 1500, fromValue, toValue))* 1000) / 1000);
        }
      },
    };

    this.windowSize = {};
    this.contentWidth = 0;
    
    this.styles = '';

    this.rAF = null;

    this.init();
  }

  bindAll() {
    ['wheel', 'run', 'setBounds']
      .forEach( fn => this[fn] = this[fn].bind(this));
  }

  clamp(x, min, max) {
    return Math.min(Math.max(x, min), max);
  }

  map (x, a, b, c, d) {
    return (x - a) * (d - c) / (b - a) + c;
  } 

  lerp (a, b, n) {
    return (1 - n) * a + n * b;
  }

  wheel(e) {
    const wheelDelta  = e.deltaY || e.deltaX;
    this.data.current += wheelDelta;
  }

  setBounds() {
    this.windowSize = {
      width: window.innerWidth,
      height: window.innherHeight
    };
    this.contentWidth = this.options.content.offsetWidth - this.windowSize.width;
  }

  run() {
    this.data.current = this.clamp(this.data.current, 0, this.contentWidth)
    this.scrollingSpeed = this.data.current - this.data.last;
    
    this.options.content.style.transform = this.styles;
    
    this.styles = '';
    for (const key in this.animatedStyles) {
      this.styles += this.animatedStyles[key].setStyle();
      this.animatedStyles[key].current = this.animatedStyles[key].setValue();
    }
    
    requestAnimationFrame(() => this.run());
  }

  addEvents() {
    window.addEventListener('wheel', this.wheel, { passive: true });
    window.addEventListener('resize', this.setBounds);
  }

  // requestAnimationFrame() {
  //   this.rAF = c;
  // }

  init() {
    this.bindAll();
    this.setBounds();
    this.addEvents();
    this.run();
  }
}

const smooth = new SweetScroll({content: document.querySelector('[data-scroll-content]')});