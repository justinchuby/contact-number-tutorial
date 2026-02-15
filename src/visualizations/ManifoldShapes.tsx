import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';
import type { Mesh } from 'three';

export function RotatingSphere({ position = [0, 0, 0] as [number, number, number] }) {
  const ref = useRef<Mesh>(null);
  
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 64, 64]} position={position}>
      <meshStandardMaterial color="#06b6d4" wireframe />
    </Sphere>
  );
}

export function RotatingTorus({ position = [0, 0, 0] as [number, number, number] }) {
  const ref = useRef<Mesh>(null);
  
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.2;
      ref.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Torus ref={ref} args={[1, 0.4, 32, 64]} position={position}>
      <meshStandardMaterial color="#8b5cf6" wireframe />
    </Torus>
  );
}

export function RotatingKleinBottle({ position = [0, 0, 0] as [number, number, number] }) {
  const ref = useRef<Mesh>(null);
  
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.15;
      ref.current.rotation.y += delta * 0.25;
    }
  });

  // Create Klein bottle geometry using the "classical" bottle-shaped immersion
  const geometry = useMemo(() => {
    const uSegments = 80;
    const vSegments = 40;
    const vertices: number[] = [];
    const indices: number[] = [];
    
    // Klein bottle "bottle" shape parametrization
    // This creates the recognizable shape with a tube going back into itself
    for (let i = 0; i <= uSegments; i++) {
      const u = (i / uSegments) * Math.PI * 2;
      for (let j = 0; j <= vSegments; j++) {
        const v = (j / vSegments) * Math.PI * 2;
        
        let x, y, z;
        const cosU = Math.cos(u);
        const sinU = Math.sin(u);
        const cosV = Math.cos(v);
        const sinV = Math.sin(v);
        
        // Different formulas for different parts of the bottle
        if (u < Math.PI) {
          // Bottom part (0 to π)
          x = 6 * cosU * (1 + sinU) + 4 * (1 - cosU / 2) * cosU * cosV;
          y = 16 * sinU + 4 * (1 - cosU / 2) * sinU * cosV;
          z = 4 * (1 - cosU / 2) * sinV;
        } else {
          // Top part (π to 2π) - the handle that goes through
          x = 6 * cosU * (1 + sinU) - 4 * (1 - cosU / 2) * cosV;
          y = 16 * sinU;
          z = 4 * (1 - cosU / 2) * sinV;
        }
        
        // Scale down to fit nicely
        vertices.push(x * 0.05, y * 0.05, z * 0.05);
      }
    }
    
    // Create indices for triangles
    for (let i = 0; i < uSegments; i++) {
      for (let j = 0; j < vSegments; j++) {
        const a = i * (vSegments + 1) + j;
        const b = a + 1;
        const c = (i + 1) * (vSegments + 1) + j;
        const d = c + 1;
        
        indices.push(a, b, c);
        indices.push(b, d, c);
      }
    }
    
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  }, []);

  return (
    <mesh ref={ref} geometry={geometry} position={position}>
      <meshStandardMaterial color="#f59e0b" wireframe side={THREE.DoubleSide} />
    </mesh>
  );
}

// Figure-8 Klein bottle immersion (alternative representation)
export function KleinBottleFigure8({ position = [0, 0, 0] as [number, number, number] }) {
  const ref = useRef<Mesh>(null);
  
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.15;
      ref.current.rotation.y += delta * 0.25;
    }
  });

  // Create Klein bottle geometry using figure-8 immersion
  const geometry = useMemo(() => {
    const uSegments = 80;
    const vSegments = 40;
    const vertices: number[] = [];
    const indices: number[] = [];
    
    // Figure-8 Klein bottle parametrization
    const a = 2; // scale factor
    
    for (let i = 0; i <= uSegments; i++) {
      const u = (i / uSegments) * Math.PI * 2;
      for (let j = 0; j <= vSegments; j++) {
        const v = (j / vSegments) * Math.PI * 2;
        
        const cosU = Math.cos(u);
        const sinU = Math.sin(u);
        const sin2U = Math.sin(2 * u);
        const cosHalfV = Math.cos(v / 2);
        const sinHalfV = Math.sin(v / 2);
        
        // Figure-8 immersion equations
        const r = 1 + 0.5 * cosHalfV * sinU - 0.5 * sinHalfV * sin2U;
        const x = r * cosU;
        const y = r * sinU;
        const z = 0.5 * sinHalfV * sinU + 0.5 * cosHalfV * sin2U;
        
        vertices.push(x * a * 0.5, y * a * 0.5, z * a * 0.5);
      }
    }
    
    // Create indices for triangles
    for (let i = 0; i < uSegments; i++) {
      for (let j = 0; j < vSegments; j++) {
        const a = i * (vSegments + 1) + j;
        const b = a + 1;
        const c = (i + 1) * (vSegments + 1) + j;
        const d = c + 1;
        
        indices.push(a, b, c);
        indices.push(b, d, c);
      }
    }
    
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  }, []);

  return (
    <mesh ref={ref} geometry={geometry} position={position}>
      <meshStandardMaterial color="#ec4899" wireframe side={THREE.DoubleSide} />
    </mesh>
  );
}

export function MobiusStrip({ position = [0, 0, 0] as [number, number, number] }) {
  const ref = useRef<Mesh>(null);
  
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.3;
    }
  });

  // Create Möbius strip geometry using parametric equations
  const geometry = useMemo(() => {
    const segments = 64;
    const widthSegments = 16;
    const vertices: number[] = [];
    const indices: number[] = [];
    
    const R = 1; // Major radius
    const w = 0.4; // Half-width of strip
    
    for (let i = 0; i <= segments; i++) {
      const u = (i / segments) * Math.PI * 2; // 0 to 2π
      for (let j = 0; j <= widthSegments; j++) {
        const s = (j / widthSegments) * 2 - 1; // -1 to 1 (across width)
        
        // Möbius strip parametric equations
        // x = (R + s * cos(u/2)) * cos(u)
        // y = (R + s * cos(u/2)) * sin(u)
        // z = s * sin(u/2)
        const x = (R + s * w * Math.cos(u / 2)) * Math.cos(u);
        const y = (R + s * w * Math.cos(u / 2)) * Math.sin(u);
        const z = s * w * Math.sin(u / 2);
        
        vertices.push(x, y, z);
      }
    }
    
    // Create indices for triangles
    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < widthSegments; j++) {
        const a = i * (widthSegments + 1) + j;
        const b = a + 1;
        const c = (i + 1) * (widthSegments + 1) + j;
        const d = c + 1;
        
        indices.push(a, b, c);
        indices.push(b, d, c);
      }
    }
    
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  }, []);

  return (
    <mesh ref={ref} geometry={geometry} position={position}>
      <meshStandardMaterial color="#10b981" wireframe side={THREE.DoubleSide} />
    </mesh>
  );
}

// Tangent space visualization
export function TangentPlane({ 
  position = [0, 0, 0] as [number, number, number],
  normal = [0, 1, 0] as [number, number, number]
}) {
  return (
    <group position={position}>
      {/* Tangent plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.5, 1.5]} />
        <meshStandardMaterial color="#06b6d4" opacity={0.3} transparent side={2} />
      </mesh>
      {/* Normal vector */}
      <arrowHelper args={[
        { x: normal[0], y: normal[1], z: normal[2] } as any,
        { x: 0, y: 0, z: 0 } as any,
        0.8,
        0xff6b6b
      ]} />
    </group>
  );
}
