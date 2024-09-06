"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Planet from "./Planet";
import Moon from "./Moon";
import OrbitLine from "./OrbitLine";
import Belt from "./Belt";
import { Suspense } from "react";
import Stars from "./Stars";
import mercuryTexture from "@/components/mercurymap.jpg";
import marsTexture from "@/components/marsmap1k.jpg";
import venusTexture from "@/components/venusmap.jpg";
import earthTexture from "@/components/earthmap1k.jpg";
import jupiterTexture from "@/components/jupitermap.jpg";
import saturnTexture from "@/components/saturnmap.jpg";
import uranusTexture from "@/components/uranusmap.jpg";
import neptuneTexture from "@/components/neptunemap.jpg";

const SolarSystem = () => {
  const moonSpeed: number = 250;
  const planetSpeed: number = 50;

  return (
    <Canvas
      style={{ width: "100vw", height: "100vh" }}
      camera={{ position: [0, 60, 150], fov: 75 }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 0]} intensity={2} />

        {/* Sun */}
        <mesh>
          <sphereGeometry args={[5, 32, 32]} />
          <meshBasicMaterial color="yellow" />
        </mesh>

        {/* Planets */}
        <Planet
          textureUrl={mercuryTexture}
          size={0.5}
          speed={0.01 * planetSpeed}
          orbitRadius={10}
          rotationSpeed={0.03}
        />
        <OrbitLine orbitRadius={10} />

        <Planet
          textureUrl={venusTexture}
          size={1.0}
          speed={0.007 * planetSpeed}
          orbitRadius={20}
          rotationSpeed={0.03}
        />
        <OrbitLine orbitRadius={20} />

        <Planet
          textureUrl={earthTexture}
          size={1.0}
          speed={0.005 * planetSpeed}
          orbitRadius={30}
          rotationSpeed={0.03}
        >
          {/* Earth with Moon */}
          <group>
            <Moon
              color="gray"
              size={0.25}
              distance={3} // Moon's orbit distance from Earth
              speed={0.01 * moonSpeed} // Moon's orbit speed
              planetRadius={1} // Radius of Earth
            />
            <OrbitLine orbitRadius={3} /> {/* Orbit line for Moon */}
          </group>
        </Planet>
        <OrbitLine orbitRadius={30} />

        <Planet
          textureUrl={marsTexture}
          size={0.75}
          speed={0.004 * planetSpeed}
          orbitRadius={40}
          rotationSpeed={0.02}
        >
          {/* Mars with Moons */}
          <group>
            <Moon
              color="gray"
              size={0.1}
              distance={1.5} // Orbit distance from Mars
              speed={0.015 * moonSpeed} // Orbit speed
              planetRadius={0.75} // Radius of Mars
            />
            <Moon
              color="gray"
              size={0.08}
              distance={2.5} // Orbit distance from Mars
              speed={0.01} // Orbit speed
              planetRadius={0.75} // Radius of Mars
            />
            <OrbitLine orbitRadius={1.5} /> {/* Orbit line for Phobos */}
            <OrbitLine orbitRadius={2.5} /> {/* Orbit line for Deimos */}
          </group>
        </Planet>
        <OrbitLine orbitRadius={40} />

        {/* Asteroid Belt */}
        <Belt
          innerRadius={45}
          outerRadius={55}
          count={2500}
          color="gray"
          rotationSpeed={0.001} // Rotation speed around the Sun
        />

        <Planet
          textureUrl={jupiterTexture}
          size={2.0}
          speed={0.003 * planetSpeed}
          orbitRadius={60 + 8}
          rotationSpeed={0.02}
        >
          {/* Jupiter with Moons */}
          <group>
            <Moon
              color="gray"
              size={0.3}
              distance={5} // Orbit distance from Jupiter
              speed={0.007 * moonSpeed} // Orbit speed
              planetRadius={2} // Radius of Jupiter
            />
            <Moon
              color="gray"
              size={0.25}
              distance={7} // Orbit distance from Jupiter
              speed={0.005 * moonSpeed} // Orbit speed
              planetRadius={2} // Radius of Jupiter
            />
            <OrbitLine orbitRadius={5} /> {/* Orbit line for Io */}
            <OrbitLine orbitRadius={7} /> {/* Orbit line for Europa */}
          </group>
        </Planet>
        <OrbitLine orbitRadius={60 + 8} />

        <Planet
          textureUrl={saturnTexture}
          size={1.7}
          speed={0.002 * planetSpeed}
          orbitRadius={70 + 8}
          rotationSpeed={0.01}
        >
          {/* Saturn with Moons */}
          <group>
            <Moon
              color="gray"
              size={0.4}
              distance={6} // Orbit distance from Saturn
              speed={0.005 * moonSpeed} // Orbit speed
              planetRadius={1.7} // Radius of Saturn
            />
            <Moon
              color="gray"
              size={0.2}
              distance={8} // Orbit distance from Saturn
              speed={0.003 * moonSpeed} // Orbit speed
              planetRadius={1.7} // Radius of Saturn
            />
            <OrbitLine orbitRadius={6} /> {/* Orbit line for Titan */}
            <OrbitLine orbitRadius={8} /> {/* Orbit line for Rhea */}
          </group>
        </Planet>
        <OrbitLine orbitRadius={70 + 8} />

        <Planet
          textureUrl={uranusTexture}
          size={1.4}
          speed={0.0015 * planetSpeed}
          orbitRadius={80 + 8}
          rotationSpeed={0.002}
        >
          {/* Uranus with Moons */}
          <group>
            <Moon
              color="gray"
              size={0.25}
              distance={4} // Orbit distance from Uranus
              speed={0.005 * moonSpeed} // Orbit speed
              planetRadius={1.4} // Radius of Uranus
            />
            <Moon
              color="gray"
              size={0.2}
              distance={6} // Orbit distance from Uranus
              speed={0.003 * moonSpeed} // Orbit speed
              planetRadius={1.4} // Radius of Uranus
            />
            <OrbitLine orbitRadius={4} /> {/* Orbit line for Titania */}
            <OrbitLine orbitRadius={6} /> {/* Orbit line for Oberon */}
          </group>
        </Planet>
        <OrbitLine orbitRadius={80 + 8} />

        <Planet
          textureUrl={neptuneTexture}
          size={1.3}
          speed={0.001 * planetSpeed}
          orbitRadius={90 + 8}
          rotationSpeed={0.02}
        >
          {/* Neptune with Moon */}
          <group>
            <Moon
              color="gray"
              size={0.3}
              distance={5} // Orbit distance from Neptune
              speed={0.007 * moonSpeed} // Orbit speed
              planetRadius={1.3} // Radius of Neptune
            />
            <OrbitLine orbitRadius={5} /> {/* Orbit line for Triton */}
          </group>
        </Planet>
        <OrbitLine orbitRadius={90 + 8} />

        {/* Kuiper Belt */}
        <Belt
          innerRadius={110}
          outerRadius={140}
          count={10000}
          color="lightblue"
          rotationSpeed={0.0005} // Rotation speed around the Sun
        />
        <Stars />

        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Suspense>
    </Canvas>
  );
};

export default SolarSystem;
