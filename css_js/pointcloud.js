import * as THREE from 'three';
import { PLYLoader } from 'three/addons/loaders/PLYLoader.js';

(function () {
  const container = document.querySelector('.profile-pic');
  const canvas = document.getElementById('pointcloud-canvas');
  const img = container && container.querySelector('.profile-pic__img');
  if (!container || !canvas || !img) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100);
  camera.position.set(0, 0, 0.85);

  let points = null;
  let originalZ = null;
  const targetRotation = { x: 0, y: 0 };
  const currentRotation = { x: 0, y: 0 };
  const maxTilt = 0.35;
  const lerpSpeed = 0.07;

  const INTRO_DURATION = 2500;
  const INTRO_Z_OFFSET = 3.0;
  let introStartTime = null;
  let introComplete = false;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  resize();
  window.addEventListener('resize', resize);

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function showPointcloud() {
    container.classList.add('profile-pic--active');
  }

  function hidePointcloud() {
    container.classList.remove('profile-pic--active');
  }

  // --- Mouse events ---
  container.addEventListener('mouseenter', function () {
    if (introComplete) showPointcloud();
  });

  container.addEventListener('mousemove', function (e) {
    if (!introComplete) return;
    const rect = container.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    targetRotation.y = nx * maxTilt;
    targetRotation.x = ny * maxTilt;
  });

  container.addEventListener('mouseleave', function () {
    hidePointcloud();
    targetRotation.x = 0;
    targetRotation.y = 0;
  });

  // --- Touch events ---
  let touching = false;

  container.addEventListener('touchstart', function (e) {
    if (!introComplete) return;
    touching = true;
    showPointcloud();
    updateRotationFromTouch(e);
  }, { passive: true });

  container.addEventListener('touchmove', function (e) {
    if (!touching) return;
    updateRotationFromTouch(e);
  }, { passive: true });

  container.addEventListener('touchend', function () {
    touching = false;
    hidePointcloud();
    targetRotation.x = 0;
    targetRotation.y = 0;
  });

  container.addEventListener('touchcancel', function () {
    touching = false;
    hidePointcloud();
    targetRotation.x = 0;
    targetRotation.y = 0;
  });

  function updateRotationFromTouch(e) {
    if (!e.touches.length) return;
    const rect = container.getBoundingClientRect();
    const nx = ((e.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.touches[0].clientY - rect.top) / rect.height) * 2 - 1;
    targetRotation.y = nx * maxTilt;
    targetRotation.x = ny * maxTilt;
  }

  // --- PLY loading ---
  const loader = new PLYLoader();
  loader.load('profile_pointcloud.ply', function (geometry) {
    geometry.computeBoundingBox();
    const box = geometry.boundingBox;
    const center = new THREE.Vector3();
    box.getCenter(center);
    geometry.translate(-center.x, -center.y, -center.z);

    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 0.9 / maxDim;
    geometry.scale(scale, -scale, scale);

    const hasColors = geometry.hasAttribute('color');
    const material = new THREE.PointsMaterial({
      size: 0.0035,
      vertexColors: hasColors,
      sizeAttenuation: true,
    });
    if (!hasColors) material.color.set(0xcccccc);

    points = new THREE.Points(geometry, material);
    scene.add(points);

    const posAttr = geometry.getAttribute('position');
    originalZ = new Float32Array(posAttr.count);
    for (let i = 0; i < posAttr.count; i++) {
      originalZ[i] = posAttr.getZ(i);
    }

    if (prefersReducedMotion) {
      introComplete = true;
      canvas.style.opacity = '0';
      img.style.opacity = '1';
    } else {
      canvas.style.opacity = '1';
      img.style.opacity = '0';
      introStartTime = performance.now();
    }
  });

  function animate() {
    requestAnimationFrame(animate);

    if (points && !introComplete && introStartTime !== null) {
      const elapsed = performance.now() - introStartTime;
      const t = Math.min(elapsed / INTRO_DURATION, 1);
      const eased = easeOutCubic(t);

      const posAttr = points.geometry.getAttribute('position');
      for (let i = 0; i < posAttr.count; i++) {
        const targetZ = originalZ[i];
        posAttr.setZ(i, targetZ + INTRO_Z_OFFSET * (1 - eased));
      }
      posAttr.needsUpdate = true;

      if (t >= 1) {
        introComplete = true;
        canvas.style.transition = 'opacity 0.6s ease';
        img.style.transition = 'opacity 0.6s ease';
        canvas.style.opacity = '0';
        img.style.opacity = '1';

        setTimeout(function () {
          canvas.style.transition = 'opacity 0.4s ease';
          img.style.transition = 'opacity 0.4s ease';
        }, 700);
      }
    }

    currentRotation.x += (targetRotation.x - currentRotation.x) * lerpSpeed;
    currentRotation.y += (targetRotation.y - currentRotation.y) * lerpSpeed;

    if (points) {
      points.rotation.x = currentRotation.x;
      points.rotation.y = currentRotation.y;
    }

    renderer.render(scene, camera);
  }

  animate();
})();
