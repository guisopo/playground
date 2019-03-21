import "./main.scss";
import * as THREE from 'three';
const OrbitControls = require('three-orbit-controls')(THREE);

const canvas = document.getElementById('myscene');
const width = 600;
const height = 600;
const dots = 50;
const lines = 50;

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

const vector1 = new THREE.Vector3(-100, 0, 0);
const vector2 = new THREE.Vector3(100, 0, 0);

const geometry = new THREE.Geometry();

for(let i=0; i<lines; i++) {
  const line = new THREE.Line(geometry, material);

  geometry.vertices.push(vector1);
  geometry.vertices.push(vector2);

  line.rotation.x = Math.random() *Math.PI;
  line.rotation.y = Math.random() *Math.PI;
  line.rotation.z = Math.random() *Math.PI;

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