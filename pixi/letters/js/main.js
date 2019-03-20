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

  const textSentence = 'This is a PixiJS text';

  const textArguments = {
    fontFamily : 'Francois One', 
    fontSize: 108,
    // fill : 0xf9ed00, 
    // fill : 0xe80289, 
    fill : 0x03aaea, 
    align : 'center'
  };

  const elements = document.querySelectorAll('.letter');
  const elementsArray = Array.from(elements);

  let balls = [];
  let letters = [];

  elementsArray.forEach( element => {
    const coords = element.getBoundingClientRect();

    const temp = new PIXI.Container();
    const text = new PIXI.Text(element.innerHTML, textArguments);
    text.position.x = coords.x;
    temp.addChild(text);
    
    container.addChild(temp);

    balls.push(
      new Physics(coords.x + coords.width/2, coords.y + coords.height/2)
    );
    letters.push(temp);
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
