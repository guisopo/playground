//Set up pixi application
const app = new PIXI.Application({transparent: true});
//Add pixi app to html
document.body.appendChild(app.view);

let container = new PIXI.Container();

app.stage.addChild(container);

function init() {
  let count = 0


  app.ticker.add(function() {
    count++;
  });
}

init();