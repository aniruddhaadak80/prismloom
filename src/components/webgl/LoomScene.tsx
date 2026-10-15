"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Build = { update: (dt: number, t: number, p: THREE.Vector2) => void; dispose?: () => void };

function rnd(a: number, b: number) { return a + Math.random() * (b - a); }

function build(kind: string, scene: THREE.Scene, camera: THREE.PerspectiveCamera): Build {
  scene.background = null;
  const fog = new THREE.FogExp2(0x05060a, 0.06);
  scene.fog = fog;
  const ambient = new THREE.AmbientLight(0x334466, 0.6);
  scene.add(ambient);
  const light = new THREE.PointLight(0x7cf7ff, 2, 30);
  light.position.set(3, 4, 5);
  scene.add(light);
  const light2 = new THREE.PointLight(0xff6bd6, 1.6, 30);
  light2.position.set(-4, -2, -3);
  scene.add(light2);

  let update: Build["update"] = () => {};
  const targets: THREE.Object3D[] = [];

  switch (kind) {
    case "flock": {
      const N = 1200;
      const pos = new Float32Array(N * 3);
      const vel = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        pos[i*3] = rnd(-6,6); pos[i*3+1]=rnd(-4,4); pos[i*3+2]=rnd(-6,6);
        vel[i*3]=rnd(-0.6,0.6); vel[i*3+1]=rnd(-0.3,0.3); vel[i*3+2]=rnd(-0.6,0.6);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos,3));
      const mat = new THREE.PointsMaterial({ size: 0.06, color: 0x7cf7ff, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false });
      const pts = new THREE.Points(geo, mat);
      scene.add(pts);
      targets.push(pts);
      update = (dt, _t, p) => {
        const px = p.x * 6, py = p.y * 4;
        for (let i=0;i<N;i++){
          let vx=vel[i*3], vy=vel[i*3+1], vz=vel[i*3+2];
          const x=pos[i*3], y=pos[i*3+1], z=pos[i*3+2];
          // flocking (simplified): steer away from cursor predator
          const dx=x-px, dy=y-py, dz=z-0; const d=Math.sqrt(dx*dx+dy*dy+dz*dz)+0.001;
          if (d<2.5){ vx += (dx/d)*0.04; vy += (dy/d)*0.04; vz += (dz/d)*0.04; }
          // keep in bounds
          if (Math.abs(x)>7) vx -= Math.sign(x)*0.02;
          if (Math.abs(y)>5) vy -= Math.sign(y)*0.02;
          if (Math.abs(z)>7) vz -= Math.sign(z)*0.02;
          // damping
          vx*=0.995; vy*=0.995; vz*=0.995;
          // speed cap
          const sp=Math.sqrt(vx*vx+vy*vy+vz*vz); if (sp>1.2){ vx*=1.2/sp; vy*=1.2/sp; vz*=1.2/sp; }
          pos[i*3]+=vx*dt*60*0.02; pos[i*3+1]+=vy*dt*60*0.02; pos[i*3+2]+=vz*dt*60*0.02;
          vel[i*3]=vx; vel[i*3+1]=vy; vel[i*3+2]=vz;
        }
        (geo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
        pts.rotation.y += dt*0.05;
      };
      break;
    }
    case "galaxy": {
      const N = 9000;
      const pos = new Float32Array(N*3);
      const col = new Float32Array(N*3);
      const arms = 4;
      for (let i=0;i<N;i++){
        const r = Math.random()*6;
        const spin = r*0.8;
        const arm = (i % arms) * (Math.PI*2/arms);
        const angle = arm + spin + (Math.random()-0.5)*0.6;
        pos[i*3]=Math.cos(angle)*r; pos[i*3+1]=(Math.random()-0.5)*0.6*Math.exp(-r*0.3);
        pos[i*3+2]=Math.sin(angle)*r;
        const c = new THREE.Color().lerpColors(new THREE.Color(0x9ad1ff), new THREE.Color(0xff6bd6), Math.random());
        col[i*3]=c.r; col[i*3+1]=c.g; col[i*3+2]=c.b;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos,3));
      geo.setAttribute("color", new THREE.BufferAttribute(col,3));
      const mat = new THREE.PointsMaterial({ size: 0.035, vertexColors: true, transparent:true, opacity:0.9, blending:THREE.AdditiveBlending, depthWrite:false });
      const pts = new THREE.Points(geo,mat);
      scene.add(pts);
      // core
      const core = new THREE.Mesh(new THREE.SphereGeometry(0.6,32,32), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      scene.add(core);
      targets.push(pts, core);
      update = (dt) => { pts.rotation.y += dt*0.08; core.scale.setScalar(1+Math.sin(performance.now()*0.002)*0.05); };
      break;
    }
    case "torus": {
      const geo = new THREE.TorusKnotGeometry(1.2, 0.4, 220, 32);
      const base = geo.attributes.position.array.slice() as Float32Array;
      const mat = new THREE.MeshStandardMaterial({ color: 0x7cf7ff, emissive: 0x002233, metalness: 0.4, roughness: 0.2, wireframe: false });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);
      targets.push(mesh);
      update = (_dt, t) => {
        mesh.rotation.x = t*0.3; mesh.rotation.y=t*0.2;
        const arr = geo.attributes.position.array as Float32Array;
        for (let i=0;i<arr.length;i+=3){
          arr[i] = base[i] + Math.sin(base[i+1]*4 + t*2)*0.08;
          arr[i+1] = base[i+1] + Math.cos(base[i+2]*3 + t*1.5)*0.08;
          arr[i+2] = base[i+2] + Math.sin(base[i]*5 + t*2.2)*0.08;
        }
        geo.attributes.position.needsUpdate = true;
        geo.computeVertexNormals();
      };
      break;
    }
    case "waves": {
      const geo = new THREE.PlaneGeometry(12,12,64,64);
      geo.rotateX(-Math.PI/2);
      const mat = new THREE.MeshStandardMaterial({ color: 0x3a7bd5, emissive: 0x0a1a3a, metalness:0.1, roughness:0.4, flatShading:false });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);
      const base = geo.attributes.position.array.slice() as Float32Array;
      targets.push(mesh);
      update = (_dt, t) => {
        const arr = geo.attributes.position.array as Float32Array;
        for (let i=0;i<arr.length;i+=3){
          const x=base[i], z=base[i+2];
          arr[i+1] = Math.sin(x*0.6+t)*0.5 + Math.sin(z*0.7+t*1.3)*0.4 + Math.sin((x+z)*0.3+t*0.7)*0.6;
        }
        geo.attributes.position.needsUpdate = true;
        geo.computeVertexNormals();
      };
      break;
    }
    case "crystals": {
      const geo = new THREE.OctahedronGeometry(0.25, 0);
      const mat = new THREE.MeshStandardMaterial({ color: 0xb9fbc0, emissive: 0x113322, metalness: 0.6, roughness: 0.15 });
      const N = 500;
      const im = new THREE.InstancedMesh(geo, mat, N);
      const m = new THREE.Matrix4(); const q=new THREE.Quaternion(); const s=new THREE.Vector3();
      for (let i=0;i<N;i++){
        const x=rnd(-7,7),y=rnd(-4,4),z=rnd(-7,7);
        q.setFromEuler(new THREE.Euler(rnd(0,Math.PI),rnd(0,Math.PI),0));
        const sc = rnd(0.4,1.8);
        s.set(sc,sc,sc);
        m.compose(new THREE.Vector3(x,y,z), q, s);
        im.setMatrixAt(i,m);
      }
      im.instanceMatrix.needsUpdate = true;
      scene.add(im);
      targets.push(im);
      update = (_dt, t) => { im.rotation.y = t*0.1; light.position.x = Math.cos(t)*5; light.position.z=Math.sin(t)*5; };
      break;
    }
    case "meteors": {
      const count = 60;
      const meteors: { line: THREE.Line; pos: THREE.Vector3; vel: THREE.Vector3 }[] = [];
      for (let i=0;i<count;i++){
        const pts = [new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,-1)];
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        const mat = new THREE.LineBasicMaterial({ color: 0xffe066, transparent:true, opacity:0.9 });
        const line = new THREE.Line(geo, mat);
        const pos = new THREE.Vector3(rnd(-8,8), rnd(-5,5), rnd(-2,2));
        const vel = new THREE.Vector3(rnd(-0.3,0.3), rnd(-0.2,0.2), rnd(0.8,2.4));
        meteors.push({ line, pos, vel });
        scene.add(line);
      }
      targets.push(...meteors.map(m=>m.line));
      update = (dt) => {
        for (const m of meteors){
          m.pos.addScaledVector(m.vel, dt*3);
          if (m.pos.z > 12){ m.pos.set(rnd(-8,8), rnd(-5,5), rnd(-12,-8)); m.vel.set(rnd(-0.3,0.3),rnd(-0.2,0.2),rnd(1,2.6)); }
          const end = m.pos.clone().addScaledVector(m.vel, -0.6);
          const arr = m.line.geometry.attributes.position.array as Float32Array;
          arr[0]=m.pos.x; arr[1]=m.pos.y; arr[2]=m.pos.z;
          arr[3]=end.x; arr[4]=end.y; arr[5]=end.z;
          m.line.geometry.attributes.position.needsUpdate = true;
        }
      };
      break;
    }
    case "portals": {
      const g1 = new THREE.TorusGeometry(1.6, 0.18, 16, 80);
      const m1 = new THREE.MeshBasicMaterial({ color: 0xa78bfa });
      const a = new THREE.Mesh(g1,m1); a.position.x=-3;
      const b = new THREE.Mesh(g1.clone(), new THREE.MeshBasicMaterial({ color: 0x7cf7ff })); b.position.x=3;
      scene.add(a,b);
      // bridge particles
      const N=400; const pos=new Float32Array(N*3);
      for(let i=0;i<N;i++){ pos[i*3]=rnd(-3,3); pos[i*3+1]=rnd(-1,1); pos[i*3+2]=rnd(-1,1); }
      const geo=new THREE.BufferGeometry(); geo.setAttribute("position", new THREE.BufferAttribute(pos,3));
      const pts=new THREE.Points(geo, new THREE.PointsMaterial({size:0.05,color:0xffffff,transparent:true,opacity:0.7,blending:THREE.AdditiveBlending,depthWrite:false}));
      scene.add(pts);
      targets.push(a,b,pts);
      update = (_dt,t) => { a.rotation.y=t*1.2; b.rotation.y=-t*1.2; pts.rotation.y=t*0.3; };
      break;
    }
    case "nebula": {
      const N=4000; const pos=new Float32Array(N*3); const col=new Float32Array(N*3);
      for(let i=0;i<N;i++){
        const r = Math.pow(Math.random(),0.6)*4;
        const th=Math.random()*Math.PI*2, ph=Math.random()*Math.PI;
        pos[i*3]=r*Math.sin(ph)*Math.cos(th);
        pos[i*3+1]=r*Math.sin(ph)*Math.sin(th)*0.6;
        pos[i*3+2]=r*Math.cos(ph);
        const c=new THREE.Color().lerpColors(new THREE.Color(0xff6bd6), new THREE.Color(0x7cf7ff), Math.random());
        col[i*3]=c.r; col[i*3+1]=c.g; col[i*3+2]=c.b;
      }
      const geo=new THREE.BufferGeometry(); geo.setAttribute("position",new THREE.BufferAttribute(pos,3)); geo.setAttribute("color",new THREE.BufferAttribute(col,3));
      const pts=new THREE.Points(geo, new THREE.PointsMaterial({size:0.07,vertexColors:true,transparent:true,opacity:0.6,blending:THREE.AdditiveBlending,depthWrite:false}));
      scene.add(pts);
      targets.push(pts);
      update = (_dt,t) => { pts.rotation.y=t*0.05; pts.rotation.x=Math.sin(t*0.2)*0.2; };
      break;
    }
    case "ribbon": {
      const N=240; const positions: number[] = [];
      for(let i=0;i<N;i++){ const u=i/(N-1)*Math.PI*4; positions.push(Math.cos(u)*2, Math.sin(u*0.5)*1.5, Math.sin(u)*2); }
      const geo = new THREE.BufferGeometry();
      const arr = new Float32Array(positions);
      geo.setAttribute("position", new THREE.BufferAttribute(arr,3));
      const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0xff9a3c, linewidth: 2 }));
      scene.add(line);
      targets.push(line);
      update = (_dt,t) => {
        const a = geo.attributes.position.array as Float32Array;
        for(let i=0;i<N;i++){
          const u=i/(N-1)*Math.PI*4 + t*0.3;
          a[i*3]=Math.cos(u)* (2+Math.sin(t+i*0.05)*0.3);
          a[i*3+1]=Math.sin(u*0.5)*1.5 + Math.cos(t*0.7+i*0.1)*0.3;
          a[i*3+2]=Math.sin(u)* (2+Math.cos(t*0.5+i*0.07)*0.3);
        }
        geo.attributes.position.needsUpdate=true;
      };
      break;
    }
    case "lattice": {
      const group = new THREE.Group();
      const mat = new THREE.LineBasicMaterial({ color: 0x00ff9d, transparent:true, opacity:0.7 });
      for(let x=-4;x<=4;x++) for(let z=-4;z<=4;z++){
        const pts=[new THREE.Vector3(x,-2,z), new THREE.Vector3(x,2,z)];
        group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat));
      }
      for(let y=-2;y<=2;y++) for(let z=-4;z<=4;z++){
        const pts=[new THREE.Vector3(-4,y,z), new THREE.Vector3(4,y,z)];
        group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat));
      }
      scene.add(group);
      targets.push(group);
      update = (_dt,t) => { group.scale.y = 1 + Math.sin(t*2)*0.15; group.rotation.y=t*0.2; };
      break;
    }
    case "orbitals": {
      const group = new THREE.Group();
      for(let r=1;r<=4;r++){
        const curve = new THREE.EllipseCurve(0,0,r,r,0,Math.PI*2,false,0);
        const pts = curve.getPoints(80).map(p=>new THREE.Vector3(p.x,0,p.y));
        const line = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({color:0x7cf7ff,transparent:true,opacity:0.35}));
        group.add(line);
        const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.12+0.05*r,16,16), new THREE.MeshBasicMaterial({color: r%2?0xffd166:0xff6bd6}));
        group.add(sphere);
        (sphere as THREE.Mesh & { _r?: number; _speed?: number })._r = r;
        (sphere as THREE.Mesh & { _r?: number; _speed?: number })._speed = 1 / r;
      }
      scene.add(group);
      targets.push(group);
      update = (_dt, t) => {
        group.children.forEach((c) => {
          if (c instanceof THREE.Mesh) {
            const cc = c as THREE.Mesh & { _r?: number; _speed?: number };
            const r = cc._r ?? 1; const sp = cc._speed ?? 1;
            c.position.set(Math.cos(t*sp)*r, Math.sin(t*sp*0.5)*0.3, Math.sin(t*sp)*r);
          }
        });
        group.rotation.x = 0.3;
      };
      break;
    }
    case "vortex": {
      const group = new THREE.Group();
      const geo = new THREE.TorusGeometry(1, 0.04, 8, 48);
      for(let i=0;i<30;i++){
        const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: i%2?0xff00cc:0x00ffff, transparent:true, opacity:0.7 }));
        m.position.z = -i*1.2;
        m.scale.setScalar(1 + i*0.05);
        group.add(m);
      }
      scene.add(group);
      targets.push(group);
      update = (_dt,t) => {
        group.children.forEach((c, i) => {
          c.position.z += 0.08; if (c.position.z > 6){ c.position.z = -30; }
          c.rotation.z = t + i*0.4;
        });
        group.rotation.z = t*0.2;
      };
      break;
    }
    case "aurora": {
      const group = new THREE.Group();
      for(let l=0;l<6;l++){
        const pts: THREE.Vector3[] = [];
        for(let i=0;i<80;i++){ const u=i/79; pts.push(new THREE.Vector3((u-0.5)*16, 0, -4+l*0.5)); }
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: l%2?0x39ff14:0x00e5ff, transparent:true, opacity:0.7 }));
        group.add(line);
      }
      scene.add(group);
      targets.push(group);
      update = (_dt,t) => {
        group.children.forEach((c,i) => {
          if (c instanceof THREE.Line){
            const a = c.geometry.attributes.position.array as Float32Array;
            for(let j=0;j<a.length/3;j++){
              const x = (j/(a.length/3-1)-0.5)*16;
              a[j*3+1] = Math.sin(x*0.4+t*1.2+i)*1.2 + Math.sin(x*0.15+t*0.7)*0.8;
            }
            c.geometry.attributes.position.needsUpdate=true;
          }
        });
        group.rotation.y = Math.sin(t*0.1)*0.3;
      };
      break;
    }
    case "blossom": {
      const group = new THREE.Group();
      const petal = new THREE.Mesh(new THREE.SphereGeometry(0.4,16,16), new THREE.MeshStandardMaterial({ color: 0xff8fab, emissive: 0x330a14, roughness:0.3 }));
      for(let i=0;i<12;i++){
        const ring = new THREE.Group();
        for(let j=0;j<8;j++){
          const m = petal.clone();
          const ang = (j/8)*Math.PI*2;
          m.position.set(Math.cos(ang)*i*0.35, Math.sin(i*0.5)*0.2, Math.sin(ang)*i*0.35);
          m.scale.setScalar(0.6 + i*0.05);
          ring.add(m);
        }
        ring.rotation.x = (i/12)*Math.PI*0.6;
        group.add(ring);
      }
      scene.add(group);
      targets.push(group);
      update = (_dt,t) => { group.rotation.y=t*0.3; group.children.forEach((c, i) => { c.rotation.z = Math.sin(t+i)*0.2; }); };
      break;
    }
    case "cybergrid": {
      const grid = new THREE.GridHelper(24, 48, 0x00ff41, 0x003311);
      (grid.material as THREE.Material).transparent = true;
      (grid.material as THREE.Material).opacity = 0.6;
      grid.position.y = -2;
      scene.add(grid);
      const light3 = new THREE.PointLight(0x00ff41, 3, 20);
      scene.add(light3);
      targets.push(grid);
      update = (_dt,t) => {
        grid.position.z = (t*2)%2;
        light3.position.set(Math.sin(t*0.7)*6, 3, Math.cos(t*0.7)*6);
      };
      break;
    }
    case "helix": {
      const strandMat = (c:number) => new THREE.MeshStandardMaterial({ color: c, emissive: 0x110022, metalness:0.3, roughness:0.4 });
      const r1 = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), strandMat(0x7cf7ff));
      const r2 = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), strandMat(0xff6bd6));
      r1.position.set(0, 0, 0); r2.position.set(0, 0, 0);
      scene.add(r1, r2);
      scene.add(r1,r2);
      // rungs
      for(let i=0;i<20;i++){
        const y=i*0.3-2.7;
        const a=new THREE.Vector3(Math.cos(i*0.7)*1.4, y, Math.sin(i*0.7)*1.4);
        const b=new THREE.Vector3(Math.cos(i*0.7+Math.PI)*1.4, y, Math.sin(i*0.7+Math.PI)*1.4);
        const geo=new THREE.BufferGeometry().setFromPoints([a,b]);
        scene.add(new THREE.Line(geo, new THREE.LineBasicMaterial({color:0x4ade80, transparent:true, opacity:0.7})));
      }
      targets.push(r1,r2);
      update = (_dt,t) => { r1.rotation.y=t*0.4; r2.rotation.y=t*0.4; };
      break;
    }
    default: {
      const m = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshStandardMaterial({ color:0x7cf7ff }));
      scene.add(m); targets.push(m);
      update = (_dt,t) => { m.rotation.x=t; m.rotation.y=t*0.7; };
    }
  }

  camera.position.z = 9;
  camera.position.y = 1;
  camera.lookAt(0,0,0);

  return {
    update: (dt,t,p) => { light.position.set(Math.cos(t)*4, Math.sin(t*0.7)*3, Math.sin(t)*4); update(dt,t,p); },
    dispose: () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      scene.traverse((o: any) => {
        o.geometry?.dispose?.();
        if (Array.isArray(o.material)) o.material.forEach((m: unknown) => (m as { dispose?: () => void }).dispose?.());
        else o.material?.dispose?.();
      });
    },
  };
}

export default function LoomScene({ kind, className }: { kind: string; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    const { update, dispose } = build(kind, scene, camera);
    const clock = new THREE.Clock();
    let raf = 0;
    const pointer = new THREE.Vector2(0,0);
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    const onResize = () => {
      const w = canvas.clientWidth || 1, h = canvas.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(canvas);
    canvas.addEventListener("mousemove", onMove);
    onResize();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const dt = clock.getDelta();
      const t = clock.getElapsedTime();
      update(dt, t, pointer);
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      dispose?.();
      renderer.dispose();
    };
  }, [kind]);
  return <canvas ref={ref} className={className ?? "w-full h-full block"} />;
}
