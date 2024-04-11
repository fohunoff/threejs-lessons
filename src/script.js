import './style.css'
import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three//examples/jsm/geometries/TextGeometry.js'

import * as dat from 'dat.gui';

const gui = new dat.GUI({ closed: false, width: 400 }); // can pass init panel parameters

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Axes helper
const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

/**
 * Texture
 */

const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('/textures/matcaps/1.png');

/**
 * Fonts
 */
const fontLoader = new FontLoader();

fontLoader.load(
  '/fonts/helvetiker_regular.typeface.json',
  (font) => {
    const BEVEL_SIZE = 0.02;
    const BEVEL_THICKNESS = 0.03;

    const textGeometry = new TextGeometry(
      'fohunoff',
      {
        font: font,
        size: 0.5,
        height: 0.2,
        curveSegment: 2,
        bevelEnabled: true,
        bevelSize: BEVEL_SIZE,
        bevelThickness: BEVEL_THICKNESS,
        bevelOffset: 0,
        bevelSegments: 2
      }
    )

    textGeometry.center()

    const material = new THREE.MeshMatcapMaterial({
      matcap: matcapTexture
    })

    const text = new THREE.Mesh(textGeometry, material);

    scene.add(text)

    const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45);

    for (let i = 0; i < 100; i++) {
      const donut = new THREE.Mesh(donutGeometry, material);

      donut.position.x = (Math.random() - 0.5) * 10 ;
      donut.position.y = (Math.random() - 0.5) * 10 ;
      donut.position.z = (Math.random() - 0.5) * 10 ;

      donut.rotation.x = Math.random() * Math.PI;
      donut.rotation.y = Math.random() * Math.PI;

      const scaleRandom = Math.random();
      donut.scale.x = scaleRandom
      donut.scale.y = scaleRandom
      donut.scale.z = scaleRandom

      scene.add(donut)
    } 
  }
)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // Array.from([sphere, plane, torus]).forEach(mesh => {
    //   mesh.rotation.y = 0.1 * elapsedTime;
    //   mesh.rotation.x = 0.15 * elapsedTime;
    // })

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()