import { WebGLRenderer } from "three";

export function createRenderer() {
  const renderer = new WebGLRenderer({ antialias: true });

  const windowHeight = window.screen.height;
  const windowWidth = window.screen.width;
  renderer.setSize(windowWidth, windowHeight);

  return renderer;
}
