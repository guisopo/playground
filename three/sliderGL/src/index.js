import "./main.scss";
import { TimelineMax } from 'gsap';
import * as PIXI from 'pixi.js';

let state = {pos:0};

document.body.addEventListener('click', () => {
  let tl = new TimelineMax();
  // let tl1 = new TimelineMax();
  tl.to(state,1.5,{
		pos:1,
		onUpdate: function() {
			// let perc = '-'+state.pos*100+'%';
			// let perc1 = '-'+state.pos*state.pos*100+'%';
			// let perc2 = '-'+state.pos*state.pos*state.pos*100+'%';

			// tl1.set('.slider__1 .slider__wrap', {x:perc}, 0)
			// 	 .set('.slider__2 .slider__wrap', {x:perc1}, 0)
			// 	 .set('.slider__3 .slider__wrap', {x:perc2}, 0);

			filter.uniforms.time = state.pos;
		}
	});
});


// WEB-GL implementation

const app = new PIXI.Application(900,600);
document.getElementById('webgl').appendChild(app.view);


// Create background image
const background = PIXI.Sprite.fromImage('src/images/5_.jpg');
const oldImage = PIXI.Sprite.fromImage('src/images/6_.jpg');
background.width = app.renderer.width;
background.height = app.renderer.height;


 
app.stage.addChild(background);


// Stop application wait for load to finish
app.stop();

PIXI.loader.add('shader', 'src/shader.frag')
					 .load(onLoaded);

var filter;


function onLoaded(loader,res) {
	filter = new PIXI.Filter(null, res.shader.data);

	background.filters = [filter];

	filter.uniforms.currentImage = background._texture;
	filter.uniforms.oldImage = oldImage._texture;

	app.start();
}


app.ticker.add(function(delta) {

});