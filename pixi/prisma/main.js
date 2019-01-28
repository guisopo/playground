class ImageLoad {
  constructor(wrapper) {
    this.wrapper = wrapper;
    this.width = wrapper.getBoundingClientRect().width;
    this.height = wrapper.getBoundingClientRect().height;
    
    //Set up pixi application
    this.app = new PIXI.Application({width: this.width, height: this.height,transparent: true});  
    //Add pixi app to section
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

    this.displacementSprite = new PIXI.Sprite.fromImage('assets/displacement-3.jpg');
    this.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    //Add filter to the image
    this.displacementFilter = new PIXI.filters.DisplacementFilter( this.displacementSprite, 100 );

    this.displacementSprite.scale.set(0.25);
    //Add image to app
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
        tl.to(this.displacementFilter.scale, 0.5, {x: 25, y: 5});
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
    this.bg.x += 2;
    if(this.bg.position.x > this.bg.width) {
      this.bg.position.x = -this.bg.width;
    }
  }
}

const loadImage = document.querySelector('.js-loadme');
new ImageLoad(loadImage);