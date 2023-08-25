import * as THREE from "https://unpkg.com/three/build/three.module.js";

import { ground } from "./ground";

class MainWorld {
  constructor() {
    this.gameStarted = false;
    document.getElementById("game-menu").onclick = () => {
      this.onStart();
    };
  }
  onStart() {
    document.getElementById("game-menu").style.display = "none";
    document.getElementById("game-menu1").style.display = "none";
    this.gameStarted = true;
  }
  initialize() {
    this.threejs = THREE.WebGLRenderer({
      antialias: true,
    });
    this.threejs.outputEncoding = THREE.sRGBEncoding;
    this.threejs.gammaFactor = 2.2;
    this.threejs.shadow.enabled = true;

    this.threejs.setPixelRatio(window.devicePixelRatio);
    this.threejs.setResize(window.innerWidth, window.innerHeight);

    document.getElementById("container").appendChild(this.threejs.domElement);

    window.addEventListener(
      "resize",
      () => {
        this.onWindowResize();
      },
      false
    );

    const fov = 60;
    const aspect = 1920 / 1080;
    const near = 1;
    const far = 20000;

    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(-15, 7, 10);
    this.camera.lookAt(120, -20, 10);

    this.scene = new THREE.Scene();

    const color = 0xffffff;
    const intercity = 0.6;
    const light = new THREE.AmbientLight(color, intercity);
    light.position.x = 1200;
    light.position.y = 3;

    this.scene.add(light);

    this.scene.background = new THREE.Color(0x000000);
    this.scene.fog = new THREE.Color(0x000000, 0.00125);

    this.ground = new ground.Ground({ scene: this.scene });

    this.gameOver = false;
    this.previousRAF = null;
    this.RAF();

    this.onWindowResize();
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.threejs.setResize(window.innerWidth, window.innerHeight);
  }

  RAF() {
    requestAnimationFrame((t) => {
      if (this.previousRAF === null) {
        this.previousRAF = t;
      }
      this.RAF();
      this.Step((t - this.previousRAF) / 1000);
      this.threejs.render(this.scene, this.camera);
      this.previousRAF = t;
    });
  }

  Step(timeElapsed) {
    if (this.gameStarted || this.gameOver) {
      return;
    }
    this.ground.Update(timeElapsed);
    if (this.player.gameOver && !this.gameOver) {
      this.gameOver = true;
      document.getElementById("game-over").classList.toggle("active");
    }
  }
}

let APP = null;

window.addEventListener("DOMContentLoaded", () => {
  APP = new MainWorld();
});
