"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function FourDPage() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let width = el.clientWidth, height = el.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
    camera.position.z = 60;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    // 4D tesseract: 8 cubes, each offset in w, projected by rotating w into xyz
    const cubes: THREE.Mesh[] = [];
    const geo = new THREE.BoxGeometry(10, 10, 10);
    const mats = [0x7cf7ff, 0xff6bd6, 0xffd166, 0x4ade80, 0xa78bfa, 0x00e5ff, 0xf472b6, 0xffffff];
    for (let i = 0; i < 8; i++) {
      const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: mats[i], wireframe: true, transparent: true, opacity: 0.6 }));
      scene.add(m); cubes.push(m);
    }
    const light = new THREE.PointLight(0xffffff, 2, 500); light.position.set(40, 40, 60); scene.add(light);
    scene.add(new THREE.AmbientLight(0x222244, 0.6));

    let raf = 0;
    const animate = (t: number) => {
      raf = requestAnimationFrame(() => animate(t));
      const tt = t * 0.001;
      // 4D rotation: rotate xw and yw planes, project w into z
      for (let i = 0; i < 8; i++) {
        const wOffset = (i - 3.5) * 22; // w in 4D
        const wx = Math.cos(tt * 0.5 + i) * wOffset;
        const wy = Math.sin(tt * 0.3 + i) * wOffset * 0.5;
        const wz = wOffset * Math.sin(tt * 0.2) * 0.4;
        cubes[i].position.set(wx, wy, wz);
        cubes[i].rotation.x = tt * (0.5 + i * 0.1);
        cubes[i].rotation.y = tt * (0.3 + i * 0.1);
        cubes[i].rotation.z = tt * (0.2 + i * 0.15);
        cubes[i].scale.setScalar(0.8 + Math.sin(tt + i) * 0.4);
      }
      renderer.render(scene, camera);
    };
    animate(0);
    const ro = new ResizeObserver(() => { width = el.clientWidth; height = el.clientHeight; camera.aspect = width / height; camera.updateProjectionMatrix(); renderer.setSize(width, height); });
    ro.observe(el);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); renderer.dispose(); el.innerHTML = ""; };
  }, [ref]);
  return <div ref={ref} className="w-full h-[70vh] bg-[#030408] rounded-xl border border-white/10 overflow-hidden" />;
}
