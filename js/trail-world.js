import * as THREE from "three";
import { projects } from "./trail-data.js";

const canvas = document.querySelector("#trail-canvas");
const scrollSection = document.querySelector("#trail-scroll");
const stickyStage = document.querySelector(".trail-sticky");
const hotspotLayer = document.querySelector("#island-hotspots");
const preview = document.querySelector("#island-preview");
const counter = document.querySelector("#scene-counter");
const fallback = document.querySelector("#scene-fallback");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!canvas || !scrollSection || !stickyStage || projects.length === 0) {
  throw new Error("The 3D trail could not find its required page elements.");
}

const COLORS = {
  background: 0x08090d,
  rock: 0x242531,
  rockSide: 0x171821,
  stone: 0x343544,
  stoneLight: 0x4a465b,
  violet: 0xa78bfa,
  violetLight: 0xd8d3f0,
  pale: 0xf2f0f7,
  muted: 0x9694a3
};

const scene = new THREE.Scene();
scene.background = new THREE.Color(COLORS.background);
scene.fog = new THREE.FogExp2(COLORS.background, 0.0105);

const camera = new THREE.OrthographicCamera(-9, 9, 5.5, -5.5, 0.1, 160);
camera.position.set(0, 10, 16);
camera.zoom = 1.08;
camera.updateProjectionMatrix();

let renderer;
try {
  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: "high-performance"
  });
} catch (error) {
  console.error("WebGL could not be initialized.", error);
  fallback.hidden = false;
  canvas.hidden = true;
  throw error;
}

renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.65));
renderer.setSize(stickyStage.clientWidth, stickyStage.clientHeight, false);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;

scene.add(new THREE.HemisphereLight(0xe8e1ff, 0x17151f, 2.0));

const keyLight = new THREE.DirectionalLight(0xe5dcff, 3.2);
keyLight.position.set(-8, 18, 12);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(1024, 1024);
keyLight.shadow.camera.left = -18;
keyLight.shadow.camera.right = 18;
keyLight.shadow.camera.top = 26;
keyLight.shadow.camera.bottom = -26;
keyLight.shadow.bias = -0.00025;
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0x8c75c2, 1.25);
fillLight.position.set(10, 8, -16);
scene.add(fillLight);

const materials = {
  deep: new THREE.MeshStandardMaterial({ color: COLORS.rockSide, roughness: 0.92 }),
  rock: new THREE.MeshStandardMaterial({ color: COLORS.rock, roughness: 0.9 }),
  stone: new THREE.MeshStandardMaterial({ color: COLORS.stone, roughness: 0.84 }),
  lightStone: new THREE.MeshStandardMaterial({ color: COLORS.stoneLight, roughness: 0.72 }),
  metal: new THREE.MeshStandardMaterial({ color: 0x625d72, metalness: 0.55, roughness: 0.42 }),
  pale: new THREE.MeshStandardMaterial({ color: COLORS.pale, roughness: 0.56 }),
  violet: new THREE.MeshStandardMaterial({
    color: COLORS.violet,
    emissive: 0x514073,
    emissiveIntensity: 0.68,
    roughness: 0.45,
    metalness: 0.16
  }),
  glow: new THREE.MeshStandardMaterial({
    color: COLORS.violetLight,
    emissive: 0x9e7de8,
    emissiveIntensity: 1.1,
    roughness: 0.38
  }),
  darkGlass: new THREE.MeshStandardMaterial({
    color: 0x1b1925,
    emissive: 0x251e35,
    emissiveIntensity: 0.5,
    metalness: 0.22,
    roughness: 0.25
  })
};

const world = new THREE.Group();
scene.add(world);

const nodes = [];
const nodeById = new Map();
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const clock = new THREE.Clock();
let activeId = null;
let scrollProgress = 0;
let frameHandle = 0;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function makeMesh(parent, geometry, material, x, y, z, options = {}) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  mesh.castShadow = options.castShadow !== false;
  mesh.receiveShadow = options.receiveShadow !== false;
  if (options.rotation) {
    mesh.rotation.set(options.rotation.x || 0, options.rotation.y || 0, options.rotation.z || 0);
  }
  parent.add(mesh);
  return mesh;
}

