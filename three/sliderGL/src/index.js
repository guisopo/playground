import "./main.scss";
import { TimelineMax } from 'gsap';
import * as PIXI from 'pixi.js'

document.body.addEventListener('click', () => {
  let tl = new TimelineMax();
  tl
    .to('.slider__1 .slider__wrap', 0, {x:'-100%'})
    .to('.slider__2 .slider__wrap', 0.01, {x:'-100%'})
    .to('.slider__3 .slider__wrap', 0.02, {x:'-100%'});
});


// WEB-GL

const app = new PIXI.Application(900,600);
 	document.getElementById('webgl').appendChild(app.view);


 	// Create background image
 	const background = PIXI.Sprite.fromImage('img/5_.jpg');
 	const oldimage = PIXI.Sprite.fromImage('img/6_.jpg');
 	background.width = app.renderer.width;
 	background.height = app.renderer.height;


 
 	app.stage.addChild(background);


 	// Stop application wait for load to finish
 	app.stop();

 	PIXI.loader.add('shader', 'js/shader.js')
 	    .load(onLoaded);

 	var filter;


 	function onLoaded(loader,res) {


 	    filter = new PIXI.Filter(null, res.shader.data);

 	    background.filters = [filter];

 	    filter.uniforms.currentimage = background._texture;
 	    filter.uniforms.oldimage = oldimage._texture;
 	    filter.uniforms.time = 0;
 	    app.start();
 	}


 	app.ticker.add(function(delta) {

});