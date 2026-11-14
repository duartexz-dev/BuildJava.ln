import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { projects } from "./trail-data.js";

const canvas = document.querySelector("#trail-canvas");
const stage = document.querySelector("#trail-stage");
const hotspotLayer = document.querySelector("#island-hotspots");
const preview = document.querySelector("#island-preview");
const fallback = document.querySelector("#scene-fallback");
const resetButton = document.querySelector("#reset-view");

if (!canvas || !stage || !hotspotLayer || !preview || !resetButton || projects.length === 0) {
  throw new Error("The 3D trail is missing a required element or project.");
}

const COLORS = {
  background: 0x0d0e13,
  rock: 0x262832,
  rockSide: 0x191b22,
  stone: 0x363842,
  stoneLight: 0x555661,
  violet: 0x8f7ac4,
  violetLight: 0xc9c2d8,
  pale: 0xe9e7ef,
  muted: 0x9998a3
};

const scene = new THREE.Scene();
scene.background = new THREE.Color(COLORS.background);
scene.fog = new THREE.Fog(COLORS.background, 58, 100);

const camera = new THREE.PerspectiveCamera(43, 1, 0.1, 140);
const startTarget = new THREE.Vector3(0, 2.4, -11.7);
camera.position.set(21, 22, 27);

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
  resetButton.disabled = true;
  throw error;
}

renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
renderer.setSize(stage.clientWidth, stage.clientHeight, false);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

scene.add(new THREE.HemisphereLight(0xe6e1ef, 0x24232a, 1.35));

const keyLight = new THREE.DirectionalLight(0xf0edf6, 2.3);
keyLight.position.set(-10, 22, 14);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(768, 768);
keyLight.shadow.camera.left = -20;
keyLight.shadow.camera.right = 20;
keyLight.shadow.camera.top = 28;
keyLight.shadow.camera.bottom = -28;
keyLight.shadow.bias = -0.0003;
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0x9a8eb8, 0.35);
fillLight.position.set(12, 10, -20);
scene.add(fillLight);

const materials = {
  deep: new THREE.MeshStandardMaterial({ color: COLORS.rockSide, roughness: 0.96 }),
  rock: new THREE.MeshStandardMaterial({ color: COLORS.rock, roughness: 0.92 }),
  stone: new THREE.MeshStandardMaterial({ color: COLORS.stone, roughness: 0.88 }),
  lightStone: new THREE.MeshStandardMaterial({ color: COLORS.stoneLight, roughness: 0.82 }),
  metal: new THREE.MeshStandardMaterial({ color: 0x66636f, metalness: 0.2, roughness: 0.7 }),
  pale: new THREE.MeshStandardMaterial({ color: COLORS.pale, roughness: 0.72 }),
  violet: new THREE.MeshStandardMaterial({ color: COLORS.violet, emissive: 0x20192e, emissiveIntensity: 0.14, roughness: 0.65 }),
  glow: new THREE.MeshStandardMaterial({ color: COLORS.violetLight, emissive: 0x30283f, emissiveIntensity: 0.2, roughness: 0.65 }),
  darkGlass: new THREE.MeshStandardMaterial({ color: 0x1a1b22, metalness: 0.1, roughness: 0.42 })
};

const world = new THREE.Group();
scene.add(world);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.copy(startTarget);
controls.enableDamping = true;
controls.dampingFactor = 0.075;
controls.enableRotate = true;
controls.enablePan = true;
controls.enableZoom = true;
controls.screenSpacePanning = true;
controls.zoomToCursor = true;
controls.rotateSpeed = 0.72;
controls.panSpeed = 0.75;
controls.zoomSpeed = 0.82;
controls.minDistance = 12;
controls.maxDistance = 62;
controls.minPolarAngle = 0.2;
controls.maxPolarAngle = 1.46;
controls.update();
controls.saveState();
controls.listenToKeyEvents(canvas);

const nodes = [];
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let activeId = null;
let pointerDown = null;

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
  return makeMesh(parent, new THREE.BoxGeometry(width, height, depth), material, x, y, z,
    rotation ? { rotation } : {});
}

function addCylinder(parent, topRadius, bottomRadius, height, segments, x, y, z, material, rotation = null) {
  return makeMesh(parent, new THREE.CylinderGeometry(topRadius, bottomRadius, height, segments), material, x, y, z,
    rotation ? { rotation } : {});
}

function addSphere(parent, radius, x, y, z, material, scale = null) {
  const mesh = makeMesh(parent, new THREE.SphereGeometry(radius, 16, 12), material, x, y, z);
  if (scale) mesh.scale.set(scale.x, scale.y, scale.z);
  return mesh;
}