function addBox(parent, width, height, depth, x, y, z, material, rotation = null) {
  return makeMesh(
    parent,
    new THREE.BoxGeometry(width, height, depth),
    material,
    x, y, z,
    rotation ? { rotation } : {}
  );
}

function addCylinder(parent, topRadius, bottomRadius, height, segments, x, y, z, material, rotation = null) {
  return makeMesh(
    parent,
    new THREE.CylinderGeometry(topRadius, bottomRadius, height, segments),
    material,
    x, y, z,
    rotation ? { rotation } : {}
  );
}

function addSphere(parent, radius, x, y, z, material, scale = null) {
  const mesh = makeMesh(parent, new THREE.SphereGeometry(radius, 18, 14), material, x, y, z);
  if (scale) mesh.scale.set(scale.x, scale.y, scale.z);
  return mesh;
}

function makePanelTexture(title, detail) {
  const surface = document.createElement("canvas");
  surface.width = 640;
  surface.height = 320;
  const context = surface.getContext("2d");
  const gradient = context.createLinearGradient(0, 0, 640, 320);
  gradient.addColorStop(0, "#242132");
  gradient.addColorStop(1, "#11121a");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 640, 320);
  context.strokeStyle = "rgba(216,211,240,.27)";
  context.lineWidth = 4;
  context.strokeRect(13, 13, 614, 294);
  context.fillStyle = "#a78bfa";
  context.fillRect(34, 36, 45, 4);
  context.fillStyle = "#f2f0f7";
  context.font = "700 38px Manrope, sans-serif";
  context.fillText(String(title).slice(0, 26), 34, 142);
  context.fillStyle = "#bdb6cc";
  context.font = "500 21px 'DM Mono', monospace";
  context.fillText(String(detail).slice(0, 42), 36, 202);
  context.fillStyle = "rgba(167,139,250,.7)";
  context.fillRect(36, 248, 170, 3);
  const texture = new THREE.CanvasTexture(surface);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return texture;
}

function addScreen(parent, title, detail, width, height, x, y, z, rotation = null) {
  const texture = makePanelTexture(title, detail);
  const mesh = makeMesh(
    parent,
    new THREE.PlaneGeometry(width, height),
    new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide }),
    x, y, z,
    rotation ? { rotation } : {}
  );
  return mesh;
}

function addCrystal(parent, x, y, z, size, rotation = 0) {
  const crystal = makeMesh(
    parent,
    new THREE.OctahedronGeometry(size, 0),
    materials.violet,
    x, y, z,
    { rotation: { x: 0.15, y: rotation, z: 0.18 } }
  );
  crystal.scale.y = 1.75;
  return crystal;
}

function addIslandBase(group, index) {
  makeMesh(
    group,
    new THREE.ConeGeometry(1.47, 0.9, 9, 1),
    materials.deep,
    0, -0.25, 0,
    { rotation: { x: 0, y: index * 0.21, z: 0 } }
  );
  addCylinder(group, 1.54, 1.29, 0.52, 10, 0, 0.12, 0, materials.rock);
  addCylinder(group, 1.62, 1.58, 0.13, 10, 0, 0.42, 0, materials.stone);
  addCylinder(group, 1.46, 1.46, 0.035, 10, 0, 0.50, 0, materials.lightStone);

  const rim = makeMesh(
    group,
    new THREE.TorusGeometry(1.48, 0.025, 5, 40),
    materials.violet,
    0, 0.53, 0,
    { rotation: { x: Math.PI / 2, y: 0, z: 0 } }
  );
  rim.castShadow = false;

  addCrystal(group, -1.15, 0.62, 0.74, 0.17, index * 0.3);
  addCrystal(group, 1.14, 0.62, -0.78, 0.13, index * 0.5);
  addSphere(group, 0.09, -0.78, 0.61, -1.08, materials.glow, { x: 1.2, y: 0.55, z: 1.2 });
}

