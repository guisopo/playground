import "./main.scss";
import {gsap} from 'gsap';

let speed = 0;
let position = 0;

document.addEventListener('wheel', (e) => {
  speed += e.deltaY * 0.0003;
});

function raf() {
  position += speed;
  speed *=0.7;

  let i = Math.round(position);
  let diff = i - position;
  
  position += diff * 0.03;
  position > 4.25 ? position = 0 : '';

  if(Math.abs(i - position) < 0.001) {
    position = i;
  }
  
  gsap.set('.dot', { y: position*200 });
  
  let currentSlide = Math.floor(position);
  
  let nextSlide = ( currentSlide + 1 ) % 5;

  window.requestAnimationFrame(raf);
}

raf();