import "./main.scss";
import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import fragment from './shaders/fragment.glsl';

let img0 = require('./images/pic-1.jpeg');
let img1 = require('./images/pic-2.jpeg');
let img2 = require('./images/pic-3.jpeg');



class Window {

  constructor(columns, rows) {
    this.nav = document.querySelector('.nav');

    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight
    });

    this.Filter = new PIXI.Filter(null, fragment);
    this.loader = new PIXI.Loader();

    this.columns = columns;
    this.rows = rows;
  }

  bindAll() {
    ['handleMouseOver']
      .forEach( fn => this[fn] = this[fn].bind(this));
  }

  addNavIds() {
    let index = 0;

    [...this.nav.children].forEach(link => {
      link.id = index;
      index += 1;
    });
  }

  appendApp() {
    document.body.appendChild(this.app.view);
  }

  addTextures() {
    this.loader.add('img0', img0)
               .add('img1', img1)
               .add('img2', img2);
  }

  loadTextures() {
    this.loader.load((loader, resources) => {

      const bunny = new PIXI.Sprite(resources.img0.texture);
    
      // Calculate window and image Aspect Ratio
      const winAspectRatio = window.innerWidth/window.innerHeight;
      const imageAspectRatio = resources.img1.texture.width/resources.img1.texture.height;
  
      // Create uniform with aspect ratio value
      if(winAspectRatio > imageAspectRatio) {
        this.Filter.uniforms.uvAspect = {x: 1., y: imageAspectRatio/winAspectRatio};
      } else {
        this.Filter.uniforms.uvAspect = {x: winAspectRatio/imageAspectRatio, y: 1.};
      }
  
      bunny.filters = [this.Filter];

      this.Filter.uniforms.uTextureOne = resources.img1.texture;
      this.Filter.uniforms.uTextureTwo = resources.img2.texture;
      this.Filter.uniforms.uProgress = 0.;
      this.Filter.uniforms.uColumns = `${this.columns}.`;
      this.Filter.uniforms.uRows = `${this.rows}.`;
      console.log(this.Filter.uniforms);
      // Add the img to the scene we are building
      this.app.stage.addChild(bunny);
    });
  }

  handleMouseOver(e) {
    const to = e.target.id;

    gsap.to(this.Filter.uniforms, {
      duration: 0.75,
      uProgress: to,
      ease: 'Power3.easeOut',
      onUpdate: () => {
        let number = Math.floor(this.Filter.uniforms.uProgress);

        this.Filter.uniforms.uTextureOne = this.loader.resources[`img${number}`].texture;
        if(number<2) {
          this.Filter.uniforms.uTextureTwo = this.loader.resources[`img${number+1}`].texture;
        }
      }
    });
  }

  addEventListeners() {
    this.nav.addEventListener('mouseover', this.handleMouseOver, true);
  }

  init() {
    this.bindAll();
    this.addNavIds();
    this.appendApp();
    this.addTextures();
    this.loadTextures();
    this.addEventListeners();
  }
}

const a = new Window(50, 1);
a.init();