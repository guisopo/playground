import "./main.scss";
import * as THREE from 'three';
const OrbitControls = require('three-orbit-controls')(THREE);

const canvas = document.getElementById('myscene');
const width = 600;
const height = 600;
const dots = 50;
const lines = 50;
const radius = 100;

// RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio>1?2:1);
renderer.setSize(width, height);
renderer.setClearColor(0x999999);

// SCENE
const scene = new THREE.Scene();
const group = new THREE.Group();
scene.add(group);

// LINE INIT
const material = new THREE.LineBasicMaterial( {
   color: 0xff0000
} );


for(let i=0; i<lines; i++) {
  const geometry = new THREE.Geometry();
  const line = new THREE.Line(geometry, material);

  for(let j=0; j<dots; j++) {
    const coord = (j/dots) * radius*2 - radius; 

    const vector = new THREE.Vector3(coord, Math.random()*30, 0);

    geometry.vertices.push(vector);
  }

  line.rotation.x = Math.random() * Math.PI;
  line.rotation.y = Math.random() * Math.PI;
  line.rotation.z = Math.random() * Math.PI;

  group.add(line);
}

// CAMERA
const camera = new THREE.PerspectiveCamera(40, width/height, 1, 1000);
camera.position.set(0, 0, 300);

// ORBIT CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);

// RENDER FUNCTION
function render() {
  renderer.render(scene, camera);
  window.requestAnimationFrame(render);
}

render();