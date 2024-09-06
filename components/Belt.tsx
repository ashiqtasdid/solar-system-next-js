import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface BeltProps {
  innerRadius: number;
  outerRadius: number;
  count: number;
  color: string;
  rotationSpeed: number; // Rotation speed around the Sun
}

const Belt: React.FC<BeltProps> = ({ innerRadius, outerRadius, count, color, rotationSpeed }) => {
  const groupRef = useRef<THREE.Group>(null!);

  const positions = useMemo(() => {
    const posArray = [];
    for (let i = 0; i < count; i++) {
      const radius = THREE.MathUtils.randFloat(innerRadius, outerRadius);
      const angle = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const x = Math.cos(angle) * radius;
      const y = THREE.MathUtils.randFloat(-0.5, 0.5); // Small variation in Y axis
      const z = Math.sin(angle) * radius;
      posArray.push(x, y, z);
    }
    return new Float32Array(posArray);
  }, [count, innerRadius, outerRadius]);

  const pointsRef = useMemo(() => new THREE.BufferGeometry(), []);

  useMemo(() => {
    pointsRef.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  }, [positions, pointsRef]);

  useFrame(() => {
    // Rotate the group
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry attach="geometry" attributes={pointsRef.attributes} />
        <pointsMaterial
          attach="material"
          size={0.1} // Size of each particle
          color={color}
          sizeAttenuation
        />
      </points>
    </group>
  );
};

export default Belt;
