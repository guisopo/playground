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

  clamp(x, bound) {
    return Math.min(Math.max(x, -bound), bound);
  }

  lerp (a, b, n) {
    return (1 - n) * a + n * b
  }

  wheel(e) {
    this.x  = e.deltaY || e.deltaX;
    this.moveX = this.moveX + this.x;
    this.data.current = this.moveX;
  }

  run() {
    const width = this.content.getBoundingClientRect().width - window.innerWidth;
    let   delta = (this.content.getBoundingClientRect().width - window.innerWidth) - this.moveX;
    
    this.skew = this.clamp(this.x, 500)/10;
    this.scale = 1 - this.clamp(Math.abs(this.x), 1000)/1000;
    
    this.data.last = this.lerp(this.data.last, this.data.current, 0.095);
    this.data.last = Math.floor(this.data.last * 100) / 100;
    
    const diff = this.data.current - this.data.last;
    const acc = Math.floor(diff / width * 100) / 100;
    const velo =+ acc;
    const bounce = 1 - Math.abs(velo * 0.25);
    const skew = velo * 10;
    
    if (delta < 0) {
      this.moveX = width;
      delta = 0;
    } else if (delta > width) {
      this.moveX = 0;
      delta = width;
    }

    this.content.style.transform = `translate3d(-${this.data.last }px, 0, 0) 
                                    skewX(${skew}deg)
                                    scale(${bounce})`;

    this.requestAnimationFrame();
  }

  addEvents() {
    window.addEventListener('wheel', this.wheel);
  }
  
  requestAnimationFrame() {
    this.rAF = requestAnimationFrame(this.run);
  }
  
  on() {
    this.addEvents();
    this.requestAnimationFrame();
  }

  init() {
    this.on();
  }
}

const smooth = new Smooth;