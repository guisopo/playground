import "./main.scss";
import  Perlin from './lib/perlin';
import * as THREE from 'three';
const OrbitControls = require('three-orbit-controls')(THREE)
import Stats from 'stats-js';

const stats = new Stats();
stats.showPanel( 0 );
document.body.appendChild( stats.dom );

let camera, scene, renderer;
let geometry, material, meshX, meshY, controls, groupX, groupY;
let size = 20;

function init() {
  // SETUP
  scene = new THREE.Scene();
  scene.position.x = -1;
  scene.position.y = -1;

  camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 3000 );
  camera.position.z = 2;

  controls = new OrbitControls(camera);

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize( window.innerWidth, window.innerHeight );

  // OBJECTS
  groupX = new THREE.Group();
  groupY = new THREE.Group();

  scene.add(groupX);
  scene.add(groupY);

  let material = new THREE.LineBasicMaterial( { color: 0xffffff } );
  
  for (let i = 0; i < size; i++) {
    let geometryX = new THREE.Geometry();
    let geometryY = new THREE.Geometry();
    for (let j = 0; j < size; j++) {
      geometryY.vertices.push(
        new THREE.Vector3(i*0.1, j*0.1, 0)
      );
      geometryX.vertices.push(
        new THREE.Vector3(j*0.1, i*0.1, 0)
      );
    }
    meshX = new THREE.Line(geometryX, material);
    meshY = new THREE.Line(geometryY, material);
    groupX.add(meshX);
    groupY.add(meshY);
  }

  document.body.appendChild( renderer.domElement );
  animate();
}

function updateGrid(time) {
  for (let i = 0; i < size; i++) {
    let lineX = groupX.children[i];
    let lineY = groupY.children[i];
    for (let j = 0; j < size; j++) {
      let vecX = lineX.geometry.vertices[j];
      let vecY = lineY.geometry.vertices[j];
      vecX.z = 2 * Perlin(vecX.x, vecX.y, time/150);
      vecY.z = 2 * Perlin(vecY.x, vecY.y, time/150);
    }
    lineX.geometry.verticesNeedUpdate = true;
    lineY.geometry.verticesNeedUpdate = true;
  }
}

let time = 0;
function animate() {
  stats.begin();
  time++;
  updateGrid(time);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  stats.end();
}

// init();