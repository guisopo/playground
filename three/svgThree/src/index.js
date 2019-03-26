import "./main.scss";
import * as THREE from 'three';
import { CubeTexture } from "three";
import { TimelineMax } from "gsap/TweenMax";
const OrbitControls = require('three-orbit-controls')(THREE);

const size = 50;
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

const paths = [
  'src/images/arrow.svg',
  'src/images/close.svg',
  'src/images/place.svg',
];

function loadImages(paths, whenLoaded) {
  let imgs = [];
  paths.forEach(path => {
    const img = new Image;
    img.onload = function() {
      imgs.push(img);
      if(imgs.length==paths.length) whenLoaded(imgs);
    }
    img.src = path;
  });
}

function shuffle(a) {
  for(let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i-1], a[j]] = [a[j], a[i-1]];
  }
  return a;
}

function fillUp(array, max) {
  const length = array.length;
  for(let i=0; i<max-length; i++) {
    array.push(array[Math.floor(Math.random() * length)]);
  }
  return array;
}

function getAlphaFromImage(img) { 
  let imageCoords = [];
  context.clearRect(0, 0, size, size);
  context.drawImage(img, 0, 0, size, size);
  let data = context.getImageData(0, 0, size, size);
  data = data.data;
  
  for(let y=0; y<size; y++) {
    for(let x=0; x<size; x++) {
      let alpha = data[((size * y) + x) * 4 + 3];
      if(alpha > 0) {
        imageCoords.push([10*(x - size/2), 10*(y - size/2)]);
      }
    }
  }
  return shuffle(fillUp(imageCoords, 1500));
}

loadImages(paths, function(loadedImages) {
  let gallery = [];
  loadedImages.forEach((image) => {
    gallery.push(getAlphaFromImage(image));
  });
  console.log(gallery);
  let camera, controls, scene, renderer, geometry;
  const width = window.innerWidth;
  const height = window.innerHeight;

  function init() {
    // SCENE
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x000000  );
    
    // RENDERER
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    renderer.setSize(width, height);

    const container = document.getElementById('container');
    container.appendChild(renderer.domElement);
    
    // CAMERA
    camera = new THREE.PerspectiveCamera(90, width/height, 1, 1000);
    camera.position.z = 500;
    
    // ORBIT CONTROLS
    controls = new OrbitControls(camera, renderer.domElement);
    
    // TEXTURE
    const texture = (new THREE.TextureLoader).load('src/images/particle.png');
    const material = new THREE.PointsMaterial({
      size: 5,
      vertexColors: THREE.VertexColors,
      map: texture,
      alphaTest: 0.5
    });
    
    // GEOMETRY
    geometry = new THREE.Geometry();
    // let x, y, z;
    
    // for(let i=0; i<=100000; i++) {
    //   x = Math.sin(i/10) * 100;
    //   y = Math.cos(i/10) * 100;
    //   z = i * 1;
    
    //   geometry.vertices.push(new THREE.Vector3(x, y, z));
    //   geometry.colors.push(new THREE.Color(Math.random(), Math.random(), Math.random()));
    // };

    gallery[0].forEach((coord, index) => {
      geometry.vertices.push(new THREE.Vector3(coord[0], coord[1], Math.random()*100));
      geometry.colors.push(new THREE.Color(Math.random(), Math.random(), Math.random()));
    });

    const pointMaterial = new THREE.Points(geometry, material);
    scene.add(pointMaterial);
  }

  // ANIMATION
  let i = 0;

  function animate() {
    i++;
    requestAnimationFrame(animate);

    geometry.vertices.forEach((vector, index) => {
      let dX, dY, dZ;
      dX = Math.sin(i/5 + index/2) * 0.25;
      dY = 0;
      dZ = 0;
      vector.add(new THREE.Vector3(dX, dY, dZ));
    });

    geometry.verticesNeedUpdate = true;

    render();
  }

  function render() {
    renderer.render(scene, camera);
  }

  init();
  animate();

  // GSAP: change shape when click
  let current = 0;
  document.addEventListener('click', () => {
    current ++;
    current = current % gallery.length;
    geometry.vertices.forEach((particle, index) => {
      const tl = new TimelineMax();
      tl.to(particle, 1, {x: gallery[current][index][0], y: gallery[current][index][1]});
    });
  });

});
