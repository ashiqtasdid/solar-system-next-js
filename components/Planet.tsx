import { useRef, ReactNode, Suspense } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";
import { StaticImageData } from 'next/image';

interface PlanetProps {
  textureUrl?: string | StaticImageData;
  color?: string;
  size: number;
  speed: number;
  orbitRadius: number;
  rotationSpeed: number;
  children?: ReactNode;
  paused?: boolean;
}

const Planet: React.FC<PlanetProps> = ({
  textureUrl,
  color = 'gray',
  size,
  speed,
  orbitRadius,
  rotationSpeed,
  children,
  paused = false, 
}) => {
  const planetRef = useRef<THREE.Mesh>(null!);
  const orbitRef = useRef<THREE.Group>(null!);

  const texture = useLoader(TextureLoader, typeof textureUrl === 'string' ? textureUrl : (textureUrl as StaticImageData)?.src);

  useFrame(({ clock }) => {
    if (paused) return; 

    const elapsed = clock.getElapsedTime();

    if (planetRef.current) {
      planetRef.current.rotation.y += rotationSpeed;
    }

    if (orbitRef.current) {
      orbitRef.current.position.x = Math.sin(elapsed * speed) * orbitRadius;
      orbitRef.current.position.z = Math.cos(elapsed * speed) * orbitRadius;
    }
  });

  return (
    <group ref={orbitRef}>
      <mesh ref={planetRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          map={texture || undefined} 
          color={!texture ? color : undefined}
        />
      </mesh>
      {children}
    </group>
  );
};

const PlanetWithSuspense: React.FC<PlanetProps> = (props) => (
  <Suspense fallback={null}>
    <Planet {...props} />
  </Suspense>
);

export default PlanetWithSuspense;
