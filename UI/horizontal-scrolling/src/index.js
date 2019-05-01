import {TweenMax} from "gsap/TweenMax";
var imagesLoaded = require('imagesloaded');
import "./main.scss";

class Smooth {
  constructor() {
    this.bindAll();

    this.el = document.querySelector('[data-scroll]');
    this.content = document.querySelector('[data-scroll-content]');
    this.skew = 0;
    this.dom = {
      el: this.el,
      content: this.content,
      elements: [...this.content.querySelectorAll('.js-slide')],
    }

    this.data = {
      total: this.dom.elements.length -1,
      current: 0,
      last: {}
    }

    this.bounds = {
      elem: 0,
      content: 0,
      width: 0,
      max: 0,
      min: 0
    }

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

    elements.forEach((element, index) => {
      
      const bounds = element.getBoundingClientRect();

    })
  }

  scroll() {

  }

  run() {

  }
  

  resize() {

  }

  clamp(x) {
    this.skew = Math.min(Math.max(x, -15), 15);
  }

  addEvents() {
    var moveX = 0;
    window.addEventListener('wheel', (e) => {
      const x  = e.deltaY;
      moveX = moveX + x;
      this.clamp(x);
      const width = this.content.getBoundingClientRect().width - window.innerWidth;
      let delta = (this.content.getBoundingClientRect().width - window.innerWidth) - moveX;
      if(delta > 0 && delta < width) {
        this.content.style.transform = `translate3d(-${moveX}px, 0, 0) skewX(${this.skew}deg)`;
      } else if (delta < 0) {
        moveX = width;
        delta = 0;
        this.content.style.transform = `translate3d(-${width}px, 0, 0)`;
      } else if (delta > width) {
        moveX = 0;
        delta = width;
        this.content.style.transform = `translate3d(0px, 0, 0)`;
      }
      console.log(this.skew);
    });
  }

  on() {
    this.setBounds(this.dom.elements);
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