function themeProfile(group) {
  addCylinder(group, 0.48, 0.55, 0.18, 8, 0, 0.64, 0, materials.metal);
  addBox(group, 0.82, 1.06, 0.16, 0, 1.22, 0, materials.deep);
  addBox(group, 0.66, 0.88, 0.04, 0, 1.25, 0.102, materials.darkGlass);
  addScreen(group, "PROFILE", "NAME / AGE / TYPES", 0.58, 0.31, 0, 1.46, 0.13);
  addSphere(group, 0.115, 0, 1.08, 0.14, materials.violetLight);
  addBox(group, 0.29, 0.08, 0.03, 0, 0.88, 0.14, materials.lightStone);
  addBox(group, 0.38, 0.045, 0.03, 0, 0.78, 0.14, materials.metal);
  addBox(group, 0.3, 0.045, 0.03, 0, 0.7, 0.14, materials.metal);
}

function themeCalendar(group) {
  addBox(group, 1.18, 0.1, 0.72, 0, 0.66, 0, materials.deep);
  addBox(group, 0.92, 0.72, 0.13, 0, 1.14, 0, materials.stone);
  addBox(group, 0.78, 0.52, 0.04, 0, 1.16, 0.09, materials.darkGlass);
  addScreen(group, "WEEK", "01 — 07", 0.69, 0.4, 0, 1.16, 0.12);
  for (let i = 0; i < 7; i += 1) {
    const height = 0.22 + (i % 3) * 0.09;
    const x = -0.95 + i * 0.315;
    addBox(group, 0.16, height, 0.17, x, 0.6 + height / 2, -0.8, i === 0 ? materials.violet : materials.lightStone);
    addSphere(group, 0.065, x, 0.7 + height, -0.8, i === 0 ? materials.glow : materials.pale);
  }
}

function themeCalculator(group) {
  addBox(group, 1.2, 1.42, 0.18, 0, 1.32, 0, materials.deep);
  addBox(group, 1.04, 1.24, 0.045, 0, 1.34, 0.115, materials.stone);
  addScreen(group, "CALCULATOR", "123  +  456", 0.88, 0.34, 0, 1.79, 0.15);
  const columns = 3;
  for (let row = 0; row < 3; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const x = -0.32 + column * 0.32;
      const y = 1.34 - row * 0.24;
      const material = row === 0 && column === 2 ? materials.violet : materials.metal;
      addBox(group, 0.23, 0.15, 0.07, x, y, 0.16, material);
    }
  }
  addBox(group, 0.9, 0.1, 0.08, 0, 0.73, 0.12, materials.violet);
}

function themeArena(group) {
  addCylinder(group, 0.92, 1.12, 0.15, 9, 0, 0.62, 0, materials.deep);
  const rock = makeMesh(group, new THREE.DodecahedronGeometry(0.36, 0), materials.lightStone, -0.72, 1.0, 0);
  rock.rotation.set(0.22, 0.4, 0.16);
  addBox(group, 0.42, 0.56, 0.07, 0, 1.0, 0, materials.pale, { x: 0.08, y: 0, z: -0.08 });
  addBox(group, 0.4, 0.07, 0.08, 0, 1.02, 0.06, materials.lightStone);
  addBox(group, 0.07, 0.42, 0.08, 0.18, 1.0, 0.06, materials.lightStone);
  const bladeA = addBox(group, 0.07, 0.56, 0.07, 0.69, 1.0, 0, materials.violet, { x: 0, y: 0, z: 0.32 });
  const bladeB = addBox(group, 0.07, 0.56, 0.07, 0.83, 1.0, 0, materials.metal, { x: 0, y: 0, z: -0.32 });
  addCylinder(group, 0.15, 0.15, 0.08, 12, 0.63, 0.77, 0, materials.deep, { x: Math.PI / 2, y: 0, z: 0 });
  addCylinder(group, 0.15, 0.15, 0.08, 12, 0.93, 0.77, 0, materials.deep, { x: Math.PI / 2, y: 0, z: 0 });
}

