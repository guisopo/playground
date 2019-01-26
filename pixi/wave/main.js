class ImageLoad {
  constructor(wrapper) {
    this.wrapper = wrapper;
    this.width = wrapper.getBoundingClientRect().width;
    this.height = wrapper.getBoundingClientRect().height;

    this.app = new PIXI.Application(this.width, this.height, {transparent: true});    
    this.wrapper.appendChild(this.app.view);
    this.src = wrapper.dataset.src;
    this.mouseOn = false;
    this.animated =false;

    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);

    this.load(this.startAnimation());
  }

  load(afterLoad) {
    let tmpImg = new Image();
    tmpImg.src = this.src;
    tmpImg.onLoad = function() {
      afterLoad();
    }
  }

  startAnimation() {
    this.bg = PIXI.Sprite.fromImage(this.src);
    this.bg.width = this.width;
    this.bg.height = this.height;
    this.bg.position.x =  0;
    this.bg.position.y =  0;
    this.container.addChild(this.bg);

    this.displacementSprite = PIXI.Sprite.fromImage('assets/displacement9.jpg');
    this.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

    this.displacementFilter = new PIXI.filters.DisplacementFilter(
      this.displacementSprite,
      1e4 + Math.random() * 1e3
    );

    this.displacementSprite.scale.set(0.4 + 0.6 * Math.random());

    this.app.stage.addChild(this.displacementSprite);

    this.container.filters = [this.displacementFilter];

    let tl = new TimelineMax({onComplete:() => this.animated = true});
    tl.to(this.displacementFilter.scale, 1, {x: 1, y: 1});
    this.hover();
  }

  hover() {
    this.wrapper.addEventListener('mouseenter', () => {
      if(this.animated && !this.mouseOn) { 
        this.mouseOn = true;
        TweenMax.ticker.addEventListener('tick', this.doWaves, this);
        let tl = new TimelineMax();
        tl.to(this.displacementFilter.scale, 0.5, {x: 7, y: 7});
      }
    });
    this.wrapper.addEventListener('mouseleave', () => {
      if(this.animated && this.mouseOn) { 
        this.mouseOn = false;
        TweenMax.ticker.removeEventListener('tick', this.doWaves, this);
        let tl = new TimelineMax();
        tl.to(this.displacementFilter.scale, 0.5, {x: 1, y: 1});
      }
    });
  }

  doWaves() {
    this.displacementSprite.x += 1;
  }
}

const loadImages = document.querySelectorAll('.js-loadme');

loadImages.forEach((image) => {
  let img = new ImageLoad(image);
})

