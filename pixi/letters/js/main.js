WebFont.load({
  google: {
    families: ['Francois One']
  },
  active: function() {
    init();
  }
});

//Set up pixi application
const app = new PIXI.Application({transparent: true});
//Add pixi app to html
document.body.appendChild(app.view);

const container = new PIXI.Container();

app.stage.addChild(container);

function init() {
  let count = 0;

  const elements = document.querySelectorAll('.letter');
  const elementsArray = Array.from(elements);

  let balls = [];
  let letters = [];

  let layers = new Array(4).fill().map(x => new PIXI.Container());
  layers[3].blendMode = 2;
  layers.forEach(layer => {
    container.addChild(layer);
  });

  function drawLetter(text,coords,color,balls,containers, power, layerStackNumber,fontsize,rotation) {
    const temp = new PIXI.Container();

    const textArguments = {
      fontFamily : 'Francois One', 
      fontSize: fontsize,
      fill: color,
      align : 'center'
    };

    const letter = new PIXI.Text(text, textArguments);

    letter.position.x = coords.x;
    letter.position.y = coords.y;

    if(rotation) letter.rotation = rotation;
  	if(layerStackNumber===3) letter.blendMode = 2;

    temp.addChild(letter);
    layers[layerStackNumber].addChild(temp);

    balls.push(
      new Physics(coords.x + coords.width/2, coords.y + coords.height/2, power)
    );
    containers.push(temp);
  }

  elementsArray.forEach( element => {
    const coords = element.getBoundingClientRect();

    drawLetter(element.innerHTML, coords, 0x03aaea, balls, letters, 3, 0, 104);
    drawLetter(element.innerHTML, coords, 0xf9ed00, balls, letters, 5, 1, 104);
    drawLetter(element.innerHTML, coords, 0xe80289, balls, letters, 4, 2, 104);
    drawLetter(element.innerHTML, coords, 0x03aaea, balls, letters, 3, 3, 104);

  });

  app.ticker.add(function() {
    count++;
    let mousePosition = app.renderer.plugins.interaction.mouse.global;

    balls.forEach((ball,j) => {
      ball.think(mousePosition);

      letters[j].position.x = ball.diffX;
      letters[j].position.y = ball.diffY;
    });
  });
}
