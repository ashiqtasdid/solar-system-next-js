'use client'

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface MoonProps {
  color: string;
  size: number;
  distance: number; // Distance from the planet (orbit radius)
  speed: number; // Orbital speed around the planet
  planetRadius: number; // Distance from the planet (used if needed, but mainly for relation to Earth)
}

const Moon: React.FC<MoonProps> = ({
  color,
  size,
  distance,
  speed,
}) => {
  const moonRef = useRef<THREE.Mesh>(null!);
  const orbitRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    // Moon orbits around the Earth
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
