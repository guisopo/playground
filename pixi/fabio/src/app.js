import * as PIXI from 'pixi.js'
import fragment from './shader/fragment.glsl'

const app = new PIXI.Application();
 
document.body.appendChild(app.view);
 
const container = new PIXI.Container();

app.stage.addChild(container);

const texture = PIXI.Texture.from('./src/images/venice.jpg');

// This creates a texture from a 'bunny.png' image.
const sprite = new PIXI.Sprite(texture);
// center the sprite anchor point
sprite.anchor.set(0.5);
container.addChild(sprite)

// Move container to the center
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;


// Listen for frame updates
app.ticker.add(() => {
        // each frame we spin the bunny around a bit
    container.rotation += 0.01;
});


