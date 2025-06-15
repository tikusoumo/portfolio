"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import * as THREE from 'three';

// Vertex shader (can remain the same)
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment Shader: Interactive Animated Gradient with Noise and Post-Process Grain
const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec3 u_color_purple;
  uniform vec3 u_color_white;
  uniform float u_opacity;
  uniform float u_mouse_x; // Normalized mouse X (0 to 1)
  uniform float u_mouse_y; // Normalized mouse Y (0 to 1)
  varying vec2 vUv;

  // Pseudo-random number generator (can be used for post-process noise)
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  // Simple value noise function (for gradient distortion)
  float valueNoise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  void main() {
    vec2 uv = vUv;
    float time = u_time * 0.15;

    float mouseInfluenceFactor = 2.0; 
    float mouseOffsetX = (u_mouse_x - 0.5) * mouseInfluenceFactor;
    float mouseOffsetY = (u_mouse_y - 0.5) * mouseInfluenceFactor;

    float baseMixFactor = sin(uv.x * 4.0 - uv.y * 2.0 + time + mouseOffsetX) + 
                          cos(uv.x * 2.0 + uv.y * 4.0 + time * 0.7 + mouseOffsetY);
    baseMixFactor = (baseMixFactor + 2.0) / 4.0;

    float noiseScale = 10.0;
    float noiseInfluence = 0.1; // For gradient distortion
    float noiseAnimationSpeed = 0.2;
    float gradientNoiseVal = valueNoise(uv * noiseScale + time * noiseAnimationSpeed);
    
    float noisyMixFactor = baseMixFactor + (gradientNoiseVal - 0.5) * noiseInfluence;
    noisyMixFactor = clamp(noisyMixFactor, 0.0, 1.0);

    float finalMixFactor = smoothstep(0.25, 0.75, noisyMixFactor);

    vec3 mixedColor = mix(u_color_purple, u_color_white, finalMixFactor);

    // Post-process noise (grain)
    float grainAmount = 0.20; // Increased from 0.05 for more visible grain
    // Generate a random value based on screen position and time for an animated grain
    float grain = (random(uv + fract(time)) - 0.5) * grainAmount; 
    
    vec3 finalColor = mixedColor + grain;
    finalColor = clamp(finalColor, 0.0, 1.0); // Ensure colors stay in valid range
    
    gl_FragColor = vec4(finalColor, u_opacity);
  }
`;

function ShaderMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();
  
  const colorSchemes = useMemo(() => ({
    light: {
      purple: new THREE.Color(0.6, 0.4, 0.8),
      white: new THREE.Color(0.95, 0.95, 1.0),
      opacity: 0.5
    },
    dark: {
      purple: new THREE.Color(0.35, 0.1, 0.6),
      white: new THREE.Color(0.0, 0.0, 0.0), // Changed from white to black
      opacity: 0.6
    }
  }), []);

  const uniforms = useMemo(() => {
    const currentScheme = theme === 'dark' ? colorSchemes.dark : colorSchemes.light;
    return {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_mouse_x: { value: 0.5 },
      u_mouse_y: { value: 0.5 },
      u_color_purple: { value: currentScheme.purple },
      u_color_white: { value: currentScheme.white },
      u_opacity: { value: currentScheme.opacity }
    };
  }, [theme, colorSchemes]);

  // Mouse tracking and resize
  useMemo(() => {
    const handleMouseMove = (event: MouseEvent) => {
      uniforms.u_mouse_x.value = event.clientX / window.innerWidth;
      uniforms.u_mouse_y.value = 1.0 - (event.clientY / window.innerHeight);
    };

    const handleResize = () => {
      uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial set

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [uniforms]);

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.u_time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} scale={[2, 2, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        key={theme} // Force re-creation of material on theme change
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
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        style={{ background: 'transparent' }} 
      >
        <ShaderMesh />
      </Canvas>
    </div>
  );
}