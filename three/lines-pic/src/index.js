import "./main.scss";
import * as THREE from 'three';
const OrbitControls = require('three-orbit-controls')(THREE);

const canvas = document.getElementById('myscene');
const width = window.innerWidth;
const height = window.innerHeight;
const dots = 50;
const lines = 50;
const radius = 100;

// RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer.setSize(width, height);
renderer.setClearColor(0x999999);

// SCENE
const scene = new THREE.Scene();
const group = new THREE.Group();
scene.add(group);

// CAMERA
const camera = new THREE.PerspectiveCamera(40, width/height, 1, 1000);
camera.position.set(0, 0, 300);

// ORBIT CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);

// LINE INIT
const material = new THREE.LineBasicMaterial( {
   color: 0x000000
} );


// for(let i=0; i<lines; i++) {
//   const geometry = new THREE.Geometry();
//   const line = new THREE.Line(geometry, material);

//   for(let j=0; j<dots; j++) {
//     const coord = (j/dots) * radius*2 - radius; 
//     const vector = new THREE.Vector3(coord, Math.random()*30, 0);

//     geometry.vertices.push(vector);
//   }

//   line.rotation.x = Math.random() * Math.PI;
//   line.rotation.y = Math.random() * Math.PI;
//   line.rotation.z = Math.random() * Math.PI;

//   group.add(line);

function updateLines(time) {
  let vector, line;
  for (let i = 0; i < lines; i++) {
    line = group.children[i];  
    for (let j = 0; j < dots; j++) {
      vector = line.geometry.vertices[j];
      let ratio = 1 - (radius - Math.abs(vector.x))/radius;
      vector.y = Math.sin(j/5 + time/100) * 20 * ratio;
    }

    line.geometry.verticesNeedUpdate = true;
  }

}

// IMAGE
const canvas2d = document.createElement('canvas');
const ctx = canvas2d.getContext('2d');
const size = 200;
canvas2d.width = size;
canvas2d.height = size;

const image = document.getElementById('js-pic');

var img = new Image();   
img.crossOrigin = 'anonymous';
img.src = 'src/images/fux.png';

img.addEventListener('load', function() {

ctx.drawImage(image, 0, 0, size, size);

let data = ctx.getImageData(0, 0, size, size);
data = data.data;

  for(let y = 0; y < size; y++) {
    const geometry = new THREE.Geometry();
    const line = new THREE.Line(geometry, material);

    for(let x = 0; x < size; x++) {
      const bright = data[((size * y) + x) * 4];
      const vector = new THREE.Vector3(x - size/2, y - size/2, bright/10 - 100);

      geometry.vertices.push(vector);
    }
    group.add(line);
  }
}, false);

// RENDER FUNCTION
let time = 0;

function render() {
  time++;
  renderer.render(scene, camera);
  group.rotation.x = Math.PI;
  group.rotation.y = (time/1000);
  // updateLines(time);
  window.requestAnimationFrame(render);
}

render();