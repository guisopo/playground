import "./main.scss";
import  Perlin from './lib/perlin';
import * as THREE from 'three';
const OrbitControls = require('three-orbit-controls')(THREE)
import Stats from 'stats-js';

const stats = new Stats();
stats.showPanel( 0 );
document.body.appendChild( stats.dom );

let camera, scene, renderer;
let geometry, material, mesh, controls;

function init() {
  // SETUP
  scene = new THREE.Scene();
  scene.position.x = -1;
  scene.position.y = -1;

  camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 3000 );
  camera.position.z = 1000;

  controls = new OrbitControls(camera);

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  // OBJECTS
  material = new THREE.ShaderMaterial({
    wireframe: true,
    extensions: {
      derivatives: '#extension GL_OES_standard_derivatives : enable',
    },
    uniforms: {
      time: {type: 'f', value: 0.0},
    },
    vertexShader: document.getElementById('vertShader').textContent,
    fragmentShader: document.getElementById('fragShader').textContent,
    side: THREE.DoubleSide
  });

  geometry = new THREE.PlaneGeometry( 600, 600, 20, 20);
  mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh, material);

  animate();
}

function updatePlane(time) {
  for (let i = 0; i < geometry.vertices.length; i++) {
    const vec = geometry.vertices[i];
    vec.z = 100 * Perlin(vec.x/100, vec.y/100, time/100);
  }
  geometry.verticesNeedUpdate = true;
}


let time = 0;
function animate() {
  stats.begin();

  updatePlane(time);
  time++;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);

  stats.end();
}

init();