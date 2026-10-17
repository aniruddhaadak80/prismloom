"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const MULTI_CURSORS = 8;

export default function MultiplayerPage() {
  const ref = useRef<HTMLDivElement>(null);
  const [peerCount] = useState(MULTI_CURSORS);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let width = el.clientWidth, height = el.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-width/2, width/2, height/2, -height/2, 0.1, 1000);
    camera.position.z = 100;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const peers: { mesh: THREE.Points; angle: number; speed: number; offset: number }[] = [];
    for (let i = 0; i < peerCount; i++) {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(60);
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 12, color: new THREE.Color().setHSL(i / peerCount, 0.7, 0.6), transparent: true, opacity: 0.9 });
      const mesh = new THREE.Points(geo, mat);
      scene.add(mesh);
      peers.push({ mesh, angle: (i / peerCount) * Math.PI * 2, speed: 0.02 + Math.random() * 0.03, offset: 120 + i * 20 });
    }
    const light = new THREE.AmbientLight(0x444488, 1); scene.add(light);

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = performance.now() * 0.001;
      peers.forEach((p) => {
        p.angle += p.speed;
        const x = Math.cos(p.angle + t * 0.5) * p.offset;
        const y = Math.sin(p.angle + t * 0.7) * p.offset;
        const arr = p.mesh.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < 20; i++) {
          const a = p.angle + (i / 20) * Math.PI * 2;
          arr[i * 3] = x + Math.cos(a) * (15 + Math.sin(t * 3 + i) * 8);
          arr[i * 3 + 1] = y + Math.sin(a) * (15 + Math.cos(t * 3 + i) * 8);
          arr[i * 3 + 2] = Math.sin(t * 2 + i) * 10;
        }
        p.mesh.geometry.attributes.position.needsUpdate = true;
      });
      renderer.render(scene, camera);
    };
    animate();
    const ro = new ResizeObserver(() => { width = el.clientWidth; height = el.clientHeight; camera.left = -width / 2; camera.right = width / 2; camera.top = height / 2; camera.bottom = -height / 2; camera.updateProjectionMatrix(); renderer.setSize(width, height); });
    ro.observe(el);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); renderer.dispose(); el.innerHTML = ""; };
  }, [peerCount]);
  return (
    <div className="glass p-0 h-[70vh] flex flex-col">
      <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <span className="font-bold text-sm">Live cursors · {peerCount} builders online</span>
        <span className="text-xs text-muted">Simulated multiplayer (local)</span>
      </div>
      <div ref={ref} className="flex-1 bg-[#030408] relative overflow-hidden" />
    </div>
  );
}