function makePanelTexture(title, detail) {
  const surface = document.createElement("canvas");
  surface.width = 512;
  surface.height = 256;
  const context = surface.getContext("2d");
  context.fillStyle = "#191a21";
  context.fillRect(0, 0, surface.width, surface.height);
  context.strokeStyle = "#565360";
  context.lineWidth = 3;
  context.strokeRect(9, 9, 494, 238);
  context.fillStyle = "#c9c2d8";
  context.font = "600 32px Manrope, sans-serif";
  context.fillText(String(title).slice(0, 26), 28, 112);
  context.fillStyle = "#96939f";
  context.font = "18px 'DM Mono', monospace";
  context.fillText(String(detail).slice(0, 40), 29, 162);
  const texture = new THREE.CanvasTexture(surface);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return texture;
}

function addScreen(parent, title, detail, width, height, x, y, z, rotation = null) {
  const texture = makePanelTexture(title, detail);
  return makeMesh(parent, new THREE.PlaneGeometry(width, height),
    new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide }), x, y, z,
    rotation ? { rotation } : {});
}

function islandShape(index) {
  const shape = new THREE.Shape();
  const points = 11;
  for (let i = 0; i < points; i += 1) {
    const angle = (i / points) * Math.PI * 2;
    const radius = 1.5 + Math.sin(i * 1.71 + index * 0.63) * 0.13 + Math.cos(i * 2.13 + index) * 0.07;
    const x = Math.cos(angle) * radius * 1.08;
    const y = Math.sin(angle) * radius * 0.78;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  return shape;
}

function terrainGeometry(index) {
  const geometry = new THREE.ExtrudeGeometry(islandShape(index), {
    depth: 0.46,
    steps: 1,
    bevelEnabled: true,
    bevelSegments: 2,
    bevelSize: 0.08,
    bevelThickness: 0.07,
    curveSegments: 2
  });
  geometry.rotateX(-Math.PI / 2);
  geometry.computeVertexNormals();
  return geometry;
}

function addIslandBase(group, index) {
  const lower = makeMesh(group, terrainGeometry(index), materials.deep, 0, -0.05, 0);
  lower.scale.set(0.93, 0.78, 0.93);
  lower.rotation.y = index * 0.19;

  const top = makeMesh(group, terrainGeometry(index), [materials.rock, materials.stone], 0, 0.08, 0);
  top.rotation.y = index * 0.19;

  addBox(group, 0.48, 0.07, 0.32, -0.65, 0.55, 0.66, materials.lightStone,
    { x: 0, y: index * 0.2, z: 0.08 });
  addSphere(group, 0.07, 0.82, 0.61, -0.55, materials.stoneLight);
}

function buildStepPath(start, end) {
  const delta = end.clone().sub(start);
  const yaw = Math.atan2(delta.x, delta.z);
  const count = 6;
  for (let i = 1; i <= count; i += 1) {
    const t = i / (count + 1);
    const x = THREE.MathUtils.lerp(start.x, end.x, t);
    const y = THREE.MathUtils.lerp(start.y, end.y, t) + 0.57;
    const z = THREE.MathUtils.lerp(start.z, end.z, t);
    const step = addBox(world, 0.9, 0.14, 0.78, x, y, z, materials.stone);
    step.rotation.y = yaw;
  }
}

function islandPosition(index) {
  const side = index % 2 === 0 ? -1 : 1;
  return new THREE.Vector3(side * 3.05, index * 0.48, -index * 2.6);
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

function setActive(projectId) {
  if (activeId === projectId) return;
  activeId = projectId;

  for (const node of nodes) {
    node.hotspot.classList.toggle("is-active", node.project.id === projectId);
    node.group.scale.setScalar(node.project.id === projectId ? 1.035 : 1);
  }

  const project = projects.find((item) => item.id === projectId);
  if (!project) {
    preview.hidden = true;
    return;
  }

  document.querySelector("#preview-step").textContent =
    String(project.step).padStart(2, "0") + " / " + String(projects.length).padStart(2, "0");
  document.querySelector("#preview-level").textContent = project.difficulty.toUpperCase();
  document.querySelector("#preview-title").textContent = project.name;
  document.querySelector("#preview-description").textContent = project.description;
  document.querySelector("#preview-concepts").replaceChildren(...project.concepts.map((concept) => {
    const tag = document.createElement("span");
    tag.textContent = concept;
    return tag;
  }));
  document.querySelector("#preview-link").href =
    "project.html?project=" + encodeURIComponent(project.id);
  preview.hidden = false;
}

function openProject(project) {
  window.location.href = "project.html?project=" + encodeURIComponent(project.id);
}

function buildIsland(project, index) {
  const position = islandPosition(index);
  const group = new THREE.Group();
  group.position.copy(position);
  group.userData.projectId = project.id;

  addIslandBase(group, index);
  const builder = themeBuilders[project.theme];
  if (builder) builder(group);

  group.traverse((child) => {
    if (child.isMesh) child.userData.projectId = project.id;
  });
  world.add(group);

  const hotspot = document.createElement("button");
  hotspot.type = "button";
  hotspot.className = "island-hotspot";
  hotspot.setAttribute("aria-label", "Open " + project.name + " study");
  hotspot.dataset.side = index % 2 === 0 ? "left" : "right";

  const number = document.createElement("span");
  number.className = "hotspot-number";
  number.textContent = String(project.step).padStart(2, "0");
  const name = document.createElement("span");
  name.className = "hotspot-name";
  name.textContent = project.name;
  hotspot.append(number, name);

  hotspot.addEventListener("pointerenter", () => setActive(project.id));
  hotspot.addEventListener("pointerleave", (event) => {
    if (event.relatedTarget && (preview.contains(event.relatedTarget) || hotspotLayer.contains(event.relatedTarget))) return;
    if (document.activeElement !== hotspot) setActive(null);
  });
  hotspot.addEventListener("focus", () => setActive(project.id));
  hotspot.addEventListener("blur", (event) => {
    if (event.relatedTarget && (preview.contains(event.relatedTarget) || hotspotLayer.contains(event.relatedTarget))) return;
    setActive(null);
  });
  hotspot.addEventListener("click", () => openProject(project));
  hotspotLayer.appendChild(hotspot);

  nodes.push({ project, group, position, hotspot, labelSide: index % 2 === 0 ? -1 : 1 });
}

function pickProject(event) {
  const bounds = canvas.getBoundingClientRect();
  pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
  pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(nodes.map((node) => node.group), true);
  if (!hits.length) return null;
  const id = hits[0].object.userData.projectId;
  return projects.find((project) => project.id === id) || null;
}

function updateHotspots() {
  const width = stage.clientWidth;
  const height = stage.clientHeight;

  for (const node of nodes) {
    const anchor = node.position.clone().add(new THREE.Vector3(node.labelSide * 1.55, 2.05, 0));
    anchor.project(camera);
    const x = (anchor.x * 0.5 + 0.5) * width;
    const y = (-anchor.y * 0.5 + 0.5) * height;
    const visible = anchor.z > -1 && anchor.z < 1 && x > 38 && x < width - 38 && y > 44 && y < height - 45;
    node.hotspot.classList.toggle("is-visible", visible);
    node.hotspot.tabIndex = visible ? 0 : -1;
    if (visible) {
      node.hotspot.style.left = x + "px";
      node.hotspot.style.top = y + "px";
    }
  }
}

for (let index = 0; index < projects.length; index += 1) {
  buildIsland(projects[index], index);
}
for (let index = 0; index < nodes.length - 1; index += 1) {
  buildStepPath(nodes[index].position, nodes[index + 1].position);
}

const resize = () => {
  const width = stage.clientWidth;
  const height = stage.clientHeight;
  if (!width || !height) return;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setSize(width, height, false);
  updateHotspots();
};

canvas.addEventListener("pointermove", (event) => {
  if (pointerDown) return;
  const project = pickProject(event);
  setActive(project ? project.id : null);
  canvas.style.cursor = project ? "pointer" : "grab";
});

canvas.addEventListener("pointerleave", (event) => {
  if (event.relatedTarget && (preview.contains(event.relatedTarget) || hotspotLayer.contains(event.relatedTarget))) return;
  if (!pointerDown) setActive(null);
  canvas.style.cursor = "grab";
});

canvas.addEventListener("pointerdown", (event) => {
  if (event.button !== 0) return;
  pointerDown = { x: event.clientX, y: event.clientY };
});

canvas.addEventListener("pointerup", (event) => {
  if (!pointerDown) return;
  const distance = Math.hypot(event.clientX - pointerDown.x, event.clientY - pointerDown.y);
  pointerDown = null;
  if (distance > 5) return;
  const project = pickProject(event);
  if (project) openProject(project);
});

canvas.addEventListener("pointercancel", () => { pointerDown = null; });
preview.addEventListener("pointerleave", (event) => {
  if (event.relatedTarget && (canvas.contains(event.relatedTarget) || hotspotLayer.contains(event.relatedTarget))) return;
  setActive(null);
});

controls.addEventListener("start", () => canvas.classList.add("is-dragging"));
controls.addEventListener("end", () => {
  canvas.classList.remove("is-dragging");
  updateHotspots();
});
controls.addEventListener("change", updateHotspots);

resetButton.addEventListener("click", () => {
  controls.reset();
  setActive(null);
  updateHotspots();
});

const observer = new ResizeObserver(resize);
observer.observe(stage);
window.addEventListener("resize", resize, { passive: true });

function animate() {
  window.requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

resize();
updateHotspots();
animate();
