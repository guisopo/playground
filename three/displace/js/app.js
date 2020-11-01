import * as THREE from 'three';
import fox from '../images/fox.jpg';
import fragment from './shader/fragment.glsl';
import vertex from './shader/vertex.glsl';
import * as dat from 'dat.gui';

import { TimelineMax } from 'gsap';
let OrbitControls = require('three-orbit-controls')(THREE);

export default class Sketch {
  constructor (seletctor) {
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0xeeeeee, 1);

    this.container = document.getElementById('container');
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetWidth;
    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.001,
      1000
    );

    this.camera.position.set(0, 0, 2);
    this.controls = new OrbitControls(this.camera, this.render.domElement);
    this.time = 0;
    this.pause = false;

    this.setupResize();
    this.addObjects();
    this.resize();
    this.render();
  }

  settings() {
    let that = this;
    this.settings = {
      time: 0
    }
    this.gui = new dat.GUI();
    this.gui.add(this.settings, "time", 0, 100, 0.01);
  }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this));
  };

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width/this.height;

    //image cover
    this.imageAspect = 853/1280;
    let a1, a2;
    if(this.width/this.height > this.imageAspect) {
      a1 = (this.width/this.height) * this.imageAspect;
      a2 = 1;
    } else {
      a1 = 1;
      a2 = (this.width/this.height) * this.imageAspect;
    }

    this.material.uniforms.resolution.value.x = this.width;
    this.material.uniforms.resolution.value.y = this.height;
    this.material.uniforms.resolution.value.z = this.a1;
    this.material.uniforms.resolution.value.w = this.a2;

    this.camera.updateProjectionMatrix();
  }

  addObjects() {
    let that = this;

    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives: enable"
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { type: "f", value: 0 },
        resolution: { type: "v4", value: new THREE.Vector4() },
        uvRate1: {
          value: new THREE.Vector2(1, 1)
        },
        // wireframe: true,
        // transparent: true,
        vertexSahder: vertex,
        fragmentShader: fragment
      }
    });

    this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1);

    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
  };

  stop() {
    this.paused = true;
  }

  play() {
    this.paused = false;
    this.render();
  }
}
