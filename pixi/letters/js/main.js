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

  let letters = document.querySelectorAll('.letter');
  let lettersArray = Array.from(letters);

  lettersArray.forEach( letter => {
    const coords = letter.getBoundingClientRect();
    const text = new PIXI.Text(letter.innerHTML, textArguments);
    text.position.x = coords.x;
    
    container.addChild(text);
  });

  app.ticker.add(function() {
    count++;
    let mousePosition = app.renderer.plugins.interaction.mouse.global;
  });
}
