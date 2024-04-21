import { BoxGeometry, MathUtils, Mesh, MeshBasicMaterial } from "three";
import {
  InteractiveObject,
  createCamera,
  createRenderer,
  createScene,
} from "./components";
import Loop from "./systems/loop";

function main() {
  const container = document.querySelector<HTMLDivElement>("#app");
  const renderer = createRenderer();
  const camera = createCamera();
  const scene = createScene();
  const loop = new Loop(renderer, camera, scene);

  container?.appendChild(renderer.domElement);

  {
    const geo = new BoxGeometry(5, 5, 5);
    const mat = new MeshBasicMaterial({
      color: "gray",
    });
    const cube = new Mesh(geo, mat);
    const cubeInteract = new InteractiveObject(cube);

    const radPerSecond = MathUtils.degToRad(45);
    cubeInteract.tickEvent = (delta: number) => {
      cube.rotation.z += radPerSecond * delta;
      cube.rotation.x += radPerSecond * delta;
    };

    scene.add(cube);
    loop.addUpdatable(cubeInteract);
  }

  loop.start();
}

main();