function themeCheckpoint(group) {
  addBox(group, 0.2, 1.55, 0.22, -0.72, 1.28, 0, materials.lightStone);
  addBox(group, 0.2, 1.55, 0.22, 0.72, 1.28, 0, materials.lightStone);
  addBox(group, 1.65, 0.2, 0.24, 0, 2.02, 0, materials.stone);
  addBox(group, 0.82, 0.58, 0.14, 0, 1.23, 0.24, materials.deep);
  addBox(group, 0.66, 0.43, 0.035, 0, 1.24, 0.32, materials.darkGlass);
  addScreen(group, "ACCESS", "3 ATTEMPTS", 0.58, 0.32, 0, 1.25, 0.35);
  addBox(group, 0.3, 0.26, 0.12, 0, 0.79, 0.32, materials.violet);
  makeMesh(group, new THREE.TorusGeometry(0.105, 0.035, 8, 18, Math.PI), materials.glow, 0, 0.96, 0.34);
  for (let row = 0; row < 3; row += 1) {
    for (let column = 0; column < 3; column += 1) {
      addBox(group, 0.07, 0.06, 0.035, -0.22 + column * 0.22, 0.58 + row * 0.1, 0.28, materials.metal);
    }
  }
}

function themeBulletin(group) {
  addBox(group, 1.5, 1.02, 0.16, 0, 1.43, 0, materials.deep);
  addBox(group, 1.34, 0.86, 0.045, 0, 1.44, 0.105, materials.darkGlass);
  addScreen(group, "STUDENT REPORT", "AVERAGE / RESULT", 1.18, 0.24, 0, 1.77, 0.14);
  const heights = [0.22, 0.35, 0.28, 0.48];
  for (let i = 0; i < 4; i += 1) {
    const x = -0.42 + i * 0.28;
    addBox(group, 0.14, heights[i], 0.05, x, 0.95 + heights[i] / 2, 0.14, i === 3 ? materials.violet : materials.lightStone);
  }
  addBox(group, 1.05, 0.035, 0.035, 0, 0.92, 0.14, materials.metal);
  addBox(group, 0.8, 0.035, 0.035, 0, 0.83, 0.14, materials.metal);
  addCylinder(group, 0.06, 0.06, 0.8, 8, -0.55, 0.8, -0.02, materials.metal);
  addCylinder(group, 0.06, 0.06, 0.8, 8, 0.55, 0.8, -0.02, materials.metal);
}

function themeGarage(group) {
  addBox(group, 0.18, 1.48, 0.18, -0.95, 1.22, -0.1, materials.lightStone);
  addBox(group, 0.18, 1.48, 0.18, 0.95, 1.22, -0.1, materials.lightStone);
  addBox(group, 2.0, 0.18, 0.2, 0, 1.95, -0.1, materials.stone);
  addBox(group, 1.48, 0.3, 0.72, 0, 0.94, 0.02, materials.violet);
  addBox(group, 0.8, 0.35, 0.62, 0, 1.24, -0.02, materials.lightStone);
  addBox(group, 0.33, 0.23, 0.025, -0.2, 1.27, 0.31, materials.darkGlass);
  addBox(group, 0.33, 0.23, 0.025, 0.2, 1.27, 0.31, materials.darkGlass);
  for (const x of [-0.62, 0.62]) {
    for (const z of [-0.25, 0.28]) {
      addCylinder(group, 0.21, 0.21, 0.14, 14, x, 0.79, z, materials.deep, { x: 0, y: 0, z: Math.PI / 2 });
      addCylinder(group, 0.085, 0.085, 0.145, 12, x, 0.79, z + 0.01, materials.metal, { x: 0, y: 0, z: Math.PI / 2 });
    }
  }
  addBox(group, 0.2, 0.07, 0.025, -0.42, 1.03, 0.39, materials.glow);
  addBox(group, 0.2, 0.07, 0.025, 0.42, 1.03, 0.39, materials.glow);
}

function themeWorkstation(group) {
  addBox(group, 1.45, 0.12, 0.78, 0, 0.88, 0, materials.deep);
  addBox(group, 0.14, 0.52, 0.14, -0.52, 0.55, 0, materials.metal);
  addBox(group, 0.14, 0.52, 0.14, 0.52, 0.55, 0, materials.metal);
  addBox(group, 0.84, 0.66, 0.14, 0, 1.33, -0.16, materials.deep);
  addBox(group, 0.71, 0.52, 0.035, 0, 1.34, -0.075, materials.darkGlass);
  addScreen(group, "JAVA / DEV", "> build profile", 0.65, 0.43, 0, 1.34, -0.05);
  for (let i = 0; i < 7; i += 1) {
    addBox(group, 0.11, 0.035, 0.08, -0.36 + i * 0.12, 0.98, 0.27, i === 2 ? materials.violet : materials.metal);
  }
  addBox(group, 0.3, 0.4, 0.3, 0.93, 0.85, -0.25, materials.stone);
  addBox(group, 0.17, 0.08, 0.035, 0.93, 0.88, -0.08, materials.glow);
}

