import {
  MathUtils,
  Mesh,
  AmbientLight,
  BoxGeometry,
  MeshPhongMaterial,
} from "three";
import { createTextureLoader, startup } from "../components";

function main() {
  // init
  const { camera, loop, scene } = startup("#app");
  camera.position.set(0, 25, 50);
  camera.lookAt(0, 0, 0);

  // texture loader
  const { loadColorTexture } = createTextureLoader();

  // box
  const boxGeometry = new BoxGeometry(10, 10, 10);
  const boxMaterials = new Array(6).fill(0).map(
    (_, i) =>
      new MeshPhongMaterial({
        map: loadColorTexture(`../../resources/images/gato${i + 1}.jpg`),
        color: "#e6ba19",
        emissive: 0x000000,
      })
  );
  const boxMesh = new Mesh(boxGeometry, boxMaterials);
  const rotSpeed = MathUtils.degToRad(30);
  const boxTick = (delta: number) => {
    boxMesh.rotation.y += rotSpeed * delta;
    boxMesh.rotation.x += rotSpeed * delta;
  };

  // light
  const light = new AmbientLight(0x404040, 55);
  scene.add(light);

  loop.start();

  //button
  let onScene = false;
  const button = document.getElementById("button");
  button?.addEventListener("click", () => {
    if (onScene) {
      onScene = false;
      button.classList.remove("remove");
      button.classList.add("add");
      scene.remove(boxMesh);
      loop.removeUpdatable(boxMesh);
    } else {
      onScene = true;
      button.classList.remove("add");
      button.classList.add("remove");
      scene.add(boxMesh);
      loop.addUpdatable(boxMesh, boxTick);
    }
  });
}

main();
