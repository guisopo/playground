import "./main.scss";
import { TimelineMax } from 'gsap';

let state = {pos:0};

document.body.addEventListener('click', () => {
  let tl = new TimelineMax();
  let tl1 = new TimelineMax();
  tl
    .to(state, 2, {
      pos:1,
      onUpdate: function() {
        let percentage = `-${state.pos * 100}%`;
        let percentage1 = `-${state.pos*state.pos * 100}%`;
        let percentage2 = `-${state.pos*state.pos*state.pos * 100}%`;

        tl1
          .set('.slider__1 .slider__wrap', {x: percentage}, 0)
          .set('.slider__2 .slider__wrap', {x: percentage1}, 0)
          .set('.slider__3 .slider__wrap', {x: percentage2}, 0);
      }
    })
});