function themeLibrary(group) {
  addBox(group, 1.4, 1.24, 0.16, 0, 1.27, 0, materials.deep);
  addBox(group, 0.11, 1.32, 0.24, -0.64, 1.3, 0.04, materials.lightStone);
  addBox(group, 0.11, 1.32, 0.24, 0.64, 1.3, 0.04, materials.lightStone);
  for (let shelf = 0; shelf < 3; shelf += 1) {
    const y = 0.82 + shelf * 0.42;
    addBox(group, 1.28, 0.065, 0.3, 0, y, 0.02, materials.metal);
    for (let book = 0; book < 6; book += 1) {
      const width = 0.12 + (book % 2) * 0.035;
      const x = -0.49 + book * 0.19;
      const height = 0.23 + ((book + shelf) % 3) * 0.055;
      addBox(group, width, height, 0.2, x, y + 0.035 + height / 2, 0.035, (book + shelf) % 4 === 0 ? materials.violet : materials.lightStone);
    }
  }
  addBox(group, 0.95, 0.08, 0.24, 0, 2.02, 0.02, materials.stone);
}

function themeArchive(group) {
  addBox(group, 1.46, 0.14, 0.78, 0, 0.72, 0, materials.deep);
  for (let i = 0; i < 3; i += 1) {
    const x = -0.48 + i * 0.48;
    addBox(group, 0.34, 0.58, 0.25, x, 1.1, 0, materials.stone);
    addBox(group, 0.28, 0.38, 0.035, x, 1.1, 0.15, materials.darkGlass);
    addBox(group, 0.15, 0.025, 0.035, x, 1.2, 0.18, materials.violet);
    addBox(group, 0.18, 0.025, 0.035, x, 1.1, 0.18, materials.metal);
    addBox(group, 0.12, 0.025, 0.035, x, 1.0, 0.18, materials.metal);
  }
  addCylinder(group, 0.52, 0.52, 0.08, 12, 0, 0.79, -0.42, materials.metal);
  addScreen(group, "CANDIDATES", "ADD / FIND / REMOVE", 1.05, 0.32, 0, 1.75, -0.05);
  addBox(group, 1.12, 0.08, 0.42, 0, 0.65, 0.02, materials.violet);
}

const themeBuilders = {
  profile: themeProfile,
  calendar: themeCalendar,
  calculator: themeCalculator,
  arena: themeArena,
  checkpoint: themeCheckpoint,
  bulletin: themeBulletin,
  garage: themeGarage,
  workstation: themeWorkstation,
  library: themeLibrary,
  archive: themeArchive
};

function islandPosition(index) {
  const side = index % 2 === 0 ? -1 : 1;
  return new THREE.Vector3(side * 3.15, index * 0.62, -index * 3.45);
}

function buildIsland(project, index) {
  const group = new THREE.Group();
  const position = islandPosition(index);
  group.position.copy(position);
  group.userData.projectId = project.id;
  addIslandBase(group, index);

  const builder = themeBuilders[project.theme];
  if (builder) builder(group);

  group.traverse((child) => {
    if (child.isMesh) {
      child.userData.projectId = project.id;
    }
  });

  world.add(group);

  const hotspot = document.createElement("button");
  hotspot.className = "island-hotspot";
  hotspot.type = "button";
  hotspot.setAttribute("aria-label", "Open " + project.name + " project study");
  hotspot.innerHTML = '<span class="hotspot-number">' + String(project.step).padStart(2, "0") + '</span><span class="hotspot-name"></span>';
  hotspot.querySelector(".hotspot-name").textContent = project.name;
  hotspot.addEventListener("mouseenter", () => setActive(project.id));
  hotspot.addEventListener("focus", () => setActive(project.id));
  hotspot.addEventListener("mouseleave", (event) => {
    const nextTarget = event.relatedTarget;
    if (nextTarget && (preview.contains(nextTarget) || hotspotLayer.contains(nextTarget))) return;
    if (document.activeElement !== hotspot) setActive(null);
  });
  hotspot.addEventListener("blur", (event) => {
    const nextTarget = event.relatedTarget;
    if (nextTarget && (preview.contains(nextTarget) || hotspotLayer.contains(nextTarget))) return;
    setActive(null);
  });
  hotspot.addEventListener("click", () => openProject(project));
  hotspotLayer.appendChild(hotspot);

  const node = {
    project,
    group,
    position,
    hotspot,
    targetScale: 1,
    ring: group.children.find((child) => child.geometry && child.geometry.type === "TorusGeometry") || null
  };
  nodes.push(node);
  nodeById.set(project.id, node);
}

