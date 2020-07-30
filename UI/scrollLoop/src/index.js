import 'normalize-scss';
import './main.scss';

const winsize = {width: window.innerWidth, height: window.innerHeight};

class scrollLoop {
  constructor(element) {
    this.DOM = { element: element };
    this.DOM.menuItems = [...this.DOM.element.querySelectorAll('.menu__item')];

    this.cloneItems();
    this.initScroll();

    this.initEvents();

    requestAnimationFrame(() => this.render());
  }

  cloneItems() {
    const itemHeight = this.DOM.menuItems[0].offsetHeight;

    const fitIn = Math.ceil(winsize.height / itemHeight);

    this.DOM.element.querySelectorAll('.loop__clone').forEach(clone => this.DOM.element.removeChild(clone));

    let totalClones = 0;
    this.DOM.menuItems.filter((_, index) => (index < fitIn)).forEach(target => {
      const clone = target.cloneNode(true);
      clone.classList.add('loop__clone');
      this.DOM.element.appendChild(clone);
      ++totalClones;
    });
    this.clonesHeight = totalClones * itemHeight;
    this.scrollHeight = this.DOM.element.scrollHeight;
  }

  initScroll() {
    this.scrollPos = this.getScrollPos();
    if (this.scrollPos <= 0) {
      this.setScrollPos(1);
    }
  }

  scrollUpdate() {
    this.scrollPos = this.getScrollPos();

    if (this.clonesHeight + this.scrollPos >= this.scrollHeight) {
      this.setScrollPos(0);
    } else if (this.scrollPos <= 0) {
      this.setScrollPos(this.scrollHeight - this.clonesHeight);
    }
  }

  getScrollPos() {
    // console.log(`scrollTop: ${this.DOM.element.scrollTop}`);
    // console.log(`clientTop: ${this.DOM.element.clientTop}`);
    // console.log(`pageYOffset: ${window.pageYOffset}`);

    return (window.pageYOffset || this.DOM.element.scrollTop) - (this.DOM.element.clientTop || 0);
  }

  setScrollPos(position) {
    this.DOM.element.scrollTop = position;
  }

  initEvents() {
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.cloneItems();
    this.initScroll();
  }

  render() {
    this.scrollUpdate();
    requestAnimationFrame(() => this.render());
  }
}

const menu = new scrollLoop(document.querySelector('nav.menu'));