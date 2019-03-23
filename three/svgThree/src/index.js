import "./main.scss";
import * as THREE from 'three';
import { CubeTexture } from "three";
const OrbitControls = require('three-orbit-controls')(THREE);

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
  
  

// ANIMATION
let i = 0;

function animate() {
  i++;
  requestAnimationFrame(animate);

  render();
}

function render() {
  renderer.render(scene, camera);
}

init();
animate();