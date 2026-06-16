import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { gsap } from "https://cdn.skypack.dev/gsap";

const camera = new THREE.PerspectiveCamera(
  10,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 13;

const scene = new THREE.Scene();
let bee;
let mixer;

const loader = new GLTFLoader();
loader.load("models/bee.glb", function (gltf) {
  bee = gltf.scene;
  const isMobile = window.innerWidth <= 767;

  if (isMobile) {
    bee.scale.set(0.2, 0.2, 0.2);
    bee.position.y += 1;
  } else {
    bee.scale.set(0.1, 0.1, 0.1);
    bee.position.y += 1;
  }

  scene.add(bee);
  mixer = new THREE.AnimationMixer(bee);
  mixer.clipAction(gltf.animations[0]).play();
  modelMove();
});

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

// Lighting
scene.add(new THREE.AmbientLight(0xffffff, 1.3));
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);

const reRender3D = () => {
  requestAnimationFrame(reRender3D);
  renderer.render(scene, camera);
  if (mixer) mixer.update(0.02);
};
reRender3D();

const isMobile = window.innerWidth <= 767;
const arrPositionModel = isMobile
  ? [
      {
        id: "banner",
        position: { x: 0, y: -0.5, z: 5 },
        rotation: { x: 0, y: 1.2, z: 0 },
      },
      {
        id: "intro",
        position: { x: -0.5, y: -0.8, z: -4 },
        rotation: { x: 0.4, y: -0.4, z: 0 },
      },
      {
        id: "description",
        position: { x: 0.2, y: -0.8, z: -2 },
        rotation: { x: 0, y: 0.4, z: 0 },
      },
      {
        id: "contact",
        position: { x: -0.3, y: -1.1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
      },
    ]
  : [
      {
        id: "banner",
        position: { x: 0, y: -0.94, z: 0 },
        rotation: { x: 0, y: 1.5, z: 0 },
      },
      {
        id: "intro",
        position: { x: -1, y: -1, z: -5 },
        rotation: { x: 0.5, y: -0.5, z: 0 },
      },
      {
        id: "description",
        position: { x: 1.7, y: -1, z: -5 },
        rotation: { x: 0, y: 0.5, z: 0 },
      },
      {
        id: "contact",
        position: { x: -1.3, y: -1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
      },
    ];

function modelMove() {
  const sections = document.querySelectorAll(".section");
  let currentSection;
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 3) currentSection = section.id;
  });

  const pos = arrPositionModel.find((val) => val.id === currentSection);
  if (pos) {
    gsap.to(bee.position, {
      x: pos.position.x,
      y: pos.position.y,
      z: pos.position.z,
      duration: 3,
      ease: "power1.out",
    });
    gsap.to(bee.rotation, {
      x: pos.rotation.x,
      y: pos.rotation.y,
      z: pos.rotation.z,
      duration: 3,
      ease: "power1.out",
    });
  }
}

window.addEventListener("scroll", () => {
  if (bee) modelMove();
});

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");

hamburger.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
});

// SKYBOT LOGIC 👇
function showSkybot() {
  const bot = document.getElementById("skybot-wrapper");
  if (bot) bot.style.display = "block";

  if (window.innerWidth <= 768) {
    document.getElementById("main-navbar").style.display = "none";
  }
}

function userReply(message) {
  const chat = document.getElementById("skybot-chat");

  const userMsg = document.createElement("div");
  userMsg.className = "chat-msg user-msg";
  userMsg.textContent = message;
  chat.appendChild(userMsg);

  const options = document.querySelector(".chat-options");
  if (options) options.remove();

  setTimeout(() => {
    const botMsg = document.createElement("div");
    botMsg.className = "chat-msg bot-msg";

    if (message === "What is skynet ?") {
      botMsg.textContent =
        "SkyneTBee is a tech company where we learn, build, and earn. We develop websites, apps, AI, and more.";
    } else if (message === "What are the benifits of being in Skynet ?") {
      botMsg.textContent =
        "Being in SkyneTBee means hands-on learning in real-world projects while earning. You can work in different wings like Web, Android App Development, Apple App Development, Robotics, AI, etc. Monthly salaries vary — from ₹10000 to ₹50000+ — even for students. We teach first, then pay for performance.";
    } else if (message === "Other Help") {
      botMsg.innerHTML = "You can call us at <strong>+91 73737 33020</strong>";
    } else {
      botMsg.textContent = "Thank you for reaching out!";
    }

    chat.appendChild(botMsg);
  }, 500);

  setTimeout(() => {
    const newOptions = document.createElement("div");
    newOptions.className = "chat-options";

    const allOptions = [
      "What is skynet ?",
      "What are the benifits of being in Skynet ?",
      "Other Help",
    ];
    allOptions.forEach((opt) => {
      if (opt !== message) {
        const btn = document.createElement("button");
        btn.className = "skybot-option";
        btn.textContent = opt;
        btn.onclick = () => userReply(opt);
        newOptions.appendChild(btn);
      }
    });

    chat.appendChild(newOptions);
  }, 2000);
}

// Close chat if clicked outside
document.addEventListener("click", function (event) {
  const botWrapper = document.getElementById("skybot-wrapper");
  const isInsideChat = botWrapper.contains(event.target);
  const isSkybotNav = event.target.id === "skybot-nav-btn";

  if (!isInsideChat && !isSkybotNav && botWrapper.style.display === "block") {
    botWrapper.style.display = "none";

    const chat = document.getElementById("skybot-chat");
    chat.innerHTML = `
      <div class="chat-msg bot-msg">Any doubts ? I'm here to assist you.</div>
      <div class="chat-options">
        <button onclick="userReply('What is skynet ?')">What is skynet ?</button>
        <button onclick="userReply('What are the benifits of being in Skynet ?')">App Support</button>
        <button onclick="userReply('Other Help')">Other Help</button>
      </div>
    `;

    if (window.innerWidth <= 768) {
      document.getElementById("main-navbar").style.display = "block";
    }
  }
});

// Set pointer cursor for nav item

const skybotNav = document.getElementById("skybot-nav-btn");
if (skybotNav) {
  skybotNav.style.cursor = "pointer";
  skybotNav.addEventListener("click", () => {
    showSkybot();

    // 🔽 Hide navbar in mobile view
    if (window.innerWidth <= 768) {
      const nav = document.getElementById("main-navbar");
      if (nav) nav.style.display = "none";
    }
  });
}
document.getElementById("skybot-nav-btn")?.addEventListener("click", () => {
  // Hide mobile nav only if on mobile view
  if (window.innerWidth <= 768) {
    const mobileNav = document.getElementById("mobileNav");
    if (mobileNav) {
      mobileNav.classList.remove("open"); // hides the nav using CSS transition
    }
  }

  // Show bot or run whatever logic you already have
  showSkybot();
});
