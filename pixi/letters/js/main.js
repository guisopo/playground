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

  layers.forEach(layer => {
    container.addChild(layer);
  });

  // layers[3].blendMode = 2;

  elementsArray.forEach( element => {
    const coords = element.getBoundingClientRect();

    function drawLetter(coords, color, balls, containers, power, layerNumber) {
      const temp = new PIXI.Container();

      const textArguments = {
        fontFamily : 'Francois One', 
        fontSize: 216,
        fill: color,
        align : 'center'
      };

      const text = new PIXI.Text(element.innerHTML, textArguments);

      text.position.x = coords.x;
      text.position.y = coords.y;
      if(layerNumber === 3) text.blendMode = 2;
      temp.addChild(text);
      layers[layerNumber].addChild(temp);

      balls.push(
        new Physics(coords.x + coords.width/2, coords.y + coords.height/2, power)
      );
      containers.push(temp);
    }

    drawLetter(coords, 0x03aaea, balls, letters, 0.1, 0);
    drawLetter(coords, 0xf9ed00, balls, letters, 0.14, 1);
    drawLetter(coords, 0xe80289, balls, letters, 0.16, 2);
    drawLetter(coords, 0x03aaea, balls, letters, 0.18, 3);

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
