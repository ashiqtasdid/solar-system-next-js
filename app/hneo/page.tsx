  "use client";

  import { Canvas, useLoader } from "@react-three/fiber";
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
  import sunTexture from "@/components/sunmap.jpg";
  import { TextureLoader } from "three";
import { StaticImageData } from "next/image";

  const SolarSystem = () => {
    const moonSpeed: number = 250;
    const planetSpeed: number = 50;
    const router = useRouter();

    const [paused, setPaused] = useState(false);

    // Effect to set paused to true after 5 seconds
    useEffect(() => {
      const timer = setTimeout(() => {
        setPaused(true);
      }, 1000);

      return () => clearTimeout(timer);
    }, []);

    const handleBackClick = () => {
      router.back(); // Navigate back to the previous page
    };
    const texture = useLoader(
      TextureLoader,
      typeof sunTexture === "string"
        ? sunTexture
        : (sunTexture as StaticImageData)?.src
    );

    return (
      <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
        <Canvas
          camera={{ position: [8, 1, 35], fov: 50 }}
          style={{ width: "100%", height: "100%" }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[0, 0, 0]} intensity={2} />

            <mesh>
          <sphereGeometry args={[5, 32, 32]} />
          <meshStandardMaterial
            map={texture || undefined}
            color={!texture ? "yellow" : undefined}
          />
        </mesh>
            <Text position={[0, 6, 0]} fontSize={1} color="white">
              Sun
            </Text>

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
                <group>
                  <Moon
                    color="gray"
                    size={0.25}
                    distance={3}
                    speed={0.01 * moonSpeed}
                    planetRadius={1}
                    paused={paused}
                  />
                  <OrbitLine orbitRadius={3} />
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
                <group>
                  <Moon
                    color="gray"
                    size={0.1}
                    distance={1.5}
                    speed={0.015 * moonSpeed}
                    planetRadius={0.75}
                    paused={paused}
                  />
                  <Moon
                    color="gray"
                    size={0.08}
                    distance={2.5}
                    speed={0.01}
                    planetRadius={0.75}
                    paused={paused}
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

            <group>
              <Planet
                textureUrl={jupiterTexture}
                size={2.0}
                speed={0.003 * planetSpeed}
                orbitRadius={68}
                rotationSpeed={0.02}
                paused={paused}
              >
                <group>
                  <Moon
                    color="gray"
                    size={0.3}
                    distance={5}
                    speed={0.007 * moonSpeed}
                    planetRadius={2}
                    paused={paused}
                  />
                  <Moon
                    color="gray"
                    size={0.25}
                    distance={7}
                    speed={0.005 * moonSpeed}
                    planetRadius={2}
                    paused={paused}
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

            <group>
              <Planet
                textureUrl={saturnTexture}
                size={1.7}
                speed={0.002 * planetSpeed}
                orbitRadius={78}
                rotationSpeed={0.01}
                paused={paused}
              >
                <group>
                  <Moon
                    color="gray"
                    size={0.4}
                    distance={6}
                    speed={0.005 * moonSpeed}
                    planetRadius={1.7}
                    paused={paused}
                  />
                  <Moon
                    color="gray"
                    size={0.2}
                    distance={8}
                    speed={0.003 * moonSpeed}
                    planetRadius={1.7}
                    paused={paused}
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

            <group>
              <Planet
                textureUrl={uranusTexture}
                size={1.4}
                speed={0.0015 * planetSpeed}
                orbitRadius={88}
                rotationSpeed={0.002}
                paused={paused}
              >
                <group>
                  <Moon
                    color="gray"
                    size={0.25}
                    distance={4}
                    speed={0.005 * moonSpeed}
                    planetRadius={1.4}
                    paused={paused}
                  />
                  <Moon
                    color="gray"
                    size={0.2}
                    distance={6}
                    speed={0.003 * moonSpeed}
                    planetRadius={1.4}
                    paused={paused}
                  />
                  <OrbitLine orbitRadius={4} />
                  <OrbitLine orbitRadius={6} />
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
                <group>
                  <Moon
                    color="gray"
                    size={0.3}
                    distance={5}
                    speed={0.007 * moonSpeed}
                    planetRadius={1.3}
                    paused={paused}
                  />
                  <OrbitLine orbitRadius={5} />
                </group>
              </Planet>
              <Text position={[98, 1, 0]} fontSize={0.5} color="white">
                Neptune
              </Text>
              <OrbitLine orbitRadius={98} />
            </group>

            <Belt
              innerRadius={110}
              outerRadius={140}
              count={10000}
              color="lightblue"
              rotationSpeed={0.0005}
            />

            <group rotation={[0, 0, Math.PI / 16]}>
              <Asteroid
                orbitRadius={30}
                speed={0.0295 * planetSpeed}
                size={0.07}
                paused={paused}
              />
              <OrbitLine orbitRadius={30} />
              <Text position={[30, 0.5, 0]} fontSize={0.5} color="white">
                2024 RZ2
              </Text>
            </group>

            <Stars />

            <OrbitControls
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              zoomSpeed={1.0}
            />
          </Suspense>
        </Canvas>
        <div className="pt-20">
          <button
            onClick={handleBackClick}
            className="absolute top-4 left-4 px-8 font-semibold text-2xl py-2 bg-white text-black rounded-lg shadow-md"
          >
            Back
          </button>
        </div>
      </div>
    );
  };

  export default SolarSystem;