function buildStairway() {
  for (let index = 0; index < projects.length - 1; index += 1) {
    const start = islandPosition(index);
    const end = islandPosition(index + 1);
    const delta = end.clone().sub(start);
    const steps = 7;
    const yaw = Math.atan2(delta.x, delta.z);

    for (let step = 1; step <= steps; step += 1) {
      const t = step / (steps + 1);
      const x = THREE.MathUtils.lerp(start.x, end.x, t);
      const y = THREE.MathUtils.lerp(start.y, end.y, t) + 0.54;
      const z = THREE.MathUtils.lerp(start.z, end.z, t);
      const stair = addBox(world, 0.88, 0.15, 0.78, x, y, z, step === steps ? materials.violet : materials.stone);
      stair.rotation.y = yaw;
      stair.castShadow = true;
    }
  }
}

function buildAtmosphere() {
  const positions = [];
  for (let index = 0; index < 420; index += 1) {
    const x = Math.sin(index * 12.9898) * 15;
    const y = ((index * 37) % 46) - 11;
    const z = -((index * 17) % 46) + 7;
    positions.push(x, y, z);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  const points = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({ color: COLORS.violetLight, size: 0.035, transparent: true, opacity: 0.6 })
  );
  world.add(points);

  for (let index = 0; index < 18; index += 1) {
    const z = -3 - index * 2.7;
    const x = Math.sin(index * 1.7) * 9.5;
    const rock = makeMesh(
      world,
      new THREE.IcosahedronGeometry(0.22 + (index % 3) * 0.11, 0),
      materials.deep,
      x, 0.8 + (index % 4) * 0.45, z
    );
    rock.rotation.set(index * 0.12, index * 0.3, index * 0.08);
  }
}

function setActive(projectId) {
  if (activeId === projectId) return;
  activeId = projectId;

  for (const node of nodes) {
    node.targetScale = node.project.id === projectId ? 1.075 : 1;
    node.hotspot.classList.toggle("is-active", node.project.id === projectId);
  }

  const project = projects.find((item) => item.id === projectId);
  if (!project) {
    preview.hidden = true;
    return;
  }

  document.querySelector("#preview-step").textContent = "STOP " + String(project.step).padStart(2, "0");
  document.querySelector("#preview-level").textContent = project.difficulty.toUpperCase();
  document.querySelector("#preview-title").textContent = project.name;
  document.querySelector("#preview-description").textContent = project.description;
  document.querySelector("#preview-concepts").replaceChildren(
    ...project.concepts.map((concept) => {
      const tag = document.createElement("span");
      tag.textContent = concept;
      return tag;
    })
  );
  document.querySelector("#preview-link").href = "project.html?project=" + encodeURIComponent(project.id);
  preview.hidden = false;
}

function openProject(project) {
  window.location.href = "project.html?project=" + encodeURIComponent(project.id);
}

function pickProject(event) {
  const bounds = canvas.getBoundingClientRect();
  pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
  pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(nodes.map((node) => node.group), true);
  if (hits.length === 0) return null;
  const id = hits[0].object.userData.projectId || hits[0].object.parent?.userData.projectId;
  return projects.find((project) => project.id === id) || null;
}

canvas.addEventListener("pointermove", (event) => {
  const project = pickProject(event);
  setActive(project ? project.id : null);
  canvas.style.cursor = project ? "pointer" : "grab";
});
canvas.addEventListener("pointerleave", (event) => {
  const nextTarget = event.relatedTarget;
  if (nextTarget && (preview.contains(nextTarget) || hotspotLayer.contains(nextTarget))) return;
  setActive(null);
  canvas.style.cursor = "grab";
});
preview.addEventListener("pointerleave", (event) => {
  const nextTarget = event.relatedTarget;
  if (nextTarget && (hotspotLayer.contains(nextTarget) || canvas.contains(nextTarget))) return;
  setActive(null);
});
canvas.addEventListener("click", (event) => {
  const project = pickProject(event);
  if (project) openProject(project);
});
canvas.style.cursor = "grab";

