import {
  BoxGeometry,
  DoubleSide,
  Mesh,
  MeshPhongMaterial,
  NearestFilter,
  PlaneGeometry,
  RepeatWrapping,
  SphereGeometry,
  SpotLight,
} from "three";
import {
  InteractiveObject,
  InteractiveSpotlight,
  createTextureLoader,
  startup,
} from "../components";

function main() {
  const { camera, scene, loop } = startup("app");

  camera.position.set(0, 25, 45);

  const { loadColorTexture } = createTextureLoader();

  //floor
  const planeSize = 80;

  const texture = loadColorTexture("../../resources/images/checker.png");
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.magFilter = NearestFilter;
  const repeats = planeSize / 2;
  texture.repeat.set(repeats, repeats);

  const planeGeo = new PlaneGeometry(planeSize, planeSize);
  const planeMat = new MeshPhongMaterial({
    map: texture,
    side: DoubleSide,
  });
  const planeMesh = new Mesh(planeGeo, planeMat);
  planeMesh.rotation.x = Math.PI * -0.5;
  planeMesh.position.x = 15;
  scene.add(planeMesh);

  // light
  const light = new SpotLight(0xfff6d3, 100, 20, 15);
  light.position.set(0, 12, 0);
  light.target.position.set(0, 0, 0);
  scene.add(light);

  const lightInteract = new InteractiveSpotlight(light);
  loop.addUpdatable(lightInteract);

  // camera tick event
  const cameraInteract = new InteractiveObject(camera);
  cameraInteract.tickEvent = () => {
    camera.position.x = light.position.x;
    camera.lookAt(light.target.position);
  };
  loop.addUpdatable(cameraInteract);

  //cube
  const cubeSize = 6;
  const cubeGeo = new BoxGeometry(cubeSize, cubeSize, cubeSize);
  const cubeMat = new MeshPhongMaterial({ color: "#8AC" });
  const cubeMesh = new Mesh(cubeGeo, cubeMat);
  cubeMesh.position.set(0, cubeSize / 2, 0);
  scene.add(cubeMesh);

  //sphere
  const sphereRadius = 3;
  const sphereWidthDivisions = 32;
  const sphereHeightDivisions = 16;
  const sphereGeo = new SphereGeometry(
    sphereRadius,
    sphereWidthDivisions,
    sphereHeightDivisions
  );
  const sphereMat = new MeshPhongMaterial({ color: "#CA8" });
  const sphereMesh = new Mesh(sphereGeo, sphereMat);
  sphereMesh.position.set(30, sphereRadius + 1, 0);
  scene.add(sphereMesh);

  // destinations
  const cubeDestination = cubeMesh.position.clone();
  cubeDestination.y = 12;
  const sphereDestination = sphereMesh.position.clone();
  sphereDestination.y = 12;

  // button
  const button = document.getElementById("button");
  let directionTo = "sphere";

  button?.addEventListener("click", () => {
    if (directionTo === "sphere") {
      lightInteract.moveTo(sphereDestination, 3000);
      lightInteract.moveLookTo(sphereMesh.position, 3000);
      directionTo = "cube";
    } else {
      lightInteract.moveTo(cubeDestination, 3000);
      lightInteract.moveLookTo(cubeMesh.position, 3000);
      directionTo = "sphere";
    }
  });

  loop.start();
}

main();