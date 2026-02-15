import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Torus, TorusKnot } from '@react-three/drei';
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
  // Klein bottle approximation using torus knot
  const ref = useRef<Mesh>(null);
  
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.15;
      ref.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <TorusKnot ref={ref} args={[0.8, 0.3, 128, 32, 2, 3]} position={position}>
      <meshStandardMaterial color="#f59e0b" wireframe />
    </TorusKnot>
  );
}

export function MobiusStrip({ position = [0, 0, 0] as [number, number, number] }) {
  const ref = useRef<Mesh>(null);
  
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.3;
    }
  });

  // Create Möbius strip geometry using parametric approach
  return (
    <TorusKnot ref={ref} args={[0.7, 0.2, 100, 16, 2, 1]} position={position}>
      <meshStandardMaterial color="#10b981" wireframe />
    </TorusKnot>
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
