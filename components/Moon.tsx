'use client'

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface MoonProps {
  color: string;
  size: number;
  distance: number;
  speed: number; 
  planetRadius: number; 
  paused?: boolean; 
}

const Moon: React.FC<MoonProps> = ({
  color,
  size,
  distance,
  speed,
  paused = false, 
}) => {
  const moonRef = useRef<THREE.Mesh>(null!);
  const orbitRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (paused) return; 

    const elapsed = clock.getElapsedTime();

    orbitRef.current.position.x = Math.sin(elapsed * speed) * distance;
    orbitRef.current.position.z = Math.cos(elapsed * speed) * distance;
  });

  return (
    <group ref={orbitRef}>
      <mesh ref={moonRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

export default Moon;
