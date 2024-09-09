"use client";

import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import Planet from "@/components/Planet";
import Moon from "@/components/Moon";
import OrbitLine from "@/components/OrbitLine";
import Belt from "@/components/Belt";
import { Suspense, useState } from "react";
import Stars from "@/components/Stars";
import mercuryTexture from "@/components/mercurymap.jpg";
import marsTexture from "@/components/marsmap1k.jpg";
import venusTexture from "@/components/venusmap.jpg";
import earthTexture from "@/components/earthmap1k.jpg";
import jupiterTexture from "@/components/jupitermap.jpg";
import saturnTexture from "@/components/saturnmap.jpg";
import uranusTexture from "@/components/uranusmap.jpg";
import neptuneTexture from "@/components/neptunemap.jpg";
import { useRouter } from "next/navigation";
import * as THREE from "three";

const CameraControls = ({ position }: { position: [number, number, number] }) => {
  const { camera, invalidate } = useThree();
  useFrame(() => {
    camera.position.lerp(new THREE.Vector3(...position), 0.1);
    camera.lookAt(0, 0, 0);
    invalidate();
  });
  return null;
};

const SolarSystem = () => {
  const planetSpeed: number = 50;
  const router = useRouter();
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 60, 150]);
  const [view, setView] = useState<'default' | 'top'>('default');

  const handleClick = (position: [number, number, number]) => {
    // Adjust camera position based on current view
    if (view === 'default') {
      setCameraPosition(position);
    } else {
      // Convert position to top view coordinates
      setCameraPosition([position[0], 150, position[2]]);
    }
  };

  const handleViewSwitch = () => {
    setView((prevView) => (prevView === 'default' ? 'top' : 'default'));
    if (view === 'default') {
      setCameraPosition([0, 150, 0]); // Top view
    } else {
      setCameraPosition([0, 60, 150]); // Default view
    }
  };

  const handleBackClick = () => {
    router.back();
  };

  return (
    <>
      <Canvas
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 0,
        }}
        camera={{ position: cameraPosition, fov: 75 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[0, 0, 0]} intensity={2} />

          {/* Planets */}
          <group onClick={() => handleClick([0, 0, 0])}>
            <mesh>
              <sphereGeometry args={[5, 32, 32]} />
              <meshBasicMaterial color="yellow" />
            </mesh>
            <Text position={[0, 6, 0]} fontSize={1} color="white">
              Sun
            </Text>
          </group>

          <group onClick={() => handleClick([10, 0, 0])}>
            <Planet
              textureUrl={mercuryTexture}
              size={0.5}
              speed={0.01 * planetSpeed}
              orbitRadius={10}
              rotationSpeed={0.03}
            />
            <Text position={[10, 0.5, 0]} fontSize={0.5} color="white">
              Mercury
            </Text>
            <OrbitLine orbitRadius={10} />
          </group>

          <group onClick={() => handleClick([20, 0, 0])}>
            <Planet
              textureUrl={venusTexture}
              size={1.0}
              speed={0.007 * planetSpeed}
              orbitRadius={20}
              rotationSpeed={0.03}
            />
            <Text position={[20, 1, 0]} fontSize={0.5} color="white">
              Venus
            </Text>
            <OrbitLine orbitRadius={20} />
          </group>

          <group onClick={() => handleClick([30, 0, 0])}>
            <Planet
              textureUrl={earthTexture}
              size={1.0}
              speed={0.005 * planetSpeed}
              orbitRadius={30}
              rotationSpeed={0.03}
            >
              <group>
                <Moon
                  color="gray"
                  size={0.25}
                  distance={3}
                  speed={0.01 * 250}
                  planetRadius={1}
                />
                <OrbitLine orbitRadius={3} />
              </group>
            </Planet>
            <Text position={[30, 1, 0]} fontSize={0.5} color="white">
              Earth
            </Text>
            <OrbitLine orbitRadius={30} />
          </group>

          <group onClick={() => handleClick([40, 0, 0])}>
            <Planet
              textureUrl={marsTexture}
              size={0.75}
              speed={0.004 * planetSpeed}
              orbitRadius={40}
              rotationSpeed={0.02}
            >
              <group>
                <Moon
                  color="gray"
                  size={0.1}
                  distance={1.5}
                  speed={0.015 * 250}
                  planetRadius={0.75}
                />
                <Moon
                  color="gray"
                  size={0.08}
                  distance={2.5}
                  speed={0.01}
                  planetRadius={0.75}
                />
                <OrbitLine orbitRadius={1.5} />
                <OrbitLine orbitRadius={2.5} />
              </group>
            </Planet>
            <Text position={[40, 0.75, 0]} fontSize={0.5} color="white">
              Mars
            </Text>
            <OrbitLine orbitRadius={40} />
          </group>

          <Belt
            innerRadius={45}
            outerRadius={55}
            count={2500}
            color="gray"
            rotationSpeed={0.001}
          />

          <group onClick={() => handleClick([68, 0, 0])}>
            <Planet
              textureUrl={jupiterTexture}
              size={2.0}
              speed={0.003 * planetSpeed}
              orbitRadius={68}
              rotationSpeed={0.02}
            >
              <group>
                <Moon
                  color="gray"
                  size={0.3}
                  distance={5}
                  speed={0.007 * 250}
                  planetRadius={2}
                />
                <Moon
                  color="gray"
                  size={0.25}
                  distance={7}
                  speed={0.005 * 250}
                  planetRadius={2}
                />
                <OrbitLine orbitRadius={5} />
                <OrbitLine orbitRadius={7} />
              </group>
            </Planet>
            <Text position={[68, 2, 0]} fontSize={0.5} color="white">
              Jupiter
            </Text>
            <OrbitLine orbitRadius={68} />
          </group>

          <group onClick={() => handleClick([78, 0, 0])}>
            <Planet
              textureUrl={saturnTexture}
              size={1.7}
              speed={0.002 * planetSpeed}
              orbitRadius={78}
              rotationSpeed={0.01}
            >
              <group>
                <Moon
                  color="gray"
                  size={0.4}
                  distance={6}
                  speed={0.005 * 250}
                  planetRadius={1.7}
                />
                <Moon
                  color="gray"
                  size={0.2}
                  distance={8}
                  speed={0.003 * 250}
                  planetRadius={1.7}
                />
                <OrbitLine orbitRadius={6} />
                <OrbitLine orbitRadius={8} />
              </group>
            </Planet>
            <Text position={[78, 1.5, 0]} fontSize={0.5} color="white">
              Saturn
            </Text>
            <OrbitLine orbitRadius={78} />
          </group>

          <group onClick={() => handleClick([88, 0, 0])}>
            <Planet
              textureUrl={uranusTexture}
              size={1.4}
              speed={0.0015 * planetSpeed}
              orbitRadius={88}
              rotationSpeed={0.002}
            >
              <group>
                <Moon
                  color="gray"
                  size={0.25}
                  distance={4}
                  speed={0.005 * 250}
                  planetRadius={1.4}
                />
                <Moon
                  color="gray"
                  size={0.2}
                  distance={6}
                  speed={0.003 * 250}
                  planetRadius={1.4}
                />
                <OrbitLine orbitRadius={4} />
                <OrbitLine orbitRadius={6} />
              </group>
            </Planet>
            <Text position={[88, 1, 0]} fontSize={0.5} color="white">
              Uranus
            </Text>
            <OrbitLine orbitRadius={88} />
          </group>

          <group onClick={() => handleClick([98, 0, 0])}>
            <Planet
              textureUrl={neptuneTexture}
              size={1.3}
              speed={0.001 * planetSpeed}
              orbitRadius={98}
              rotationSpeed={0.001}
            >
              <group>
                <Moon
                  color="gray"
                  size={0.2}
                  distance={3}
                  speed={0.005 * 250}
                  planetRadius={1.3}
                />
                <Moon
                  color="gray"
                  size={0.15}
                  distance={5}
                  speed={0.003 * 250}
                  planetRadius={1.3}
                />
                <OrbitLine orbitRadius={3} />
                <OrbitLine orbitRadius={5} />
              </group>
            </Planet>
            <Text position={[98, 1, 0]} fontSize={0.5} color="white">
              Neptune
            </Text>
            <OrbitLine orbitRadius={98} />
          </group>

          <Stars />

          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
          />
          <CameraControls position={cameraPosition} />
        </Suspense>
      </Canvas>

      <div className="absolute flex justify-center w-[100%] bottom-10 text-3xl">
        <div
          className="border border-x-0 border-t-0 hover:border-blue-400 hover:text-blue-400 cursor-pointer px-6 text-center"
          onClick={() => handleClick([10, 10, 10])}
        >
          Sun
        </div>
        <div
          className="border border-x-0 border-t-0 hover:border-blue-400 hover:text-blue-400 cursor-pointer px-6 text-center"
          onClick={() => handleClick([10, 2, 10])}
        >
          Mercury
        </div>
        <div
          className="border border-x-0 border-t-0 hover:border-blue-400 hover:text-blue-400 cursor-pointer px-6 text-center"
          onClick={() => handleClick([28, 5, 10])}
        >
          Venus
        </div>
        <div
          className="border border-x-0 border-t-0 hover:border-blue-400 hover:text-blue-400 cursor-pointer px-6 text-center"
          onClick={() => handleClick([38, 5, 10])}
        >
          Earth
        </div>
        <div
          className="border border-x-0 border-t-0 hover:border-blue-400 hover:text-blue-400 cursor-pointer px-6 text-center"
          onClick={() => handleClick([48, 5, 10])}
        >
          Mars
        </div>
        <div
          className="border border-x-0 border-t-0 hover:border-blue-400 hover:text-blue-400 cursor-pointer px-6 text-center"
          onClick={() => handleClick([80, 5, 10])}
        >
          Jupiter
        </div>
        <div
          className="border border-x-0 border-t-0 hover:border-blue-400 hover:text-blue-400 cursor-pointer px-6 text-center"
          onClick={() => handleClick([90, 5, 10])}
        >
          Saturn
        </div>
        <div
          className="border border-x-0 border-t-0 hover:border-blue-400 hover:text-blue-400 cursor-pointer px-6 text-center"
          onClick={() => handleClick([100, 5, 10])}
        >
          Uranus
        </div>
        <div
          className="border border-x-0 border-t-0 hover:border-blue-400 hover:text-blue-400 cursor-pointer px-6 text-center"
          onClick={() => handleClick([110, 5, 10])}
        >
          Neptune
        </div>
      </div>
      <button
        onClick={handleBackClick}
        className="absolute top-18 left- px-8 font-semibold text-2xl py-2 bg-white text-black rounded-lg shadow-md"
      >
        Back
      </button>
      <button
        onClick={handleViewSwitch}
        className="absolute top-18 right-10 px-8 font-semibold text-2xl py-2 bg-white text-black rounded-lg shadow-md"
      >
        {view === 'default' ? 'Top View' : 'Default View'}
      </button>
    </>
  );
};

export default SolarSystem;
