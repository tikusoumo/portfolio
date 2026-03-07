"use client";

import { useRef, useMemo, useCallback, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform float u_mouse_x;
  uniform float u_mouse_y;
  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(st);
      st *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    float time = u_time * 0.08;

    // Mouse influence
    float mx = (u_mouse_x - 0.5) * 1.5;
    float my = (u_mouse_y - 0.5) * 1.5;

    // Hextech dark blue base
    vec3 darkBlue = vec3(0.04, 0.05, 0.12);
    vec3 deepNavy = vec3(0.02, 0.03, 0.08);
    
    // Gold energy colors
    vec3 goldDark = vec3(0.47, 0.35, 0.15);
    vec3 goldBright = vec3(0.78, 0.61, 0.24);
    
    // Arcane teal
    vec3 arcane = vec3(0.04, 0.78, 0.72);

    // Base gradient - deep navy with subtle variation
    float baseGrad = fbm(uv * 3.0 + time * 0.3 + vec2(mx, my) * 0.2);
    vec3 base = mix(deepNavy, darkBlue, baseGrad);

    // Gold energy streams
    float goldStream1 = fbm(uv * 5.0 + vec2(time * 0.5, time * 0.3) + vec2(mx, my) * 0.3);
    float goldStream2 = fbm(uv * 8.0 + vec2(-time * 0.4, time * 0.6) + vec2(mx, my) * 0.2);
    float goldIntensity = smoothstep(0.55, 0.75, goldStream1) * 0.15 + 
                          smoothstep(0.6, 0.8, goldStream2) * 0.08;
    
    // Arcane wisps
    float arcaneWisp = fbm(uv * 6.0 + vec2(time * 0.7, -time * 0.5));
    float arcaneIntensity = smoothstep(0.65, 0.85, arcaneWisp) * 0.06;
    
    // Hextech particles (bright spots)
    float particles = 0.0;
    for (int i = 0; i < 6; i++) {
      float fi = float(i);
      vec2 particlePos = vec2(
        fract(sin(fi * 127.1) * 43758.5453 + time * (0.05 + fi * 0.02)),
        fract(cos(fi * 269.5) * 43758.5453 + time * (0.03 + fi * 0.015))
      );
      float dist = length(uv - particlePos);
      particles += smoothstep(0.03, 0.0, dist) * 0.3;
    }

    // Combine
    vec3 color = base;
    color += goldDark * goldIntensity;
    color += goldBright * particles;
    color += arcane * arcaneIntensity;

    // Vignette
    float vignette = 1.0 - smoothstep(0.4, 1.2, length(uv - 0.5) * 1.5);
    color *= vignette;

    // Subtle grain
    float grain = (random(uv + fract(time * 10.0)) - 0.5) * 0.04;
    color += grain;
    color = clamp(color, 0.0, 1.0);

    gl_FragColor = vec4(color, 0.85);
  }
`;

function ShaderMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  
  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_resolution: { value: new THREE.Vector2(1920, 1080) },
    u_mouse_x: { value: 0.5 },
    u_mouse_y: { value: 0.5 },
  }), []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = event.clientX / window.innerWidth;
      mouseRef.current.y = 1.0 - (event.clientY / window.innerHeight);
    };

    const handleResize = () => {
      uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [uniforms]);

  useFrame((state) => {
    uniforms.u_time.value = state.clock.elapsedTime;
    // Smooth mouse follow
    uniforms.u_mouse_x.value += (mouseRef.current.x - uniforms.u_mouse_x.value) * 0.05;
    uniforms.u_mouse_y.value += (mouseRef.current.y - uniforms.u_mouse_y.value) * 0.05;
  });

  return (
    <mesh ref={meshRef} scale={[2, 2, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        blending={THREE.NormalBlending}
      />
    </mesh>
  );
}

export function ShaderBackground() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        style={{ background: 'transparent' }}
        gl={{ antialias: false, alpha: true }}
      >
        <ShaderMesh />
      </Canvas>
    </div>
  );
}