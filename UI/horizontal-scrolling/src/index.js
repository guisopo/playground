require('normalize.css');
import "./main.scss";

// [].forEach.call(document.querySelectorAll("*"),function(a){a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)})

// TO DO
//  1. DONE Add touch to yout site
//  2. Load Images when scrolling
//  3. Lasse Pedersen / gavkag
//  4. Add custom pointer that reacts when click
//  5. Add parallax
//  6. Make vertical
//  7. Do it with pixi.js
//  8. Change drag variables naming to more clear ones
//  9. Make infinte gallery

class SweetScroll {
  constructor(slider) {
    this.slider = slider;
    this.styles = '';

    this.windowSize = {};
    this.offsetWidth = 0;
    this.lerpFactor = 0.1;

    this.dragSpeed = 5;
    this.initialTouchPos = null;
    this.initialSliderOffset = null;
    
    this.rafPending = false;
    this.isDragging = false;

    this.data = {
      current: 0,
      last: 0,
      mouseDown: 0,
      mouseUp: 0,
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
      scaleY: {
        previous: 1,
        current: 1,
        setStyle: () => `scaleY(${this.renderStyles.scaleY.current})`,
        setValue: () => {
          return 1 - (this.clamp(Math.abs(this.data.scrollingSpeed), 0, 30)/100) * 2;
        }
      }
    }
  }

  init() {
    this.bindAll();
    this.setBounds();
    this.setInitialStyles();
    this.addEvents();
    this.run();
  }

  bindAll() {
    ['setBounds', 'setInitialStyles', 'addEvents', 'wheel', 'run', 'drag', 'handleGestureStart', 'handleGestureMove', 'handleGestureEnd', 'getGesturePointFromEvent']
      .forEach( fn => this[fn] = this[fn].bind(this));
  }

  setBounds() {
    this.windowSize = {
      width: window.innerWidth,
      height: window.innherHeight
    };

    this.offsetWidth = this.slider.offsetWidth - this.windowSize.width;
  }

  setInitialStyles() {
    this.slider.style.willChange = 'transform';
    this.slider.style.userSelect = 'none';
    this.slider.style.cursor = 'grab';
  }

  addEvents() {
    // Check if pointer events are supported.
    if (window.PointerEvent) {
      // Add Pointer Event Listener
      this.slider.addEventListener('pointerdown', this.handleGestureStart, true);
      this.slider.addEventListener('pointermove', this.handleGestureMove, true);
      this.slider.addEventListener('pointerup', this.handleGestureEnd, true);
      this.slider.addEventListener('pointercancel', this.handleGestureEnd, true);
    } else {
      // Add Touch Listener
      this.slider.addEventListener('touchstart', this.handleGestureStart, true);
      this.slider.addEventListener('touchmove', this.handleGestureMove, true);
      this.slider.addEventListener('touchend', this.handleGestureEnd, true);
      this.slider.addEventListener('touchcancel', this.handleGestureEnd, true);

      // Add Mouse Listener
      this.slider.addEventListener('mousedown', this.handleGestureStart, true);
    }

    this.slider.addEventListener('wheel', this.wheel, { passive: true });
    window.addEventListener('resize', this.setBounds);
  }

  wheel(e) {
    const wheelDelta  = e.deltaY || e.deltaX;
    this.data.current += wheelDelta;
  }

  drag(e) {
    e.preventDefault();
    // this.data.current = this.data.mouseUp - ((e.pageX - this.data.mouseDown) * this.options.dragSpeed);
    this.data.current = this.initialSliderOffset - ((e.pageX - this.initialTouchPos.x) * this.dragSpeed);
  }

  getGesturePointFromEvent(e) {
    const point = {};

    if(e.targetTouches) {
      // Prefer Touch Events
      point.x = e.targetTouches[0].clientX;
      point.y = e.targetTouches[0].clientY;
    } else {
      // Either Mouse event or Pointer Event
      point.x = e.clientX;
      point.y = e.clientY;
    }

    return point;
  }

  handleGestureStart(e) {
    e.preventDefault();

    this.slider.removeEventListener( 'wheel', this.wheel, { passive: true });

    if(e.touches && e.touches.length > 1) {
      return;
    }

    this.rafPending = false;

    // Add the move and end listeners
    if (window.PointerEvent) {
      // Allows events for a particular pointer event to be re-targeted to an element instead of the normal target at a pointer's location. 
      // Used to ensure that an element continues to receive pointer events even if the pointer device's contact moves off the element (such as by scrolling or panning).
      e.target.setPointerCapture(e.pointerId);
    } else {
      // Add Mouse Listeners
      document.addEventListener('mousemove', this.handleGestureMove, true);
      document.addEventListener('mouseup', this.handleGestureEnd, true);
    }

    this.initialTouchPos = this.getGesturePointFromEvent(e);
    this.initialSliderOffset = this.data.current;

    this.slider.style.transition = 'initial';
    this.isDragging = true;
  }

  handleGestureMove(e) {
    e.preventDefault();

    if(!this.isDragging || !this.initialTouchPos) return;

    this.drag(e);
  }

  handleGestureEnd(e) {
    e.preventDefault();

    this.isDragging = false;

    this.slider.addEventListener('wheel', this.wheel, { passive: true });

    if(e.touches && e.touches.length > 0) {
      return;
    }
  
    this.rafPending = false;
  
    // Remove Event Listeners
    if (window.PointerEvent) {
      e.target.releasePointerCapture(e.pointerId);
    } else {
      // Remove Mouse Listeners
      document.removeEventListener('mousemove', this.handleGestureMove, true);
      document.removeEventListener('mouseup', this.handleGestureEnd, true);
    }
    
    this.initialTouchPos = null;
    this.initialSliderOffset = this.data.current;
  }

  calculateScrollingSpeed() {
    this.data.last = this.lerp(this.data.last, this.data.current, this.lerpFactor);
    this.data.scrollingSpeed = Math.floor(this.data.current - this.data.last) / 100;
  }

  run() {
    // Clamp between 0 and slider width
    this.data.current = this.clamp(this.data.current, 0, this.offsetWidth);
    
    // Apply styles to slider
    this.slider.style.transform = this.styles;
    
    this.calculateScrollingSpeed();

    // Reset style property
    this.styles = '';

    for (const key in this.renderStyles) {
      // Add styles to style property
      this.styles += this.renderStyles[key].setStyle();
      // Calculate style
      this.renderStyles[key].current = this.renderStyles[key].setValue();
    }

    requestAnimationFrame(() => this.run());
  }

  clamp (x, min, max) {
    return Math.min(Math.max(x, min), max);
  }

  lerp (a, b, n) {
    return (1 - n) * a + n * b;
  } 
}

const slider = document.querySelector('.scroll');
const sweetSlider = new SweetScroll(slider);
sweetSlider.init();