import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'

import * as dat from 'dat.gui'

/**
 * Texture
 */

const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);

const colorTexture = textureLoader.load('/textures/door/color.jpg');
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const heightTexture = textureLoader.load('/textures/door/height.jpg');
const normalTexture = textureLoader.load('/textures/door/normal.jpg');
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

colorTexture.repeat.x = 2;
colorTexture.repeat.y = 2;
colorTexture.wrapS = THREE.MirroredRepeatWrapping;
colorTexture.wrapT = THREE.RepeatWrapping;

colorTexture.offset.x = 0.5;

colorTexture.center.x = 0.5;
colorTexture.center.y = 0.5;
colorTexture.rotation = Math.PI / 4;

loadingManager.onProgress = () => {
  console.log('on progress');
}

/**
 * Debug
 */
const gui = new dat.GUI({ closed: true, width: 400 }); // can pass init panel parameters

const parameters = {
  color: 0xff0000,
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
  }
}

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
  // update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// window.addEventListener('dblclick', () => {
//   if (!document.fullscreenElement) {
//     canvas.requestFullscreen();
//   } else {
//     document.exitFullscreen();
//   }
// });

/**
 * Cursor
 */
const cursor = {
  x: 0,
  y: 0,
}

window.addEventListener('mousemove', (evt) => {
  cursor.x = evt.clientX / sizes.width - 0.5;
  cursor.y = - (evt.clientY / sizes.height - 0.5);
})

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxBufferGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({
  map: colorTexture
})

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Debug
gui
  .add(mesh.position, 'y')
  .min(-3)
  .max(3)
  .step(0.01)
  .name('elevation');

gui
  .add(mesh, 'visible');

gui
  .add(material, 'wireframe');

gui
  .addColor(parameters, 'color')
  .onChange(() => material.color.set(parameters.color))

const folderAnimation = gui.addFolder('Animations');
folderAnimation.open();

folderAnimation
  .add(parameters, 'spin')
  .name('gsap spin animation')

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;

    // Update camera
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
    // camera.position.y = cursor.y * 5;
    // camera.lookAt(mesh.position);

    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()