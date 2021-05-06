//Setup
let container;
let camera;
let renderer;
let scene;
let car;
let keyboard;
let road;
let ground;
let carFacingAngle;

function init(){
  container = document.querySelector('.scene');

  // Create scene
  scene = new THREE.Scene();

  const fov = 50;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 10000;

  // Camera Setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(3, 2.5, 12);
  scene.add(camera);

  const ambient = new THREE.AmbientLight(0x404040, 1);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(0, 0, 10);
  scene.add(light);

  // Renderer
  renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  // Create Road
  const roadTex = THREE.ImageUtils.loadTexture("./road.png");
  roadTex.wrapS = THREE.RepeatWrapping;
  roadTex.wrapT = THREE.RepeatWrapping;
  roadTex.repeat.y = 100;

  let roadGeometry = new THREE.PlaneGeometry(10, 5000);
  let roadMaterial = new THREE.MeshBasicMaterial({map: roadTex});
  road = new THREE.Mesh(roadGeometry, roadMaterial);
  road.position.y = -1;
  road.rotation.x = -Math.PI/2;
  road.material.side = THREE.DoubleSide;
  scene.add(road);

  // Create Ground
  const groundTex = THREE.ImageUtils.loadTexture("./blueGrid.jpeg");
  groundTex.wrapS = THREE.RepeatWrapping;
  groundTex.wrapT = THREE.RepeatWrapping;
  groundTex.repeat.x = 35;
  groundTex.repeat.y = 120;

  let groundGeometry = new THREE.PlaneGeometry(1000, 5000);
  let groundMaterial = new THREE.MeshBasicMaterial({color: 0xffdd99});
  ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.position.y = -1.1;
  ground.rotation.x = -Math.PI/2;
  ground.material.side = THREE.DoubleSide;
  scene.add(ground);

  // Load model
  let loader = new THREE.GLTFLoader();
  loader.load('/porsche_911_rauh-welt/scene.gltf', (gltf) => {
    scene.add(gltf.scene);
    car = gltf.scene.children[0];
    car.position.set(2.5, 0, 3);
    animate();
  });

  // Add Rocks and Cactuses <-- Check if they work then create class constructors to instantiate many
  loader.load("./cactus/scene.gltf", (gltf) => {
    scene.add(gltf.scene);
    let cactus = gltf.scene.children[0];
    gltf.scene.scale.set(0.25, 0.25, 0.25);
    cactus.position.set(50, -3, -80);
    cactus.rotation.z = -Math.PI/2;
  })
}
init();

function animate() {
  requestAnimationFrame(animate);
  document.addEventListener("keydown", keyControls, false);
  renderer.render(scene, camera);
}

const keyControls = (e) => {
  // Create keys to move GLTF object
  const keys = {
    WASD_Left: 65,
    WASD_Right: 68,
    WASD_Up: 87,
    WASD_Down: 83
  }

  switch (e.keyCode) {
    case keys.WASD_Left:
      car.rotation.z += 0.05;
      //car.position.x -= 1;
      break;
    case keys.WASD_Right:
      car.rotation.z -= 0.05;
      break;
    case keys.WASD_Up:
      car.position.z -= 10;
      camera.position.z -= 10;
      break;
    case keys.WASD_Down:
      car.position.z += 10;
      camera.position.z += 10;
      break;
  }
}

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);