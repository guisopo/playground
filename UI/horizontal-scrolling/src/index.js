import {TweenMax} from "gsap/TweenMax";
var imagesLoaded = require('imagesloaded');
import "./main.scss";

// TO-DO
// 1. Speed is related to the width of the content. Make it independent
// 2. Move content transform styles boilerplate to constructor
// 3. Fix transformations calculations
// 4. Fix wheelY bug
// 5. Add styles directly in the class
// 6. Manage image loading through JS
// 7. Create a class for images to make transforms with them
// 8. Add destroy method to be able to removeListeners
// 9. Add vertical option


class Smooth {
  constructor(options = {}) {
    this.options = {
      content: options.content,
      lerpFactor: options.lerpFactor || 0.095,
      scaleFactor: options.scaleFactor || 0.15,
      skewFactor: options.skewFactor || 3
    }

    this.data = {
      current: 0,
      last: 0
    }

    this.windowSize = {};
    this.contentWidth = 0;
    
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
    this.data.current = this.clamp(this.data.current, 0, this.contentWidth)
  }

  setBounds() {
    this.windowSize = {
      width: window.innerWidth,
      height: window.innherHeight
    };
    this.contentWidth = this.options.content.offsetWidth - this.windowSize.width;
  }

  run() {
    this.data.last = this.lerp(this.data.last, this.data.current, this.options.lerpFactor);
    this.data.last = Math.floor(this.data.last * 100) / 100;

    let scrollingSpeed = this.data.current - this.data.last;
    
    const scale = 1 - Math.abs(this.map(scrollingSpeed, -1500, 1500, -this.options.scaleFactor, this.options.scaleFactor));
    const skew = this.map(scrollingSpeed, -1500, 1500, -this.options.skewFactor, this.options.skewFactor);

    this.options.content.style.transform = `translate3d(-${this.data.last}px, 0, 0) 
                                    skewX(${skew}deg)`;
    
    this.requestAnimationFrame();
  }

  addEvents() {
    window.addEventListener('wheel', this.wheel);
    window.addEventListener('resize', this.setBounds);
  }
  
  requestAnimationFrame() {
    this.rAF = requestAnimationFrame(this.run);
  }

  init() {
    this.bindAll();
    this.setBounds();
    this.addEvents();
    this.requestAnimationFrame();
  }
}

const smooth = new Smooth({content: document.querySelector('[data-scroll-content]')});