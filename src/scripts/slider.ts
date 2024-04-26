// Create wrapper class for object 3d that will manage all animated transformations
// Create two buttons to turn slider on left and right
// Create hex slider component?

import {
  CircleGeometry,
  DoubleSide,
  Mesh,
  MeshPhongMaterial,
  NearestFilter,
  RepeatWrapping,
  MathUtils,
  SpotLight,
  BoxGeometry,
  Object3D,
  Vector3,
} from "three";
import { InteractiveObject, createTextureLoader, startup } from "../components";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function main() {
  const { camera, scene, loop, renderer } = startup("app");

  camera.position.set(0, 15, 45);
  camera.lookAt(0, 0, 8);

  const { loadColorTexture } = createTextureLoader();

  const controls = new OrbitControls(camera, renderer.domElement);
  const controlsUpd = new InteractiveObject(controls as any);
  controlsUpd.tickEvent = () => {
    controls.update();
  };
  loop.addUpdatable(controlsUpd);

  // slider object
  const sliderObject = new Object3D();
  scene.add(sliderObject);

  //floor
  const planeSize = 80;

  const texture = loadColorTexture("../../resources/images/checker.png");
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.magFilter = NearestFilter;
  const repeats = planeSize / 2;
  texture.repeat.set(repeats, repeats);

  const planeGeo = new CircleGeometry(16, 6);
  const planeMat = new MeshPhongMaterial({
    map: texture,
    side: DoubleSide,
  });
  const planeMesh = new Mesh(planeGeo, planeMat);
  planeMesh.rotation.x = MathUtils.degToRad(90);
  planeMesh.rotation.z = MathUtils.degToRad(30);
  sliderObject.add(planeMesh);

  //cube
  const cubeSize = 3;
  const positions = [
    new Vector3(0, 1.8, 12),
    new Vector3(-10, 1.8, 6),
    new Vector3(-10, 1.8, -6),
    new Vector3(0, 1.8, -12),
    new Vector3(10, 1.8, 6),
    new Vector3(10, 1.8, -6),
  ];
  const cubes = positions.map((pos) => {
    const cubeGeo = new BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMat = new MeshPhongMaterial({ color: "#8AC" });
    const cubeMesh = new Mesh(cubeGeo, cubeMat);
    cubeMesh.position.copy(pos);
    return cubeMesh;
  });
  cubes.forEach((cube) => sliderObject.add(cube));

  // light
  const light = new SpotLight(0xfff6d3, 200, 30, 1);
  light.position.set(0, 15, 16);
  light.lookAt(0, 0, 16);
  scene.add(light);

  // slider functions
  const planeUpd = new InteractiveObject(sliderObject);
  loop.addUpdatable(planeUpd);

  // buttons
  let currSlide = 0;

  const left = document.getElementById("left");
  const right = document.getElementById("right");

  left?.addEventListener("click", () => {
    ++currSlide;
    if (currSlide > 5) {
      currSlide = 0;
    }
    const rotation = currSlide * 60;
    planeUpd.rotateByAxis(rotation, 900, "x");
  });

  right?.addEventListener("click", () => {
    --currSlide;
    if (currSlide < -5) {
      currSlide = 0;
    }
    const rotation = currSlide * 60;
    planeUpd.rotateByAxis(rotation, 900, "x");
  });

  loop.start();
}

main();
