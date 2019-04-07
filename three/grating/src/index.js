import "./main.scss";
import * as THREE from 'three';
const OrbitControls = require('three-orbit-controls')(THREE)

let camera, scene, renderer;
let geometry, material, mesh, controls;

init();
animate();
 
function init() {
  // SETUP
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
  camera.position.z = 1;

  controls = new OrbitControls(camera);

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize( window.innerWidth, window.innerHeight );

  // OBJECTS
  

  document.body.appendChild( renderer.domElement );
}
 
function animate() {
 
    requestAnimationFrame( animate );
 
    renderer.render( scene, camera );
 
}