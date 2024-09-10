"use client";

import React, { useState } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import Link from "next/link";
import SolarSystem from "../components/SolarSystem";
import { ScrollArea } from "@/components/ui/scroll-area";



const Banner: React.FC = () => {
  return (
    <div className="relative h-48 w-full max-w-5xl rounded-xl my-10 mx-auto px-4">
      <div
        className="absolute inset-0 bg-cover bg-center rounded-xl"
        style={{ backgroundImage: "url('/assets/Space_Race_Classroom_Banner.png')" }}
      >
        <div className="absolute inset-0 bg-blue-950 blur-2xl bg-opacity-60 rounded-xl"></div>
      </div>
      <div className="relative flex flex-col md:flex-row items-center pt-4 md:pb-0 justify-between px-4 md:px-6 h-full">
        <div className="flex-1 text-center pb-6 md:text-left">
          <h1 className="text-4xl   text-white mb-2 ">
          Embark on an epic adventure with our latest game,
          </h1>
          <h2 className="text-xl md:text-2xl -my-1 md:-my-3 font-bold text-white mb-4">
            <span className="text-white pr-1 md:pr-2">Astro Explorer</span>
          </h2>
        </div>
        <div className="flex-none  md:pb-4 pb-4 md:mt-0">
          <Link href="#">
            <Button />
          </Link>
        </div>
      </div>
    </div>
  );
};

const Button: React.FC = () => {
  return (
    <button className="relative bg-white bg-opacity-20 border border-white rounded-3xl text-white py-2 px-6 shadow-lg ring-1 ring-white ring-opacity-50 hover:ring-opacity-100 transition duration-300">
      <span className="relative z-10">Get Started</span>
    </button>
  );
};




