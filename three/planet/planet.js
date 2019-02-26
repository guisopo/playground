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

// PLANET GENERATOR
const makePlanet = function() {
  // const texture = loader.load('assets/wilson-skin.png');
  const texture = loader.load('assets/wilson-skin.png');
  const geometry = new THREE.SphereGeometry(800, 128, 128);
  const material = new THREE.MeshLambertMaterial({
    // color: 0x2727e6,
    map: texture
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  return mesh;
}

const earth = makePlanet();

// STARS GENERATOR
const makeStar = function() {
  const texture = loader.load('assets/particle.png');
  const geometry = new THREE.Geometry();

  for(let i = 0; i < 5000; i++) {
    const point = new THREE.Vector3();
    const sphericalPoint = new THREE.Spherical(
      900 + Math.random() * 200,
      2 * Math.PI * Math.random(),
      Math.PI * Math.random()
    );

    point.setFromSpherical(sphericalPoint);

    geometry.vertices.push(point);
  };

  const material = new THREE.PointsMaterial({
    size: 50,
    map: texture,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthTest: true,
    depthWrite: false
  });

  const points = new THREE.Points(geometry, material);

  scene.add(points);

  return points;
}

const stars = makeStar();

// MOON GENERATOR
const makeMoon = function() {
  const texture = loader.load('assets/wilson-skin.png');
  const geometry = new THREE.SphereGeometry(100, 64, 64);
  const material = new THREE.MeshLambertMaterial({
    map: texture
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  return mesh;
}

const moon = makeMoon();
const moonGroup = new THREE.Group();
moonGroup.add(moon);
scene.add(moonGroup);
moon.translateX(-1500);

// HOLD CAMERA POSITIONS

let currentX = 0;
let currentY = 0;
let aimX = 0;
let aimY = 0;


// RING GENERATOR
const makeRing = function(width, color) {
  const geometry = new THREE.TorusGeometry(width, 5, 16, 100);
  const material = new THREE.MeshBasicMaterial({
    color: color
  });

  const mesh = new THREE.Mesh(geometry, material);

  mesh.geometry.rotateX(Math.PI / 2);
  mesh.geometry.rotateZ(Math.PI / 10);

  scene.add(mesh);

  return mesh;
}

const ring1 = makeRing(1100, 0xff4141);
const ring2 = makeRing(1200, 0xffffff);
const ring3 = makeRing(1300, 0xffdb00);

// ANIMATION
const animate = function() {
  // start tweening
  const diffX = aimX - currentX;
  const diffY = aimY - currentY;

  currentX = currentX + diffX * 0.05;
  currentY = currentY + diffY * 0.05;

  camera.position.x = currentX;
  camera.position.y = currentY;
  // end tweening

  camera.lookAt(scene.position);

  // rotate planet
  earth.rotateY(0.01);
  earth.rotateZ(-0.002);

  // rotate moon
  moonGroup.rotateY(0.01);

  // rotate ring
  ring1.geometry.rotateY(0.004);
  ring2.geometry.rotateY(-0.002);
  ring3.geometry.rotateY(0.003);

  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

animate();

// EVENT LISTENERS
window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

// document.addEventListener('scroll', function() {
//   const scrollPosition = window.pageYOffset/500;
  
//   earth.rotation.set(0, scrollPosition, 0);
// });

document.addEventListener('mousemove', function(event) {
  aimX = ((window.innerWidth / 2) - event.pageX) * 2;
  aimY = ((window.innerHeight / 2) - event.pageY) * 2;
});

document.addEventListener('touchmove', function(event) {
  aimX = ((window.innerWidth / 2) - event.pageX) * 2;
  aimY = ((window.innerHeight / 2) - event.pageY) * 2;
});