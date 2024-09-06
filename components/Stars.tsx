import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const NUM_STARS = 8500; // Number of stars
const STAR_SIZE = 0.05; // Size of each star
const SPREAD = 2000; // Increased spread for larger coverage

const Stars: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null!);

  // Generate star positions
  const positions = useMemo(() => {
    const posArray = [];
    for (let i = 0; i < NUM_STARS; i++) {
      const x = THREE.MathUtils.randFloatSpread(SPREAD); // Increased spread
      const y = THREE.MathUtils.randFloatSpread(SPREAD);
      const z = THREE.MathUtils.randFloatSpread(SPREAD);
      posArray.push(x, y, z);
    }
    return new Float32Array(posArray);
  }, []);

  // Create star geometry and material
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geom;
  }, [positions]);

  const material = useMemo(() => new THREE.PointsMaterial({
    color: "white",
    size: STAR_SIZE,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.8
  }), []);

  useFrame(() => {
    if (pointsRef.current) {
      // Small rotation to create a subtle motion effect
      pointsRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry} material={material} />
  );
};

export default Stars;
