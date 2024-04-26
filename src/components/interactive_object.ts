import { MathUtils, Object3D, SpotLight, Vector3 } from "three";
import { Easing, Tween, update as tweenUpdate } from "@tweenjs/tween.js";

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
      .onUpdate((tweenPos) => {
        this.object.position.copy(tweenPos);
      })
      .start();
  }

  rotateByAxis(rotation: number, time: number, axis: "x" | "y" | "z" = "x") {
    const destination = MathUtils.degToRad(rotation);
    const start = this.object.rotation[axis];
    new Tween({ t: start })
      .easing(Easing.Bounce.Out)
      .to({ t: destination }, time)
      .onUpdate((step) => {
        this.object.rotation[axis] = step.t;
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
