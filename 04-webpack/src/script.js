import * as THREE from 'three';

import './style.css';

const canvas = document.querySelector('#webgl');

// Sizes
const sizes = {
  width: 800,
  height: 600,
}

// Scene
const scene = new THREE.Scene();

// Red cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();

// Animations
const tick = () => {
  // Fix time
  const elapsedTime = clock.getElapsedTime()

  mesh.position.y = Math.sin(elapsedTime);
  mesh.position.x = Math.cos(elapsedTime);

  camera.lookAt(mesh.position)
  
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
}

tick();
