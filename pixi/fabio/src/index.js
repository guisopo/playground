import "./main.scss";
import * as PIXI from 'pixi.js';
import {TweenMax} from 'gsap';
import fragment from './shaders/fragment.glsl';

let img0 = require('./images/pic-1.jpeg');
let img1 = require('./images/pic-2.jpeg');
let img2 = require('./images/pic-3.jpeg');

const nav = document.querySelector('.nav');
let index = 0;

[...nav.children].forEach(link => {
  link.id = index;
  index += 1;
});


const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight
});

document.body.appendChild(app.view);

const loader = new PIXI.Loader();

loader.add('img0', img0);
loader.add('img1', img1);
loader.add('img2', img2);



// load the texture we need
loader.load((loader, resources) => {

  let Filter = new PIXI.Filter(null, fragment);
  

  const bunny = new PIXI.Sprite(resources.img0.texture);

    // Setup the position of the img
    bunny.x = app.renderer.width / 2;
    bunny.y = app.renderer.height / 2;

    // Rotate around the center
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;

    // Calculate window and image Aspect Ratio
    const winAspectRatio = window.innerWidth/window.innerHeight;
    const imageAspectRatio = resources.img1.texture.width/resources.img1.texture.height;

    // Create uniform with aspect ratio value
    if(winAspectRatio > imageAspectRatio) {
      Filter.uniforms.uvAspect = {x: 1., y: imageAspectRatio/winAspectRatio};
    } else {
      Filter.uniforms.uvAspect = {x: winAspectRatio/imageAspectRatio, y: 1.};
    }

    bunny.filters = [Filter];

    Filter.uniforms.uTextureOne = resources.img1.texture;
    Filter.uniforms.uTextureTwo = resources.img2.texture;
    Filter.uniforms.uProgress = 0.;
    // Add the img to the scene we are building
    app.stage.addChild(bunny);

    nav.addEventListener('mouseover', (e) => {
      const to = e.target.id;

    });

    // Listen for frame updates
    app.ticker.add(() => {
      Filter.uniforms.uTime += 0.02;
    });
});