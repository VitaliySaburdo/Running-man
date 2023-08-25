import * as THREE from 'three';

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

        

    }
}