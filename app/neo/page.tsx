'use client'

// EarthAndSatellites.tsx
import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';

// Constants for Earth and satellite orbiting
const EARTH_RADIUS = 1;
const SATELLITE_ALTITUDE_MIN = 1.2;
const SATELLITE_ALTITUDE_MAX = 3;

// Generate random Keplerian orbital parameters for each satellite
const generateSatellites = (count: number) => {
  return Array.from({ length: count }, () => {
    const semiMajorAxis = THREE.MathUtils.randFloat(SATELLITE_ALTITUDE_MIN, SATELLITE_ALTITUDE_MAX);
    const eccentricity = THREE.MathUtils.randFloat(0, 0.05); // small eccentricity for near-circular orbits
    const inclination = THREE.MathUtils.randFloatSpread(360); // angle of orbit relative to Earth's equator
    const longitudeOfAscendingNode = THREE.MathUtils.randFloatSpread(360); // orientation of the orbit
    const argumentOfPeriapsis = THREE.MathUtils.randFloatSpread(360); // position of the orbit's closest point
    const trueAnomaly = THREE.MathUtils.randFloatSpread(360); // initial angle of satellite

    return { semiMajorAxis, eccentricity, inclination, longitudeOfAscendingNode, argumentOfPeriapsis, trueAnomaly };
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SatelliteParticles = ({ satelliteData }: { satelliteData: any[] }) => {
  const ref = useRef<THREE.Points>(null!);

  // Animate satellites to follow Keplerian orbits
  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    const positions = ref.current.geometry.attributes.position.array as Float32Array;

    satelliteData.forEach((satellite, i) => {
      const { semiMajorAxis, eccentricity, inclination, longitudeOfAscendingNode, argumentOfPeriapsis } = satellite;

      // Calculate position based on elapsed time (simplified orbital motion)
      const angle = (elapsed + satellite.trueAnomaly) * 0.05; // control speed
      const distance = semiMajorAxis * (1 - eccentricity ** 2) / (1 + eccentricity * Math.cos(angle));

      // Convert orbital elements to Cartesian coordinates
      const x = distance * Math.cos(angle);
      const z = distance * Math.sin(angle);

      // Apply inclination, longitude, and periapsis
      const pos = new THREE.Vector3(x, 0, z)
        .applyAxisAngle(new THREE.Vector3(0, 0, 1), THREE.MathUtils.degToRad(inclination))
        .applyAxisAngle(new THREE.Vector3(0, 1, 0), THREE.MathUtils.degToRad(longitudeOfAscendingNode))
        .applyAxisAngle(new THREE.Vector3(1, 0, 0), THREE.MathUtils.degToRad(argumentOfPeriapsis));

      positions[i * 3] = pos.x;
      positions[i * 3 + 1] = pos.y;
      positions[i * 3 + 2] = pos.z;
    });

    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  const satellitePositions = useMemo(() => {
    const positions = new Float32Array(satelliteData.length * 3);
    return positions;
  }, [satelliteData]);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={satellitePositions}
          count={satellitePositions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="white" size={0.01} />
    </points>
  );
};

const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null!);
  const earthTexture = useTexture('/assets/earthmap1k.jpg');

  // Rotate the Earth on its axis
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001; // Adjust the rotation speed as needed
    }
  });

  return (
    <Sphere ref={earthRef} args={[EARTH_RADIUS, 32, 32]}>
      <meshStandardMaterial map={earthTexture} />
    </Sphere>
  );
};

const EarthAndSatellites = () => {
  // Generate 11,330 satellites
  const satelliteData = useMemo(() => generateSatellites(11330), []);
  const router = useRouter(); // Initialize the useRouter hook

  const handleBackClick = () => {
    router.back(); // Navigate back to the previous page
  };
  return (
    <>
    <Canvas camera={{ position: [0, 2, 5], fov: 60 }} style={{ width: '100vw', height: '100vh',position:"absolute" ,top:0}}>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />

      {/* Earth */}
      <Earth />

      {/* Satellite Particles */}
      <SatelliteParticles satelliteData={satelliteData} />

      {/* Camera Controls */}
      <OrbitControls />
    </Canvas>
    <button
        onClick={handleBackClick}
        className="absolute top-18 left- px-8 font-semibold text-2xl py-2 ml-10 bg-white text-black rounded-lg shadow-md"
      >
        Back
      </button>
    </>
  );
};

export default EarthAndSatellites;