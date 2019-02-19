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

// Hold a state for HUE. Updated later in createShape()
let hue = 0;

// 7. Create Shapes
const createShape = function(x, y, z) {
  const geometries = [
    new THREE.ConeGeometry(10, 20, 30),
    new THREE.BoxGeometry(15, 15, 15),
    new THREE.TorusGeometry(5, 3, 16, 100)
  ];
  
  const randomNumber = Math.floor(Math.random() * geometries.length);
  const geometry = geometries[randomNumber];

  const emissiveColor = new THREE.Color(`hsl(${hue}, 100%, 50%)`);

  const material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    emissive: emissiveColor,
  });

  const shape = new THREE.Mesh(geometry, material);

  //Set Shape's Position
  shape.position.set( (window.innerWidth / 2) - x, (window.innerHeight / 2) - y, z);

  // Lets add it to the Shapes Array and to the Scene
  shapes.push(shape);
  scene.add(shape);

  hue = hue + 1;
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
});

document.addEventListener('mouseup', function() {
  isMouseDown = false;
});

// 9. Touch Events
document.addEventListener('touchmove', function(event) {
  if(isMouseDown) {
    createShape(event.pageX, event.pageY, 300);
  }
});

document.addEventListener('touchstart', function() {
  isMouseDown = true;
  console.log(isMouseDown);
});

document.addEventListener('touchend', function() {
  isMouseDown = false;
});