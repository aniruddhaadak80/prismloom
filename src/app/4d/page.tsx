"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { startFrameLoop } from "@/lib/frameloop";
import { TESSERACT_CUBE_COUNT, tesseractPose } from "@/lib/tesseract";

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
    for (let i = 0; i < TESSERACT_CUBE_COUNT; i++) {
      const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: mats[i], wireframe: true, transparent: true, opacity: 0.6 }));
      scene.add(m); cubes.push(m);
    }
    const light = new THREE.PointLight(0xffffff, 2, 500); light.position.set(40, 40, 60); scene.add(light);
    scene.add(new THREE.AmbientLight(0x222244, 0.6));

    // 4D rotation: rotate xw and yw planes, project w into z
    const stop = startFrameLoop((now) => {
      const tt = now * 0.001;
      for (let i = 0; i < cubes.length; i++) {
        const p = tesseractPose(i, tt);
        cubes[i].position.set(p.x, p.y, p.z);
        cubes[i].rotation.set(p.rx, p.ry, p.rz);
        cubes[i].scale.setScalar(p.scale);
      }
      renderer.render(scene, camera);
    });
    const ro = new ResizeObserver(() => { width = el.clientWidth; height = el.clientHeight; camera.aspect = width / height; camera.updateProjectionMatrix(); renderer.setSize(width, height); });
    ro.observe(el);
    return () => { stop(); ro.disconnect(); renderer.dispose(); el.innerHTML = ""; };
  }, [ref]);
  return <div ref={ref} className="w-full h-[70vh] bg-[#030408] rounded-xl border border-white/10 overflow-hidden" />;
}
