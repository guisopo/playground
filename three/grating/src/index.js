import "./main.scss";
import * as THREE from 'three';
const OrbitControls = require('three-orbit-controls')(THREE)

let camera, scene, renderer;
let geometry, material, meshX, meshY, controls;
let size = 20;

init();
animate();
 
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
  let material = new THREE.LineBasicMaterial( { color: 0xffffff } );
  
  for (let i = 0; i < size; i++) {
    let geometryX = new THREE.Geometry();
    let geometryY = new THREE.Geometry();
    for (let j = 0; j < size; j++) {
      geometryX.vertices.push(
        new THREE.Vector3(i*0.1, j*0.1, 0)
      );
      geometryY.vertices.push(
        new THREE.Vector3(j*0.1, i*0.1, 0)
      );
    }
    meshX = new THREE.Line(geometryX, material);
    meshY = new THREE.Line(geometryY, material);
    scene.add(meshX);
    scene.add(meshY);
  }

  document.body.appendChild( renderer.domElement );
}
 
function animate() {
 
    requestAnimationFrame( animate );
 
    renderer.render( scene, camera );
 
}