const Home: React.FC = () => {
  const [isAsteroidModalOpen, setAsteroidModalOpen] = useState(false);
  const [isNewModalOpen, setNewModalOpen] = useState(false);

  return (
    <div className="m-0 p-0 overflow-hidden w-[100%] h-[100%]" id="__next">
      <main className="">
        <div className="">
          <SolarSystem />

          <motion.div
            className="w-[100%] flex flex-col"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            {/* Hazardous Asteroids Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              <h1 className="text-7xl text-white text-center mt-10">ASTRONEXUS</h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{
                type: "spring",
                stiffness: 160,
                damping: 20,
                delay: 0.2,
              }}
            >
              <p className="text-center">Your Gateway to Solar System Knowledge</p>
            </motion.div>
            <div className="flex justify-between gap-10 h-[100%] w-[100%] items-center mt-20 px-20">
              <motion.div
                className="flex flex-col justify-between h-[19rem] w-96 bg-gray-900 bg-opacity-50 p-5 rounded-sm ring-slate-700 border border-gray-600"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="text-white">
                  <h1 className="text-3xl pb-2">Hazardous Asteroids</h1>
                  <p>
                    Hazardous asteroids, or Potentially Hazardous Asteroids
                    (PHAs), are space objects that come close enough to Earth to
                    pose a potential risk of collision. These asteroids are
                    typically defined by their proximity to Earth and their
                    size, with the potential to cause significant damage if they
                    were to impact the planet.
                  </p>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => setAsteroidModalOpen(true)}
                    className="bg-white text-gray-900 px-2 rounded-md"
                  >
                    Learn more
                  </button>
                </div>
              </motion.div>

              {/* 3D Live Solar System Card */}
              <motion.div
                className="flex flex-col justify-between h-[19rem] w-96 bg-gray-900 bg-opacity-50 p-5 rounded-sm ring-slate-700 border border-gray-600"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-white">
                  <h1 className="text-3xl pb-2">Solar System</h1>
                  <p>
                    The Solar System is a collection of celestial bodies,
                    including the Sun, eight planets, their moons, and various
                    smaller objects such as asteroids, comets, and dwarf
                    planets, all bound together by the Sun&apos;s gravitational
                    pull. The planets are divided into two categories: the inner
                    terrestrial planets (Mercury, Venus, Earth, and Mars) and
                    the outer gas giants (Jupiter, Saturn, Uranus, and Neptune).
                  </p>
                </div>
                <div className="mt-6">
                  <Link href="/solar-system">
                    <button className="bg-white text-gray-900 px-2 rounded-md">
                      3D Solar System
                    </button>
                  </Link>
                </div>
              </motion.div>

              {/* Satellite Explorer Card */}
              <motion.div
                className="flex flex-col justify-between h-[19rem] w-96 bg-gray-900 bg-opacity-50 p-5 rounded-sm ring-slate-700 border border-gray-600"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-white">
                  <h1 className="text-3xl pb-2">Satellite</h1>
                  <p>
                    A satellite is an object that orbits around a larger
                    celestial body, like a planet or star, due to the
                    gravitational pull of that body. Satellites can be natural,
                    like the Moon orbiting Earth, or artificial, like the
                    man-made objects launched into space to perform various
                    tasks. Today, thousands of satellites orbit Earth, playing a
                    critical role in modern life.
                  </p>
                </div>
                <div className="mt-6">
                  <Link href="/neo">
                    <button className="bg-white text-gray-900 px-2 rounded-md">
                      Satellite Explorer
                    </button>
                  </Link>
                </div>

          
              </motion.div>
            </div><Banner/>
          </motion.div>

          {/* Asteroid Modal */}
          <Modal
            isOpen={isAsteroidModalOpen}
            onRequestClose={() => setAsteroidModalOpen(false)}
            className="flex justify-center items-center min-h-screen bg-black bg-opacity-60"
            overlayClassName="fixed inset-0 bg-black bg-opacity-70 z-50"
          >
            <motion.div
              className="bg-black bg-opacity-80 h-[85vh] w-[85vw] space-y-4 p-10 rounded-lg shadow-lg text-center overflow-hidden"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              {/* Sliding in text from the left using Framer Motion */}
              <motion.h2
                className="text-3xl font-bold mb-6 text-white"
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
              >
                Hazardous Asteroids
              </motion.h2>

              {/* Scrollable asteroid list with animations for each item */}
              <ScrollArea className="h-[65vh] w-full">
                <div className="space-y-4">
                  <div className="flex justify-between bg-gray-800 text-white py-2 px-4 rounded-t-xl">
                    <div className="w-1/3 font-bold">Name</div>
                    <div className="w-1/3 font-bold">Diameter</div>
                    <div className="w-1/3 font-bold">Date of Impact/Pass</div>
                  </div>
                  {[
                    { name: "2024 RZ2", diameter: "7 m", date: "2024-09-04" },
                    { name: "2024 RL3", diameter: "6m", date: "2024-10-04" },
                    { name: "2024 RR3", diameter: "1.5 km", date: "2024-11-20" },
                    { name: "2018 QE", diameter: "0.5 km", date: "2024-12-05" },
                    { name: "2024 RN1", diameter: "1.0 km", date: "2024-12-25" },
                    { name: "2024 RN3", diameter: "0.9 km", date: "2025-01-10" },
                    { name: "2024 RF3", diameter: "1.3 km", date: "2025-02-15" },
                    { name: "2024 RQ", diameter: "0.7 km", date: "2025-03-05" },
                    { name: "2024 ON", diameter: "1.1 km", date: "2025-04-20" },
                    { name: "2024 RO2", diameter: "0.6 km", date: "2025-05-15" },
                    { name: "2016 VA", diameter: "1.4 km", date: "2025-06-10" },
                    { name: "2024 RQ5", diameter: "0.8 km", date: "2025-07-25" },
                  ].map((asteroid, index) => (
                    <motion.div
                      key={asteroid.name}
                      className="hover:bg-white bg-opacity-60 hover:text-black cursor-pointer rounded-xl py-4 text-lg text-white"
                      onClick={() => {
                        setAsteroidModalOpen(false);
                        if (asteroid.name === "2024 RZ2") {
                          setNewModalOpen(true);
                        }
                      }}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <div className="flex justify-between px-4">
                        <div className="w-1/3">{asteroid.name}</div>
                        <div className="w-1/3">{asteroid.diameter}</div>
                        <div className="w-1/3">{asteroid.date}</div>
                      </div>
                      <hr className="border-white mt-2" />
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>

              <motion.button
                onClick={() => setAsteroidModalOpen(false)}
                className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition mt-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Close
              </motion.button>
            </motion.div>
          </Modal>

          {/* New Modal */}
          <Modal
            isOpen={isNewModalOpen}
            onRequestClose={() => setNewModalOpen(false)}
            className="flex justify-center items-center min-h-screen bg-black bg-opacity-40"
            overlayClassName="fixed inset-0 bg-black bg-opacity-70 z-50 transition-opacity duration-300"
          >
            <motion.div
              className="bg-black bg-opacity-80 h-[85vh] w-[85vw] p-10 rounded-lg shadow-2xl overflow-hidden relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              <motion.h2
                className="text-4xl font-extrabold text-white mb-8"
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
              >
                2024 RZ2
              </motion.h2>

              <motion.div
                className="bg-black bg-opacity-70 rounded-lg p-6 mx-10 space-y-6 text-white"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
              >
                <p className="max-w-3xl text-lg leading-relaxed">
                  Asteroid (NEO) 2024 RZ2 is in the constellation of Pegasus, at a
                  distance of <strong>2,609,338.3 kilometers</strong> from Earth.
                  The current Right Ascension is <strong>00h 05m 15s</strong> and
                  the Declination is <strong>+18° 02’ 06”</strong> (apparent coordinates).
                  The magnitude of Asteroid (NEO) 2024 RZ2 is <strong>21.02</strong>
                  (data provided by JPL Horizons).
                </p>
                <p className="max-w-3xl text-lg leading-relaxed">
                  The estimated diameter of Asteroid (NEO) 2024 RZ2 is <strong>7 meters</strong>.
                  The orbit of Asteroid (NEO) 2024 RZ2 was calculated using the
                  observations made at the Astronomical Observatory of the University of
                  Valencia, Spain.
                </p>
                <Link href="/hneo">
                  <div className="py-3">
                    <motion.button
                      className="px-5 py-2 bg-gray-900 text-white rounded-full shadow-md hover:bg-gray-700 transition"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      Live Movement
                    </motion.button>
                  </div>
                </Link>
              </motion.div>

              <motion.div className="flex justify-end mt-6">
                <motion.button
                  onClick={() => setNewModalOpen(false)}
                  className="px-6 py-3 bg-gray-900 text-white rounded-lg shadow-lg hover:bg-gray-700 transition"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Close
                </motion.button>
              </motion.div>
            </motion.div>
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default Home;
