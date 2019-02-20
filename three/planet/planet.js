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

// LIGHT
const ambientLight = new THREE.AmbientLight(0x777777);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xfffff, 1, 0);
pointLight.position.set(500, 500, -2000);
scene.add(pointLight);

// CAMERA
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.z = -3000;

// PLANET CREATION
function makePlanet() {
  const geometry = new THREE.SphereGeometry(800, 128, 128);
  const material = new THREE.MeshLambertMaterial({
    color: 0x2727e6
  });

  const mesh = new THREE.Mesh( geometry, material );
  scene.add(mesh);
}

makePlanet();

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