// 1. Load Google Font
WebFont.load({
  google: {
    families: ['Francois One']
  },
  active: function() {
    // When loaded, initialize PIXI magic
    init();
  }
});

// 2. Set up PIXI 
const app = new PIXI.Application({transparent: true, width: window.innerWidth,height:window.innerWidth});

document.body.appendChild(app.view);

const container = new PIXI.Container();

app.stage.addChild(container);

// 3. Initialize magic
function init() {
  // Select HTML elements
  const elements = document.querySelectorAll('.letter');
  const elementsArray = Array.from(elements);

  let physics = [];
  let letters = [];

  // Create a new PIXI Container for each element
  let layers = new Array(4).fill().map(x => new PIXI.Container());

  // Add each new Container to the main Container
  layers.forEach(layer => {
    container.addChild(layer);
  });
  
  // 4. Create a PIXI letter in a new Container
  function drawLetter(text, coords, color, physics, containers, power, layerStackNumber, fontsize, rotation) {
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
    
    //Add a new Physics to physics array
    physics.push(
      new Physics(coords.x + coords.width/2, coords.y + coords.height/2, power)
    );
    // Add temp container to letters array
    containers.push(temp);
  }

  // Draw Html elements
  elementsArray.forEach( element => {
    const coords = element.getBoundingClientRect();

    drawLetter(element.innerHTML, coords, 0x03aaea, physics, letters, 3, 0, 104);
    drawLetter(element.innerHTML, coords, 0xf9ed00, physics, letters, 5, 1, 104);
    drawLetter(element.innerHTML, coords, 0xe80289, physics, letters, 4, 2, 104);
    drawLetter(element.innerHTML, coords, 0x03aaea, physics, letters, 3, 3, 104);

  });

  // Draw smileys
  for (var i = 100; i>0; i--) {
  	let coords = {
  		x: Math.random() * window.innerWidth,
  		y: Math.random() * window.innerHeight,
  		width: Math.random() * 40 + 10,
  		height: Math.random() * 40 + 10,
  	};
  	let randomRotation = 3 * Math.random();
  	drawLetter(';-)', coords, 0x03aaea, physics, letters, 3,0, coords.width, randomRotation);
  	drawLetter(';-)', coords, 0xf9ed00, physics, letters, 5,0, coords.width, randomRotation);
  	drawLetter(';-)', coords, 0xe80289, physics, letters, 4,0, coords.width, randomRotation);
  	drawLetter(';-)', coords, 0x03aaea, physics, letters, 3,0, coords.width, randomRotation);
  }

  app.ticker.add(function() {
    let mousePosition = app.renderer.plugins.interaction.mouse.global;

    physics.forEach((physic, j) => {
      physic.think(mousePosition);
      letters[j].position.x = physic.diffX;
      letters[j].position.y = physic.diffY;
    });
  });
}
