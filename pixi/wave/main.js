class ImageLoad {
  constructor(wrapper) {
    this.wrapper = wrapper;
    this.width = wrapper.getBoundingClientRect().width;
    this.height = wrapper.getBoundingClientRect().height;

    this.app = new PIXI.Application(this.width, this.height, {backgroundColor: 0x000000});    
    this.wrapper.appendChild(this.app.view);

    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);
  }

  load(afterLoad) {

  }

  startAnimation() {

  }

  hover() {

  }
}

const loadImages = document.querySelectorAll('.js-loadme');

loadImages.forEach((image, el) => {
  let img = new ImageLoad(image);
})


// const app = new PIXI.Application(300, 300, {backgroundColor: 0x000000});

// document.body.appendChild(app.view);

// let container = new PIXI.Container();
// app.stage.addChild(container);

// let bg = PIXI.Sprite.fromImage('./assets/book0.png');
// bg.width = 300;
// bg.height = 300;
// bg.position.x =  0;
// bg.position.y =  0;
// container.addChild(bg);

// let displacementSprite = PIXI.Sprite.fromImage('assets/displacement3.jpg');
// let displacementFilter = new PIXI.filters.DisplacementFilter(
//   displacementSprite,
//   1e2
// );

// app.stage.addChild(displacementSprite);

// container.filters = [displacementFilter];

// document.body.addEventListener('click',  function() {
//   let tl = new TimelineMax();
//   tl.to(displacementFilter.scale, 1, {x: 1, y: 1});
// });