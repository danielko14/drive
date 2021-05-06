//Setup
let container;
let camera;
let renderer;
let scene;
let car;
let keyboard;
let road;
let ground;
let xSpeed = 1;
let ySpeed = 1;

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
  camera.position.set(0, 2.5, 12);
  scene.add(camera);

  const ambient = new THREE.AmbientLight(0x404040, 1);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(0, 0, 10);
  scene.add(light);

  // Renderer
  renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  // Create Road
  let roadGeometry = new THREE.PlaneGeometry(10, 5000);
  let roadMaterial = new THREE.MeshBasicMaterial({color: 0x404040});
  road = new THREE.Mesh(roadGeometry, roadMaterial);
  road.position.y = -1;
  road.rotation.x = -Math.PI/2;
  road.material.side = THREE.DoubleSide;
  scene.add(road);

  // Create Ground
  let groundGeometry = new THREE.PlaneGeometry(1000, 5000);
  let groundMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
  ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.position.y = -1.1;
  ground.rotation.x = -Math.PI/2;
  ground.material.side = THREE.DoubleSide;
  scene.add(ground);

  // Controller

  // Load model
  let loader = new THREE.GLTFLoader();
  loader.load('/porsche_911_rauh-welt/scene.gltf', (gltf) => {
    scene.add(gltf.scene);
    car = gltf.scene.children[0];
    animate();
  });
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
      car.position.x -= 1;
      break;
    case keys.WASD_Right:
      car.position.x += 1;
      break;
    case keys.WASD_Up:
      car.position.z -= 2;
      camera.position.z -= 2;
      break;
    case keys.WASD_Down:
      car.position.z += 2;
      camera.position.z += 2;
      break;
  }
}

// function that follows car around

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);