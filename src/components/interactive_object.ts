import { Object3D, SpotLight, Vector3 } from "three";
import { Tween, update as tweenUpdate } from "@tweenjs/tween.js";

/**
 * Utility class that makes transformations easier
 */
export class InteractiveObject {
  public object: Object3D;
  public tickEvent?: (delta: number) => void;
  constructor(object: Object3D) {
    this.object = object;
  }
  tick(delta: number) {
    this.tickEvent && this.tickEvent(delta);
    tweenUpdate();
  }
  moveTo(destination: Vector3, time: number) {
    const currentPosition = this.object.position.clone();

    new Tween(currentPosition)
      .to(destination, time)
      .onUpdate(() => {
        this.object.position.copy(currentPosition);
      })
      .start();
  }
}

export class InteractiveSpotlight extends InteractiveObject {
  public object: SpotLight;

  constructor(object: SpotLight) {
    super(object);
    
    this.object = object;
  }

  moveLookTo(destination: Vector3, time: number) {
    const currentPosition = this.object.target.position.clone();

    new Tween(currentPosition)
      .to(destination, time)
      .onUpdate(() => {
        this.object.target.position.copy(currentPosition);
      })
      .start();
  }
}
