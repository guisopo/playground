import {TweenMax} from "gsap/TweenMax";
var imagesLoaded = require('imagesloaded');
import "./main.scss";

class Smooth {
  constructor() {

    this.content = document.querySelector('[data-scroll-content]');

    this.data = {
      current: 0,
      last: 0
    }

    this.winSize = {};
    this.contentWidth = 0;

    this.moveX = 0;
    
    this.skew = 0;
    this.scale = 0;
    this.rotate = 0;
    
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
    this.contentWidth = this.content.clientWidth - this.winSize.width;
  }

  run() {
    this.data.current = this.moveX;
    this.data.last = this.lerp(this.data.last, this.data.current, 0.095);
    this.data.last = Math.floor(this.data.last * 100) / 100;
    
    const diff = this.data.current - this.data.last;
    const acc = Math.floor(diff / this.contentWidth * 10000) / 10000;
    const velo =+ acc;

    this.scale = 1 - Math.abs(velo/1.25);
    this.skew = velo * 20;
    this.rotate = velo * 20;

    // SKEW + SCALE OPTION
    this.content.style.transform = `translate3d(-${this.data.last}px, 0, 0) 
                                    skewX(${this.skew}deg)
                                    scale(${this.scale})`;
    
    // ROTATE OPTION
    // const transformOr = -(100 - (delta * 100 / width));
    // this.content.style.transformOrigin = `50% ${transformOr}%`;
    // this.content.style.transform = `translate3d(-${this.data.last}px, 0, 0)
    //                                 rotateY(${this.rotate}deg)`;

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

const smooth = new Smooth;