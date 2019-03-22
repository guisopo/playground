import "./main.scss";
import * as THREE from 'three';
const OrbitControls = require('three-orbit-controls')(THREE);

const width = window.innerWidth;
const height = window.innerHeight;

// SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xcccccc );

// RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer.setSize(width, height);

const container = document.getElementById('myscene');
container.appendChild(renderer.domElement);

// CAMERA
const camera = new THREE.PerspectiveCamera(90, width/height, 1, 1000);
camera.position.z = 500;

// ORBIT CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
