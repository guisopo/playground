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
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 0);
pointLight.position.set(1000, 500, -2000);
scene.add(pointLight);

// CAMERA
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, -1000);
camera.position.z = -3000;

// LOADER
const loader = new THREE.TextureLoader();

// PLANET CREATION
function makePlanet() {
  // const texture = loader.load('assets/wilson-skin.png');
  const texture = loader.load('assets/earth.jpg');
  const geometry = new THREE.SphereGeometry(800, 128, 128);
  const material = new THREE.MeshLambertMaterial({
    // color: 0x2727e6,
    map: texture
  });

  const mesh = new THREE.Mesh( geometry, material );
  scene.add(mesh);

  return mesh;
}

const earth = makePlanet();

// ANIMATION
const animate = function() {
  camera.lookAt(scene.position);

  // rotate planet
  earth.rotateY(0.00075);
  earth.rotateX(-0.00025);

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