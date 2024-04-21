import {
  Clock,
  Object3D,
  type Camera,
  type Scene,
  type WebGLRenderer,
} from "three";
import { InteractiveObject } from "../components";

export interface UpdatableObject {
  object: Object3D;
  tick: (delta: number) => void;
}

export default class Loop {
  private renderer: WebGLRenderer;
  private camera: Camera;
  private scene: Scene;
  private clock = new Clock();
  private updatables: UpdatableObject[] = [];

  constructor(renderer: WebGLRenderer, camera: Camera, scene: Scene) {
    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;
  }

  start() {
    this.clock.start();
    this.renderer.setAnimationLoop(() => {
      this.tick();
      this.renderer.render(this.scene, this.camera);
    });
  }
  stop() {
    this.clock.stop();
    this.renderer.setAnimationLoop(null);
  }
  tick() {
    const delta = this.clock.getDelta();

    for (const object of this.updatables) {
      object.tick(delta);
    }
  }
  // addUpdatable(
  //   object: UpdatableObject["object"],
  //   tick: UpdatableObject["tick"]
  // ) {
  //   this.updatables.push({ object, tick });
  // }
  addUpdatable(upd: InteractiveObject) {
    this.updatables.push(upd);
  }
  removeUpdatable(upd: InteractiveObject) {
    const ind = this.updatables.findIndex((v) => v.object.id === upd.object.id);
    if (ind !== -1) {
      this.updatables.splice(ind, 1);
    }
  }
}
