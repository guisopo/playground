const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  const createGrid = (n) => {
    const points = [];
    const count = n;
    for(let x = 0; x < count; x++) {
      for(let y = 0; y < count; y++) {
        const u = (count <= 1) ? 0.5 : x/(count - 1);
        const v = (count <= 1) ? 0.5 : y/(count - 1);
        points.push([u, v]);
      }
    }
    return points;
  };

  const points = createGrid(4);
  const margin = 500;

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    points.forEach(([u, v]) => {
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, width - margin, v);

      context.beginPath();
      context.arc(x, y, 20, Math.PI * 2, false);
      context.fillStyle= 'black';
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);
