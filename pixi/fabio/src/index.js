import "./main.scss";
import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import fragment from './shaders/fragment.glsl';

let img0 = require('./images/pic-1.jpeg');
let img1 = require('./images/pic-2.jpeg');
let img2 = require('./images/pic-3.jpeg');



class Screen {

  constructor(screen, columns, rows) {
    this.screen = screen;
    this.nav = this.screen.querySelector('.nav');
    this.columns = columns;
    this.rows = rows;

    this.screenAspectRatio;
    this.imageAspectRatio;

    this.init();
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

  calculateRatios(width, height) {
    return width/height;
  }

  initPixi() {
    this.app = new PIXI.Application({
      width: this.screen.offsetWidth,
      height: this.screen.offsetHeight
    });

    this.Filter = new PIXI.Filter(null, fragment);
    this.loader = new PIXI.Loader();
  }

  appendApp() {
    this.screen.appendChild(this.app.view);
  }

  addTextures() {
    this.loader.add('img0', img0)
               .add('img1', img1)
               .add('img2', img2);
  }

  loadTextures() {
    this.loader.load((loader, resources) => {

      const screenSprite = new PIXI.Sprite(resources.img0.texture);
      
      this.screenAspectRatio = this.calculateRatios(this.screen.offsetWidth, this.screen.offsetHeight);
      this.imageAspectRatio =  this.calculateRatios(resources.img1.texture.width, resources.img1.texture.height);

      // Create uniform with aspect ratio value
      if(this.screenAspectRatio > this.imageAspectRatio) {
        this.Filter.uniforms.uvAspect = {x: 1., y: this.imageAspectRatio/this.screenAspectRatio};
      } else {
        this.Filter.uniforms.uvAspect = {x: this.screenAspectRatio/this.imageAspectRatio, y: 1.};
      }

      screenSprite.filters = [this.Filter];

      this.Filter.uniforms.uTextureOne = resources.img1.texture;
      this.Filter.uniforms.uTextureTwo = resources.img2.texture;
      this.Filter.uniforms.uProgress = 0.;
      this.Filter.uniforms.uColumns = `${this.columns}.`;
      this.Filter.uniforms.uRows = `${this.rows}.`;

      // Add the img to the scene we are building
      this.app.stage.addChild(screenSprite);
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
    this.initPixi();
    this.appendApp();
    this.addTextures();
    this.loadTextures();
    this.addEventListeners();
  }
}

const screen = document.getElementById('glsl-window');
const glslScreen = new Screen(screen, 60, 1);
const screen2 = document.getElementById('glsl-window-2');
const glslScreen2 = new Screen(screen2, 60, 1);