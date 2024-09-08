// components/Asteroid.tsx

import React from 'react';
import { MeshProps } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AsteroidProps extends MeshProps {
  orbitRadius: number;
  speed: number;
  size: number;
  paused: boolean;
}

const Asteroid: React.FC<AsteroidProps> = ({ orbitRadius, speed, size, paused }) => {
  const ref = React.useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (ref.current && !paused) {
      const elapsedTime = clock.getElapsedTime();
      ref.current.position.x = orbitRadius * Math.cos(elapsedTime * speed);
      ref.current.position.z = orbitRadius * Math.sin(elapsedTime * speed);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
};

export default Asteroid;
