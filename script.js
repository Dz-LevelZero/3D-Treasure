// Variable for setup

let container,camera, scene, renderer,treasure;

const init = () => {
  container = document.querySelector('.scene');

  // Create scene
  scene = new THREE.Scene();

  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 100;

  // Create camera
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 10);

  // Create AmbientLight
  const ambientLight = new THREE.AmbientLight(0x404040, 6);
  scene.add(ambientLight);

  // Create directional light
  const directionalLight = new THREE.DirectionalLight(0xB3C75A, 4);
  directionalLight.position.set(0, 0, 10);
  scene.add(directionalLight);

  // Create renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Add renderer to container
  container.appendChild(renderer.domElement);

  // Load Model
  let loader = new THREE.GLTFLoader();
  loader.load('./3d/scene.gltf', (gltf) => {
    scene.add(gltf.scene);
    treasure = gltf.scene.children[0];
    animate();
  })
}

const animate = () => {
  requestAnimationFrame(animate);
  treasure.rotation.z += 0.005;
  renderer.render(scene, camera);
}

init();

const onWindowResize = () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}
window.addEventListener('resize', onWindowResize);