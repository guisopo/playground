import "./main.scss";
import { TimelineMax } from 'gsap';

document.body.addEventListener('click', () => {
  let tl = new TimelineMax();
  tl
    .to('.slider__1 .slider__wrap', 0, {x:'-100%'})
    .to('.slider__2 .slider__wrap', 0.01, {x:'-100%'})
    .to('.slider__3 .slider__wrap', 0.02, {x:'-100%'});
});