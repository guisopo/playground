import {TweenMax} from "gsap/TweenMax";
var imagesLoaded = require('imagesloaded');
import "./main.scss";

class Smooth {
  constructor() {
    console.log(this);
    this.bindAll();

    this.el = document.querySelector('[data-scroll]');
    this.content = [...document.querySelectorAll('[data-scroll-content]')];

    this.dom = {
      el: this.el,
      content: this.content,
      elements: [[...this.content[0].querySelectorAll('.js-slide')], [...this.content[1].querySelectorAll('.js-slide')]],
    }
  }

  bindAll() {
    ['scroll', 'run', 'resize']
    .forEach( fn => this[fn] = this[fn].bind(this));
  }

  scroll() {

  }

  run() {

  }

  resize() {

  }
}

const smooth = new Smooth;