for (let index = 0; index < projects.length; index += 1) buildIsland(projects[index], index);
buildStairway();
buildAtmosphere();

const lookTarget = new THREE.Vector3();
const desiredTarget = new THREE.Vector3();
const cameraOffset = new THREE.Vector3(0, 8.8, 14.5);

function updateScrollProgress() {
  const sectionTop = scrollSection.getBoundingClientRect().top + window.scrollY;
  const scrollDistance = Math.max(1, scrollSection.offsetHeight - window.innerHeight);
  scrollProgress = clamp((window.scrollY - sectionTop) / scrollDistance, 0, 1);
}

function getTrailPosition(progress) {
  const location = progress * (nodes.length - 1);
  const index = Math.min(nodes.length - 2, Math.floor(location));
  const blend = location - index;
  if (progress >= 1) return nodes[nodes.length - 1].position.clone();
  return nodes[index].position.clone().lerp(nodes[index + 1].position, blend);
}

function updateHotspots() {
  const width = stickyStage.clientWidth;
  const height = stickyStage.clientHeight;

  for (const node of nodes) {
    const screenPosition = node.position.clone().add(new THREE.Vector3(0, 2.55, 0));
    screenPosition.project(camera);
    const x = (screenPosition.x * 0.5 + 0.5) * width;
    const y = (-screenPosition.y * 0.5 + 0.5) * height;
    const visible = screenPosition.z > -1 && screenPosition.z < 1 && x > 30 && x < width - 30 && y > 65 && y < height - 70;

    node.hotspot.classList.toggle("is-visible", visible);
    node.hotspot.tabIndex = visible ? 0 : -1;
    if (visible) {
      node.hotspot.style.left = x + "px";
      node.hotspot.style.top = y + "px";
    }
  }
}

function updateCounter(progress) {
  const step = Math.min(projects.length, Math.floor(progress * (projects.length - 1)) + 1);
  counter.innerHTML = String(step).padStart(2, "0") + " <i>/</i> " + String(projects.length).padStart(2, "0");
}

function resize() {
  const width = stickyStage.clientWidth;
  const height = stickyStage.clientHeight;
  if (width < 1 || height < 1) return;

  const halfHeight = 5.5;
  const aspect = width / height;
  camera.left = -halfHeight * aspect;
  camera.right = halfHeight * aspect;
  camera.top = halfHeight;
  camera.bottom = -halfHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.65));
  renderer.setSize(width, height, false);
  updateHotspots();
}

function animate() {
  frameHandle = window.requestAnimationFrame(animate);

  const progressTarget = getTrailPosition(scrollProgress);
  desiredTarget.copy(progressTarget);
  if (reducedMotion.matches) {
    lookTarget.copy(desiredTarget);
  } else {
    lookTarget.lerp(desiredTarget, 0.075);
  }

  const cameraGoal = lookTarget.clone().add(cameraOffset);
  if (reducedMotion.matches) camera.position.copy(cameraGoal);
  else camera.position.lerp(cameraGoal, 0.065);
  camera.lookAt(lookTarget);

  const elapsed = clock.getElapsedTime();
  for (const node of nodes) {
    const floating = reducedMotion.matches ? 0 : Math.sin(elapsed * 0.75 + node.project.step) * 0.035;
    node.group.position.y = node.position.y + floating;
    const scaleNow = node.group.scale.x;
    const scaleNext = THREE.MathUtils.lerp(scaleNow, node.targetScale, reducedMotion.matches ? 1 : 0.12);
    node.group.scale.setScalar(scaleNext);
  }

  updateHotspots();
  updateCounter(scrollProgress);
  renderer.render(scene, camera);
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", resize);
reducedMotion.addEventListener?.("change", () => {
  if (reducedMotion.matches) {
    for (const node of nodes) node.group.scale.setScalar(node.targetScale);
  }
});

updateScrollProgress();
resize();
animate();
