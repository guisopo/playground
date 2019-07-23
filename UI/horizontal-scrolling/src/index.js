import {TweenMax} from "gsap/TweenMax";
var imagesLoaded = require('imagesloaded');
import "./main.scss";

class Smooth {
  constructor(options = {}) {
    this.options = {
      content: options.content || document.querySelector('[data-scroll-content]'),
      lerpFactor: options.lerpFactor || 0.095,
      scaleFactor: options.scaleFactor || 1.25,
      skewFactor: options.skewFactor || 20
    }

    this.data = {
      current: 0,
      last: 0
    }

    this.winSize = {};
    this.contentWidth = 0;

    this.moveX = 0;
    
    this.rAF = null;

    this.init();
  }

  bindAll() {
    ['wheel', 'run', 'setBounds'].forEach( fn => this[fn] = this[fn].bind(this));
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
    this.moveX += wheelDelta;
    this.moveX = this.clamp(this.moveX, 0, this.contentWidth)
  }

  setBounds() {
    this.winSize = {
      width: window.innerWidth,
      height: window.innherHeight
    };
    this.contentWidth = this.options.content.clientWidth - this.winSize.width;
  }

  run() {
    this.data.current = this.moveX;
    this.data.last = this.lerp(this.data.last, this.data.current, this.options.lerpFactor);
    this.data.last = Math.floor(this.data.last * 100) / 100;
    
    const diff = this.data.current - this.data.last;
    const acc = Math.floor(diff / this.contentWidth * 10000) / 10000;
    
    let velo = 0;
    velo += acc;
    
    // const velo = acc;
    console.log(velo)

    const scale = 1 - Math.abs(velo/this.options.scaleFactor);
    const skew = velo * this.options.skewFactor;
    const rotate = velo * this.options.rotateFactor;

    // SKEW + SCALE OPTION
    this.options.content.style.transform = `translate3d(-${this.data.last}px, 0, 0) 
                                    skewX(${skew}deg)
                                    scale(${scale})`;
    
    // ROTATE OPTION
    // const transformOr = -(100 - (delta * 100 / width));
    // this.options.content.style.transformOrigin = `50% ${transformOr}%`;
    // this.options.content.style.transform = `translate3d(-${this.data.last}px, 0, 0)
    //                                 rotateY(${rotate}deg)`;

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

const smooth = new Smooth();