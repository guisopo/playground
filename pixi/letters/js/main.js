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
  let count = 0

  const textArguments = {
    fontFamily : 'Francois One', 
    fontSize: 24, 
    fill : 0x000000, 
    align : 'center'
  };

  const text = new PIXI.Text('This is a PixiJS text', textArguments);

  container.addChild(text);

  app.ticker.add(function() {
    count++;
  });
}
