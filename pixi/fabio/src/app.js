import * as PIXI from 'pixi.js'
import './main.scss'
import fragment from './shader/fragment.glsl'

const app = new PIXI.Application({
    width: window.innerWidth, 
    height: window.innerHeight, 
    resizeTo: window 
});

document.body.appendChild(app.view);

let loader =  app.loader;
loader
    .add('rome', './src/images/rome.jpg')
    .add('venice', './src/images/venice.jpg')
    .add('milano', './src/images/milano.jpg');

let Filter;

loader.load((loader, resources) => {
    Filter = new PIXI.Filter(null, fragment);

    const texture = new PIXI.Sprite(resources.rome.texture);

    let windowAspect = window.innerWidth/window.innerHeight;
    let imageAspect = resources.rome.texture.width/resources.rome.texture.height;

    if(windowAspect > imageAspect) {
        Filter.uniforms.uvAspect ={x:1., y:imageAspect/windowAspect};
    } else {
        Filter.uniforms.uvAspect ={x:imageAspect/windowAspect, y:1.};
    }

    texture.filters = [Filter];
    
    Filter.uniforms.uTextureRome = resources.rome.texture;

    app.stage.addChild(texture);
});


const filter = new PIXI.Filter(null, fragment);

