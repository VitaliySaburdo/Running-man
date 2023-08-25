import * as THREE from "https://unpkg.com/three/build/three.module.js";

export const ground = (() => {
  class Ground {
    constructor(params) {
        this.params = params;
        this.load();
    }

    load = () => {
      const loader = new FBXLoader();

      loader.load("Brain.glb", (glb) => {
        glb.cast.shadow = false;
        glb.receiveShadow = true;
        glb.position.y = -3;
        glb.rotation.x = -Math.PI / 1;
        glb.rotation.y = -Math.PI / 2;

        glb.scale.setScalar(0.09);

        this.mesh = glb;
        this.params.scene.add(glb);
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
