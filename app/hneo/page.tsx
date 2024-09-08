"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import Planet from "@/components/Planet";
import Moon from "@/components/Moon";
import OrbitLine from "@/components/OrbitLine";
import Belt from "@/components/Belt";
import Asteroid from "@/components/Asteroid";
import { Suspense, useState, useEffect } from "react";
import Stars from "@/components/Stars";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  // State to control the paused status
  const [paused, setPaused] = useState(false);

  // Effect to set paused to true after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setPaused(true);
    }, 1000);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <button
        onClick={() => router.back()}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          padding: "10px 20px",
          backgroundColor: "#000000",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          zIndex: 1000,
        }}
      >
        Back
      </button>
      <Canvas
        camera={{ position: [8, 1, 35], fov: 50 }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[0, 0, 0]} intensity={2} />

          {/* Sun */}
          <mesh>
            <sphereGeometry args={[5, 32, 32]} />
            <meshBasicMaterial color="yellow" />
          </mesh>
          <Text position={[0, 6, 0]} fontSize={1} color="white">
            Sun
          </Text>

          {/* Planets */}
          <group>
            <Planet
              textureUrl={mercuryTexture}
              size={0.5}
              speed={0.01 * planetSpeed}
              orbitRadius={10}
              rotationSpeed={0.03}
              paused={paused}
            />
            <Text position={[10, 0.5, 0]} fontSize={0.5} color="white">
              Mercury
            </Text>
            <OrbitLine orbitRadius={10} />
          </group>

          <group>
            <Planet
              textureUrl={venusTexture}
              size={1.0}
              speed={0.007 * planetSpeed}
              orbitRadius={20}
              rotationSpeed={0.03}
              paused={paused}
            />
            <Text position={[20, 1, 0]} fontSize={0.5} color="white">
              Venus
            </Text>
            <OrbitLine orbitRadius={20} />
          </group>

          <group>
            <Planet
              textureUrl={earthTexture}
              size={1.0}
              speed={0.005 * planetSpeed}
              orbitRadius={30}
              rotationSpeed={0.03}
              paused={paused}
            >
              {/* Earth with Moon */}
              <group>
                <Moon
                  color="gray"
                  size={0.25}
                  distance={3} // Moon's orbit distance from Earth
                  speed={0.01 * moonSpeed} // Moon's orbit speed
                  planetRadius={1} // Radius of Earth
                  paused={paused}
                />
                <OrbitLine orbitRadius={3} /> {/* Orbit line for Moon */}
              </group>
            </Planet>
            <Text position={[30, 1, 0]} fontSize={0.5} color="white">
              Earth
            </Text>
            <OrbitLine orbitRadius={30} />
          </group>

          <group>
            <Planet
              textureUrl={marsTexture}
              size={0.75}
              speed={0.004 * planetSpeed}
              orbitRadius={40}
              rotationSpeed={0.02}
              paused={paused}
            >
              {/* Mars with Moons */}
              <group>
                <Moon
                  color="gray"
                  size={0.1}
                  distance={1.5} // Orbit distance from Mars
                  speed={0.015 * moonSpeed} // Orbit speed
                  planetRadius={0.75} // Radius of Mars
                  paused={paused}
                />
                <Moon
                  color="gray"
                  size={0.08}
                  distance={2.5} // Orbit distance from Mars
                  speed={0.01} // Orbit speed
                  planetRadius={0.75} // Radius of Mars
                  paused={paused}
                />
                <OrbitLine orbitRadius={1.5} /> {/* Orbit line for Phobos */}
                <OrbitLine orbitRadius={2.5} /> {/* Orbit line for Deimos */}
              </group>
            </Planet>
            <Text position={[40, 0.75, 0]} fontSize={0.5} color="white">
              Mars
            </Text>
            <OrbitLine orbitRadius={40} />
          </group>

          {/* Asteroid Belt */}
          <Belt
            innerRadius={45}
            outerRadius={55}
            count={2500}
            color="gray"
            rotationSpeed={0.001} // Rotation speed around the Sun
          />

          <group>
            <Planet
              textureUrl={jupiterTexture}
              size={2.0}
              speed={0.003 * planetSpeed}
              orbitRadius={68}
              rotationSpeed={0.02}
              paused={paused}
            >
              {/* Jupiter with Moons */}
              <group>
                <Moon
                  color="gray"
                  size={0.3}
                  distance={5} // Orbit distance from Jupiter
                  speed={0.007 * moonSpeed} // Orbit speed
                  planetRadius={2} // Radius of Jupiter
                  paused={paused}
                />
                <Moon
                  color="gray"
                  size={0.25}
                  distance={7} // Orbit distance from Jupiter
                  speed={0.005 * moonSpeed} // Orbit speed
                  planetRadius={2} // Radius of Jupiter
                  paused={paused}
                />
                <OrbitLine orbitRadius={5} /> {/* Orbit line for Io */}
                <OrbitLine orbitRadius={7} /> {/* Orbit line for Europa */}
              </group>
            </Planet>
            <Text position={[68, 2, 0]} fontSize={0.5} color="white">
              Jupiter
            </Text>
            <OrbitLine orbitRadius={68} />
          </group>

          <group>
            <Planet
              textureUrl={saturnTexture}
              size={1.7}
              speed={0.002 * planetSpeed}
              orbitRadius={78}
              rotationSpeed={0.01}
              paused={paused}
            >
              {/* Saturn with Moons */}
              <group>
                <Moon
                  color="gray"
                  size={0.4}
                  distance={6} // Orbit distance from Saturn
                  speed={0.005 * moonSpeed} // Orbit speed
                  planetRadius={1.7} // Radius of Saturn
                  paused={paused}
                />
                <Moon
                  color="gray"
                  size={0.2}
                  distance={8} // Orbit distance from Saturn
                  speed={0.003 * moonSpeed} // Orbit speed
                  planetRadius={1.7} // Radius of Saturn
                  paused={paused}
                />
                <OrbitLine orbitRadius={6} /> {/* Orbit line for Titan */}
                <OrbitLine orbitRadius={8} /> {/* Orbit line for Rhea */}
              </group>
            </Planet>
            <Text position={[78, 1.5, 0]} fontSize={0.5} color="white">
              Saturn
            </Text>
            <OrbitLine orbitRadius={78} />
          </group>

          <group>
            <Planet
              textureUrl={uranusTexture}
              size={1.4}
              speed={0.0015 * planetSpeed}
              orbitRadius={88}
              rotationSpeed={0.002}
              paused={paused}
            >
              {/* Uranus with Moons */}
              <group>
                <Moon
                  color="gray"
                  size={0.25}
                  distance={4} // Orbit distance from Uranus
                  speed={0.005 * moonSpeed} // Orbit speed
                  planetRadius={1.4} // Radius of Uranus
                  paused={paused}
                />
                <Moon
                  color="gray"
                  size={0.2}
                  distance={6} // Orbit distance from Uranus
                  speed={0.003 * moonSpeed} // Orbit speed
                  planetRadius={1.4} // Radius of Uranus
                  paused={paused}
                />
                <OrbitLine orbitRadius={4} /> {/* Orbit line for Titania */}
                <OrbitLine orbitRadius={6} /> {/* Orbit line for Oberon */}
              </group>
            </Planet>
            <Text position={[88, 1.2, 0]} fontSize={0.5} color="white">
              Uranus
            </Text>
            <OrbitLine orbitRadius={88} />
          </group>

          <group>
            <Planet
              textureUrl={neptuneTexture}
              size={1.3}
              speed={0.001 * planetSpeed}
              orbitRadius={98}
              rotationSpeed={0.02}
              paused={paused}
            >
              {/* Neptune with Moon */}
              <group>
                <Moon
                  color="gray"
                  size={0.3}
                  distance={5} // Orbit distance from Neptune
                  speed={0.007 * moonSpeed} // Orbit speed
                  planetRadius={1.3} // Radius of Neptune
                  paused={paused}
                />
                <OrbitLine orbitRadius={5} /> {/* Orbit line for Triton */}
              </group>
            </Planet>
            <Text position={[98, 1, 0]} fontSize={0.5} color="white">
              Neptune
            </Text>
            <OrbitLine orbitRadius={98} />
          </group>

          {/* Kuiper Belt */}
          <Belt
            innerRadius={110}
            outerRadius={140}
            count={10000}
            color="lightblue"
            rotationSpeed={0.0005} // Rotation speed around the Sun
          />

          {/* Close-Passing Asteroid with Tilted Axis */}
          <group rotation={[0, 0, Math.PI / 16]}> {/* Tilt the axis */}
            <Asteroid
              orbitRadius={30} // Orbit radius just outside Earth's orbit
              speed={0.0295 * planetSpeed} // Speed of orbit
              size={0.07} // Size of the asteroid
              paused={paused}
            />
            <OrbitLine orbitRadius={30} /> {/* Titled Orbit line for Asteroid */}
            <Text position={[30, 0.5, 0]} fontSize={0.5} color="white">
              2024 RZ2
            </Text>
          </group>

          <Stars />

          {/* Orbit Controls */}
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            zoomSpeed={1.0} // Adjust zoom speed here
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SolarSystem;