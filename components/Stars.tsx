import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const NUM_STARS = 8500; 
const STAR_SIZE = 0.05; 
const SPREAD = 2000; 
const Stars: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const posArray = [];
    for (let i = 0; i < NUM_STARS; i++) {
      const x = THREE.MathUtils.randFloatSpread(SPREAD); 
      const y = THREE.MathUtils.randFloatSpread(SPREAD);
      const z = THREE.MathUtils.randFloatSpread(SPREAD);
      posArray.push(x, y, z);
    }
    return new Float32Array(posArray);
  }, []);

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
    opacity: 0.7
  }), []);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry} material={material} />
  );
};

export default Stars;
