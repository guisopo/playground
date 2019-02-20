// RENDERER
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 1);

const section = document.querySelector('section');
section.appendChild(renderer.domElement);

// SCENE
const scene = new THREE.Scene();

// CAMERA
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.z = -3000;

// ANIMATION
const animate = function() {
  camera.lookAt(scene.position);

  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

animate();

// EVENT LISTENERS
window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
})