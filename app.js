import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';

const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 13;

const scene = new THREE.Scene();
let bee;
let mixer;
const loader = new GLTFLoader();
// Make sure bee is loaded before adding visibility toggle
loader.load('bee.glb', function (gltf) {
    bee = gltf.scene;
    bee.scale.set(0.2, 0.2, 0.2);
    scene.add(bee);

    mixer = new THREE.AnimationMixer(bee);
    mixer.clipAction(gltf.animations[0]).play();
    
    modelMove();  // Add movement logic for bee

    // Sidebar toggle logic
    const sidebarToggle = document.querySelector('.menu-button');
    const sidebarClose = document.querySelector('.sidebar li:first-child');

    sidebarToggle.addEventListener('click', showSidebar);
    sidebarClose.addEventListener('click', hideSidebar);
});

const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

// light
const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);


const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
    if(mixer) mixer.update(0.02);
};
reRender3D();

// Original positions and rotations
let arrPositionModel = [
    {
        id: 'banner',
        position: { x: 0.1, y: -0.5, z: 3 },
        rotation: { x: 0.5, y: -3.17, z: 0 }
    },
    {
        id: "intro",
        position: { x: -1, y: -0.5, z: 3 },
        rotation: { x: 0.2, y: -4, z: 0 },
    },
    {
        id: "description",
        position: { x: 1, y: -0.5, z: 3 },
        rotation: { x: 0.2, y: -2, z: 0 },
    },
    {
        id: "contact",
        position: { x: -1, y: -0.5, z: 0 },
        rotation: { x: 0.3, y: 0, z: 0 },
    },
    {
        id: "brand",
        position: { x: 1, y: 0, z: 0 },
        rotation: { x: 0.3, y: 0, z: 0 },
    }
];

// Function to adjust positions based on screen size
function adjustForScreenSize() {
    const isMobile = window.matchMedia("(max-width: 780px)").matches;

    if (isMobile) {
        arrPositionModel = arrPositionModel.map(model => {
            // Adjust positions and rotations for mobile
            return {
                id: model.id,
                position: {
                    x: model.position.x * 0.4,  // Scale down positions for mobile
                    y: model.position.y * 0.4,
                    z: model.position.z * 0.2
                },
                rotation: {
                    x: model.rotation.x * 1,  // Scale down rotations if needed
                    y: model.rotation.y * 1,
                    z: model.rotation.z * 1
                }
            };
        });
    }
}

// Call the function to adjust positions on load
adjustForScreenSize();

// Optionally, listen for window resize events
window.addEventListener('resize', adjustForScreenSize);

const modelMove = () => {
    const sections = document.querySelectorAll('.section');
    let currentSection;
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
            currentSection = section.id;
        }
    });
    let position_active = arrPositionModel.findIndex(
        (val) => val.id == currentSection
    );
    if (position_active >= 0) {
        let new_coordinates = arrPositionModel[position_active];
        gsap.to(bee.position, {
            x: new_coordinates.position.x,
            y: new_coordinates.position.y,
            z: new_coordinates.position.z,
            duration: 4,
            ease: "power1.out"
        });
        gsap.to(bee.rotation, {
            x: new_coordinates.rotation.x,
            y: new_coordinates.rotation.y,
            z: new_coordinates.rotation.z,
            duration: 4,
            ease: "power1.out"
        })
    }
}
window.addEventListener('scroll', () => {
    if (bee) {
        modelMove();
    }
})
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}) 
function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.add('open');
    // Hide the bee when sidebar is open
    if (bee) {
        bee.visible = false;  // Hide the bee
    }
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.remove('open');
    // Show the bee when sidebar is closed
    if (bee) {
        bee.visible = true;  // Show the bee
    }
}
