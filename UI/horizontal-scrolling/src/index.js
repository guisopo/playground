require('normalize.css');
import "./main.scss";

// [].forEach.call(document.querySelectorAll("*"),function(a){a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)})
const clamp = (x, min, max) => Math.min(Math.max(x, min), max);
const lerp = (a, b, n) => (1 - n) * a + n * b;

class SweetScroll {
  constructor(slider) {
    this.slider = slider;

    this.windowSize = {};
    this.offsetWidth = 0;
    this.lerpFactor = 0.1;

    this.data = {
      current: 0,
      last: 0,
      scrollingSpeed: 0
    };

    this.renderStyles = {
      translateX: {
        previous: 0,
        current: 0,
        setStyle: () => `translate3d(-${this.renderStyles.translateX.current}px, 0, 0)`,
        setValue: () => {
          return this.data.last;
        }
      },
      scale: {
        previous: 1,
        current: 1,
        setStyle: () => `scaleY(${this.renderStyles.scale.current})`,
        setValue: () => {
          return 1 - (clamp(Math.abs(this.data.scrollingSpeed), 0, 30)/100) * 2;
        }
      }
    }

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

  calculateSpeed() {
    this.data.current = clamp(this.data.current, 0, this.offsetWidth);

    this.data.last = lerp(this.data.last, this.data.current, this.lerpFactor);
    this.data.last = Math.floor(this.data.last * 10000) / 10000;

    this.data.scrollingSpeed = Math.floor(this.data.current - this.data.last) / 100;
  }

  run() {
    this.calculateSpeed();
    
    this.slider.style.transform = this.styles;

    this.styles = '';
    for (const key in this.renderStyles) {
      this.styles += this.renderStyles[key].setStyle();
      this.renderStyles[key].current = this.renderStyles[key].setValue();
    }
    
    requestAnimationFrame(() => this.run());
  }
}

const slider = document.querySelector('.scroll');
const sweetSlider = new SweetScroll(slider);