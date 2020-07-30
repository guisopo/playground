import "./main.scss";
import {gsap} from 'gsap';

let speed = 0;
let position = 0;

document.addEventListener('wheel', (e) => {
  speed += e.deltaY * 0.0003;
});

function raf() {
  position += speed;
  speed *=0.9;
  (speed < 0.01 && speed > -0.01) ? speed = 0 : '';
  
  let i = Math.round(position);
  
  let diff = (i - position.toFixed(4));
  
  position += diff * 0.03;
  position > 16 ? position = 0 : '';
  position < -0.25 ? position = 16 : '';

  gsap.set('.dot', { y: position * 50 });
  
  let currentSlide = Math.floor(position);
  let nextSlide = ( currentSlide + 1 ) % 5;

  window.requestAnimationFrame(raf);
}

raf();