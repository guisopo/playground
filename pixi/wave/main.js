const app = new PIXI.Application(300, 300, {backgroundColor: 0x000000});

document.body.appendChild(app.view);

let container = new PIXI.Container();
app.stage.addChild(container);

let bg = PIXI.Sprite.fromImage('./assets/book0.png');
bg.width = 300;
bg.height = 300;
bg.position.x =  0;
bg.position.y =  0;
container.addChild(bg);

let displacementSprite = PIXI.Sprite.fromImage('assets/displacement3.jpg');
let displacementFilter = new PIXI.filters.DisplacementFilter(
  displacementSprite,
  10
);

app.stage.addChild(displacementSprite);

container.filters = [displacementFilter];

document.body.addEventListener('click',  function() {
  let tl = new TimelineMax();
  tl.to(displacementFilter.scale, 1, {x: 1000, y: 1000});
});