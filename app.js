//Setup
let container;
let camera;
let renderer;
let scene;
let car;
let keyboard;

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
  camera.position.set(0, 4, 13);
  scene.add(camera);

  const ambient = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(0, 0, 50);
  scene.add(light);

  // Renderer
  renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  // Create Floor
  let geometry = new THREE.PlaneGeometry(100, 50);
  let material = new THREE.MeshBasicMaterial({color: 0x404040});
  let floor = new THREE.Mesh(geometry, material);
  floor.position.y = -1.9;
  floor.rotation.x = 90;
  floor.material.side = THREE.DoubleSide;
  scene.add(floor);

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
  //car.rotation.z += 0.005;
  renderer.render(scene, camera);
}

const keyControls = () => {
  // Create keys to move GLTF object
}

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);