"use client";

import { useState, useRef, useEffect } from "react";

export default function ShaderPage() {
  const [code, setCode] = useState(`
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
varying vec2 v_uv;

float sdCircle(vec2 p, float r) { return length(p) - r; }
float sdBox(vec2 p, vec2 b) { vec2 q = abs(p) - b; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0); }

void main() {
  vec2 st = v_uv * 2.0 - 1.0;
  st.x *= u_resolution.x / u_resolution.y;
  float d = sdCircle(st, 0.5 + 0.3 * sin(u_time));
  vec3 col = mix(vec3(0.05, 0.06, 0.1), vec3(0.124, 0.976, 1.0), 1.0 - smoothstep(0.0, 0.08, abs(d)));
  col += 0.4 * vec3(sin(u_time + st.x * 3.0), cos(u_time + st.y * 3.0), 1.0);
  gl_FragColor = vec4(col, 1.0);
}
`);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;
    const vs = `
attribute vec2 position;
varying vec2 v_uv;
void main() { v_uv = position * 0.5 + 0.5; gl_Position = vec4(position, 0.0, 1.0); }
`;
    const fs = code.replace("varying vec2 v_uv", "varying vec2 v_uv");
    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!; gl.shaderSource(sh, src); gl.compileShader(sh); return sh;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog); gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const resLoc = gl.getUniformLocation(prog, "u_resolution");
    const timeLoc = gl.getUniformLocation(prog, "u_time");
    const start = performance.now();
    const resize = () => { const d = window.devicePixelRatio || 1; const w = canvas.clientWidth; const h = canvas.clientHeight; canvas.width = w * d; canvas.height = h * d; gl.viewport(0, 0, w * d, h * d); gl.uniform2f(resLoc, w, h); };
    window.addEventListener("resize", resize); resize();
    let raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      gl.uniform1f(timeLoc, (performance.now() - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); gl.deleteProgram(prog); gl.deleteShader(compile(gl.VERTEX_SHADER, vs)); gl.deleteShader(compile(gl.FRAGMENT_SHADER, fs)); gl.deleteBuffer(buf); };
  }, [code]);
  return (
    <div className="glass p-0 h-[70vh] flex flex-col">
      <canvas ref={canvasRef} className="flex-1 w-full" />
      <div className="p-3 border-t border-white/10 bg-black/40">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-24 bg-black text-xs font-mono text-accent p-2 outline-none resize-none"
          placeholder="GLSL fragment shader..."
        />
        <p className="text-[10px] text-muted mt-1">Edit the shader live — zero setup.</p>
      </div>
    </div>
  );
}
