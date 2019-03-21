import "./main.scss";
import * as THREE from 'three';

const canvas = document.getElementById('myscene');
const width = 600;
const height = 600;

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
const geometry = new THREE.Geometry();

const line = new THREE.Line(geometry, material);

const vector1 = new THREE.Vector3(-100, 0, 0);
const vector2 = new THREE.Vector3(100, 0, 0);

geometry.vertices.push(vector1);
geometry.vertices.push(vector2);

line.rotation.z = Math.random() *Math.PI;
group.add(line);

// CAMERA
const camera = new THREE.PerspectiveCamera(40, width/height, 1, 1000);
camera.position.set(0, 0, 300);

renderer.render(scene, camera);