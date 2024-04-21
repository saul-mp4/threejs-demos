import {
  MeshPhongMaterial,
  DodecahedronGeometry,
  MathUtils,
  Mesh,
  AmbientLight,
} from "three";
import { InteractiveObject, startup } from "../components";

function main() {
  // init
  const { camera, scene, loop, renderer } = startup("app");
  camera.position.set(0, 45, 90);
  camera.lookAt(0, 0, 0);

  // utils
  const createTurnTick = (mesh: Mesh) => {
    const radPerSecond = MathUtils.degToRad(30);
    return (delta: number) => {
      mesh.rotateY(radPerSecond * delta);
    };
  };

  //sun
  const sunGeomtry = new DodecahedronGeometry(7, 3);
  const sunMaterial = new MeshPhongMaterial({
    color: 0xf6ee04,
    emissive: 0xeb0000,
    shininess: 200,
  });
  const sunMesh = new Mesh(sunGeomtry, sunMaterial);
  const sunInteract = new InteractiveObject(sunMesh);
  sunInteract.tickEvent = createTurnTick(sunMesh);
  scene.add(sunMesh);
  loop.addUpdatable(sunInteract);

  //earth
  const earthGeometry = new DodecahedronGeometry(2, 2);
  const earthMaterial = new MeshPhongMaterial({
    color: 0x0499f6,
    emissive: 0x223862,
    shininess: 150,
  });
  const earthMesh = new Mesh(earthGeometry, earthMaterial);
  earthMesh.position.x = 18;
  const earthInteract = new InteractiveObject(sunMesh);
  earthInteract.tickEvent = createTurnTick(earthMesh);
  sunMesh.add(earthMesh);
  loop.addUpdatable(earthInteract);

  //moon
  const moonGeometry = new DodecahedronGeometry(1, 1);
  const moonMaterial = new MeshPhongMaterial({
    color: 0xf6f1d5,
    emissive: 0x737373,
    shininess: 10,
  });
  const moonMesh = new Mesh(moonGeometry, moonMaterial);
  moonMesh.position.x = 5;
  const moonInteract = new InteractiveObject(moonMesh);
  moonInteract.tickEvent = createTurnTick(moonMesh);
  earthMesh.add(moonMesh);
  loop.addUpdatable(moonInteract);

  //light
  const light = new AmbientLight(0x404040, 35);
  scene.add(light);

  //button
  const button = <HTMLInputElement>document.getElementById("switch");
  button.addEventListener("change", (e) => {
    if ((e.target as HTMLInputElement).checked) {
      loop.start();
    } else {
      loop.stop();
    }
  });

  renderer.render(scene, camera);
}

main();
