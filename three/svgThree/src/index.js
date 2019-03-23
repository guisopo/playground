import "./main.scss";
import * as THREE from 'three';
import { CubeTexture } from "three";
const OrbitControls = require('three-orbit-controls')(THREE);

const size = 200;
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

canvas.width = size;
canvas.height = size;
canvas.classList.add('temp-canvas');
document.body.appendChild(canvas);

const img = new Image();
img.onload = function() {
  context.drawImage(img, 0, 0, width, height);
}
img.src= 'src/images/close.svg';

let camera, controls, scene, renderer, geometry;
const width = window.innerWidth;
const height = window.innerHeight;

function init() {
  // SCENE
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x000000  );
  
  // RENDERER
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  renderer.setSize(width, height);

  const container = document.getElementById('container');
  container.appendChild(renderer.domElement);
  
  // CAMERA
  camera = new THREE.PerspectiveCamera(90, width/height, 1, 1000);
  camera.position.z = 500;
  
  // ORBIT CONTROLS
  controls = new OrbitControls(camera, renderer.domElement);
  
  // TEXTURE
  const texture = (new THREE.TextureLoader).load('src/images/particle.png');
  const material = new THREE.PointsMaterial({
    size: 10,
    vertexColors: THREE.VertexColors,
    map: texture,
    alphaTest: 0.5
  });
  
  // GEOMETRY
  geometry = new THREE.Geometry();
  let x, y, z;
  
  for(let i=0; i<=100000; i++) {
    x = Math.sin(i/10) * 100;
    y = Math.cos(i/10) * 100;
    z = i * 1;
  
    geometry.vertices.push(new THREE.Vector3(x, y, z));
    geometry.colors.push(new THREE.Color(Math.random(), Math.random(), Math.random()));
  };

  const pointMaterial = new THREE.Points(geometry, material);
  scene.add(pointMaterial);
}

// ANIMATION
let i = 0;

function animate() {
  i++;
  requestAnimationFrame(animate);

  geometry.vertices.forEach((vector, index) => {
    let dX, dY, dZ;
    // dX = Math.sin(i/10 + index/2) * 2;
    dY = 0;
    dZ = 0;
    vector.add(new THREE.Vector3(dX, dY, dZ));
  });

  geometry.verticesNeedUpdate = true;

  render();
}

function render() {
  renderer.render(scene, camera);
}

init();
animate();