import Loop from "../systems/loop";
import { createCamera } from "./camera";
import { createRenderer } from "./renderer";
import { createScene } from "./scene";

/**
 * default startup for the demo 3D app
 * @param containerId id of the container where canvas must be placed
 * @returns renderer, camera, scene and loop
 */
export function startup(containerId: string) {
  const container = document.querySelector<HTMLDivElement>(containerId);
  const renderer = createRenderer();
  const camera = createCamera();
  const scene = createScene();
  const loop = new Loop(renderer, camera, scene);

  container?.appendChild(renderer.domElement);

  return {
    renderer,
    camera,
    scene,
    loop,
  };
}
