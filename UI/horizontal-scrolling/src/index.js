import {TweenMax} from "gsap/TweenMax";
var imagesLoaded = require('imagesloaded');
import "./main.scss";

class Smooth {
  constructor() {
    this.bindAll();

    this.el = document.querySelector('[data-scroll]');
    this.content = document.querySelector('[data-scroll-content]');
    
    this.dom = {
      el: this.el,
      content: this.content,
      elements: [...this.content.querySelectorAll('.js-slide')],
    }

    this.data = {
      current: 0,
      last: 0
    }

    this.x = 0;
    this.moveX = 0;
    this.skew = 0;
    this.scale = 0;

    this.rAF = null;

    this.init();
  }

  bindAll() {
    ['wheel', 'run']
    .forEach( fn => this[fn] = this[fn].bind(this));
  }

  wheel(e) {
    this.x  = e.deltaY;
    this.moveX = this.moveX + this.x;
  }

  run() {
    this.skew = this.clamp(this.x, 500)/10;
    this.scale = 1 - this.clamp(Math.abs(this.x), 1000)/1000;

    const width = this.content.getBoundingClientRect().width - window.innerWidth;
    let   delta = (this.content.getBoundingClientRect().width - window.innerWidth) - this.moveX;

    if(delta > 0 && delta < width) {
      this.content.style.transform = `translate3d(-${this.moveX}px, 0, 0) 
                                      skewX(${this.skew}deg)
                                      scale(${this.scale})`;
    } else if (delta < 0) {
      this.moveX = width;
      delta = 0;
      this.content.style.transform = `translate3d(-${this.moveX}px, 0, 0)`;
    } else if (delta > width) {
      this.moveX = 0;
      delta = width;
      this.content.style.transform = `translate3d(0px, 0, 0)`;
    }
    this.requestAnimationFrame()
  }

  clamp(x, bound) {
     return Math.min(Math.max(x, -bound), bound);
  }

  addEvents() {
    window.addEventListener('wheel', this.wheel);
  }

  on() {
    this.addEvents();
    this.requestAnimationFrame();
  }

  requestAnimationFrame() {
    this.rAF = requestAnimationFrame(this.run)
  }

  init() {
    this.on();
  }
}

const smooth = new Smooth;