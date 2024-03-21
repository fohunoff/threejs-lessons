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

mesh.position.set(0.7, -0.6, 1); // set position

// Rotation
mesh.rotation.reorder('YXZ');
mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 0.25;

// Axes helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

camera.lookAt(mesh.position); // camera look at Vector3 (or position object)

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
