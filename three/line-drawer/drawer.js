// 1. Setup the renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x333333, 1);

const section = document.querySelector('section');
section.appendChild(renderer.domElement);

// 2. Create the scene
const scene = new THREE.Scene();

// 3. Add the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);

camera.position.z = -50;
camera.lookAt(scene.position);

// 4. Add the animation loop
const animate = function() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

// 5. Create shapes
const createShape = function() {
  const geometry = new THREE.ConeGeometry(10, 10, 32);
  const material = new THREE.MeshLambertMaterial({
    color: 0xff0000,
  });
  const shape = new THREE.Mesh(geometry, material);

  shape.rotateX(-0.5);
  shape.rotateZ(0.5);

  scene.add(shape);
}

createShape();