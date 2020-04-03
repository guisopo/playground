require('normalize.css');
import "./main.scss";

// [].forEach.call(document.querySelectorAll("*"),function(a){a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)})
const clamp = (x, min, max) => Math.min(Math.max(x, min), max);

class SweetScroll {
  constructor(slider) {
    this.slider = slider;

    this.windowSize = {};
    this.offsetWidth = 0;

    this.data = {
      current: 0,
      last: 0
    };

    this.init();
  }

  init() {
    this.bindAll();
    this.setBounds();
    this.addEvents();
    this.run();
  }

  bindAll() {
    ['setBounds', 'addEvents', 'wheel', 'run']
      .forEach( fn => this[fn] = this[fn].bind(this));
  }

  setBounds() {
    this.windowSize = {
      width: window.innerWidth,
      height: window.innherHeight
    };

    this.offsetWidth = this.slider.offsetWidth - this.windowSize.width;
  }

  addEvents() {
    this.slider.addEventListener('wheel', this.wheel, { passive: true });
    window.addEventListener('resize', this.setBounds);
  }

  wheel(e) {
    const wheelDelta  = e.deltaY || e.deltaX;
    this.data.current += wheelDelta;
    this.data.current = clamp(this.data.current, 0, this.offsetWidth);
  }

  run() {
    this.slider.style.transform = `translate3d(-${this.data.current}px, 0, 0)`;
    requestAnimationFrame(() => this.run());
  }
}

const slider = document.querySelector('.scroll');
const sweetSlider = new SweetScroll(slider);