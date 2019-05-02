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

    this.moveX = 0;
    this.skew = 0;
    this.scale = 0;

    this.rAF = null;

    this.init();
  }

  bindAll() {
    ['scroll', 'run', 'resize']
    .forEach( fn => this[fn] = this[fn].bind(this));
  }

  preload() {
    
  }

  setBounds(elements) {

  }

  scroll() {

  }

  run() {

  }
  

  resize() {

  }

  clamp(x, bound) {
    this.skew = Math.min(Math.max(x, -bound), bound);
  }

  addEvents() {
    window.addEventListener('wheel', (e) => {
      const x  = e.deltaY;
      this.moveX = this.moveX + x;

      this.skew = Math.min(Math.max(x, -10), 10);
      this.scale = 10/ Math.min(Math.max(x, 10), 15);

      const width = this.content.getBoundingClientRect().width - window.innerWidth;
      let delta = (this.content.getBoundingClientRect().width - window.innerWidth) - moveX;

      if(delta > 0 && delta < width) {
        this.content.style.transform = `translate3d(-${moveX}px, 0, 0) skewX(${this.skew}deg) scale(${this.scale})`;
      } else if (delta < 0) {
        moveX = width;
        delta = 0;
        this.content.style.transform = `translate3d(-${width}px, 0, 0)`;
      } else if (delta > width) {
        moveX = 0;
        delta = width;
        this.content.style.transform = `translate3d(0px, 0, 0)`;
      }
    });
  }

  on() {
    this.addEvents();
    this.requestAnimationFrame();
  }

  requestAnimationFrame() {

  }

  init() {
    this.preload();
    this.on();
  }
}

const smooth = new Smooth;