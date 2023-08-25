import * as THREE from 'https://unpkg.com/three/build/three.module.js'

class MainWorld{
    constructor() {
        this.gameStarted = false;
        document.getElementById('game-menu').onclick = () => {
            this.onStart
        }
    }
    onStart() {
        document.getElementById('game-menu').style.display = 'none';
        document.getElementById('game-menu1').style.display = 'none';
        this.gameStarted = true;

    }
    initialize() {
        this.threejs = THREE.WebGLRenderer({
            antialias: true,
        })
        this.threejs.outputEncoding = THREE.sRGBEncoding;
        this.threejs.gammaFactor = 2.2;
        this.threejs.shadow.enabled = true;

        this.threejs.setPixelRatio(window.devicePixelRatio);
        this.threejs.setResize(window.innerWidth, window.innerHeight);

        document.getElementById('container').appendChild(this.threejs.domElement);

        window.addEventListener('resize', () => {
            this.orWindowResize_()
        }, false);

        const fov = 60;
        const aspect = 1920 / 1080;
        const near = 1;
        const far = 20000;

        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this.camera.position.set(-15, 7, 10);
        this.camera.lookAt(120, -20, 10);

        this.scene = new THREE.Scene();

        const color = 0xFFFFFF;
        const intercity = 0.6;
        const light = new THREE.AmbientLight(color, intercity);
        light.position.x = 1200;
        light.position.y = 3;

        this.scene.add(light);

        this.scene.background = new THREE.Color(0x000000);
        this.scene.fog = new THREE.Color(0x000000, 0.00125);

        this.gameOver = false;

    }
}