import { Line } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from "three";

interface OrbitLineProps {
  orbitRadius: number;
}

const OrbitLine: React.FC<OrbitLineProps> = ({ orbitRadius }) => {
  const points = useMemo(() => {
    const segments = 64;
    const curve = new THREE.EllipseCurve(
      0, 0,
      orbitRadius, orbitRadius, // X and Y radii
      0, 2 * Math.PI,
      false 
    );
    const points = curve.getPoints(segments).map(p => new THREE.Vector3(p.x, 0, p.y));
    return points;
  }, [orbitRadius]);

  return (
    <Line
      points={points}
      color="gray"
      lineWidth={0.5}
      opacity={0.4}
      transparent
    />
  );
};

export default OrbitLine;
