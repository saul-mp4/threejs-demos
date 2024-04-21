import { PerspectiveCamera } from "three";

/**
 * Creates camera instance and sets default settings for position and lookAt
 * position - 0, 20, 35
 * lookAt - 0, 0, 0
 * @returns camera instance
 */
export function createCamera() {
  const windowHeight = window.screen.height;
  const windowWidth = window.screen.width;
  const camera = new PerspectiveCamera(
    45,
    windowWidth / windowHeight,
    0.1,
    1000
  );

  camera.position.set(0, 20, 35);
  camera.lookAt(0, 0, 0);

  return camera;
}
