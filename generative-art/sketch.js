const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  const colorCount = random.rangeFloor(2, 6);
  const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount);
  const createGrid = (n) => {
    const points = [];
    const count = n;
    for(let x = 0; x < count; x++) {
      for(let y = 0; y < count; y++) {
        const u = (count <= 1) ? 0.5 : x/(count - 1);
        const v = (count <= 1) ? 0.5 : y/(count - 1);
        points.push({
          radius: Math.abs(random.gaussian() * 0.01),
          position: [u, v],
          color: random.pick(palette)
        });
      }
    }
    return points;
  };

  random.setSeed(512);
  const points = createGrid(40).filter( () => random.value() > 0.5);
  const margin = 300;

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    points.forEach( point => {
      const {
        position,
        radius,
        color
      } = point;
      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, width - margin, v);

      context.beginPath();
      context.arc(x, y, radius * width, Math.PI * 2, false);
      context.fillStyle= color;
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);
