import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export const ground = (() => {
  class Ground {
    constructor(params) {
        this.params = params;
      this.load();
      console.log('yes');
    }

    load = () => {
      const loader = new GLTFLoader();

      loader.load("untitled.fbx", (gltf) => {
        gltf.cast.shadow = false;
        gltf.receiveShadow = true;
        gltf.position.y = -3;
        gltf.rotation.x = -Math.PI / 1;
        gltf.rotation.y = -Math.PI / 2;

        gltf.scale.setScalar(0.09);

        this.mesh = gltf;
        this.params.scene.add(gltf);
      });
    };

      Update(timeElapsed) {
          if (this.mesh.position.x > -100) {
              this.mesh.position.x -= 1; 
          } else {
             this.mesh.position.x = 1;  
        }

      }
      
    };
    return { Ground: Ground }
})();
