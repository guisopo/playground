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

// 4. Add Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
// set Light Source to come from the User view point
light.position.set(0, 0, -1);
scene.add(light);

// 5. Hold some data from the Shape being added
const shapes = [];

// 6. Add the animation loop
const animate = function() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);

  //Rotate shapes each frame
  shapes.forEach(shape => {
    shape.rotateX(0.01);
    shape.rotateZ(0.005);
  });
}

animate();

// 7. Create Shapes
const createShape = function(x, y, z) {
  const geometry = new THREE.ConeGeometry(10, 10, 32);
  const material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    emissive: 0xff0000,
  });
  const shape = new THREE.Mesh(geometry, material);

  //Set Shape's Position
  shape.position.set( (window.innerWidth / 2) - x, (window.innerHeight / 2) - y, z);

  // Lets add it to the Shapes Array and to the Scene
  shapes.push(shape);

  scene.add(shape);
}


// 8. Mouse Events
let isMouseDown = false;

document.addEventListener('mousemove', function(event) {
  if(isMouseDown) {
    createShape(event.pageX, event.pageY, 300);
  }
});

document.addEventListener('mousedown', function() {
  isMouseDown = true;
  console.log(isMouseDown);
});

document.addEventListener('mouseup', function() {
  isMouseDown = false;
});