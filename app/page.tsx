"use client";

import React from 'react';

import SolarSystem from '../components/SolarSystem';
import Nav from '../components/Nav';

import { motion } from "framer-motion";
import Link from 'next/link';
import { ScrollArea } from "@/components/ui/scroll-area";

const Home: React.FC = () => {
  return (
    <div className="m-0 p-0 overflow-hidden w-screen h-screen" id='__next'>
      <Nav />

      <main className="">
        <div className="">
          <SolarSystem />



          <motion.div
            className='w-[100%] flex flex-col '
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
              <h1 className='text-7xl text-white text-center mt-10' >ASTRONEXUS</h1>
            </motion.div><motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 160, damping: 20, delay: .2 }}
            >
              <p className='text-center'>Your Gateway to Solar System Knowledge</p>
            </motion.div>
            <div className='flex justify-between gap-10 h-[100%] w-[100%] items-center mt-32 px-20'>

            <motion.div
                  className="flex flex-col justify-between h-[20rem] w-96 bg-gray-900 bg-opacity-50 p-5 rounded-sm ring-slate-700  border border-gray-600"
                  
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className=" text-white">
                    <h1 className='text-3xl pb-2'>Hazardous Asteroids</h1>
                    <p>Hazardous asteroids, or Potentially Hazardous Asteroids (PHAs), are space objects that come close enough to Earth to pose a potential risk of collision. These asteroids are typically defined by their proximity to Earth and their size, with the potential to cause significant damage if they were to impact the planet.  </p>
                    </div>
                    <div className='mt-6 '>
                      <Link href="#"> <button className='bg-white text-gray-900 px-2 rounded-md'>Learn more</button></Link>
                    </div>
                  

                </motion.div>

              {/* 3D Live Solar System Card */}
              
                <motion.div
                  className="flex flex-col justify-between h-[20rem] w-96 bg-gray-900 bg-opacity-50 p-5 rounded-sm ring-slate-700  border border-gray-600"
                  
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className=" text-white">
                    <h1 className='text-3xl pb-2'>Solar System</h1>
                    <p>The Solar System is a collection of celestial bodies, including the Sun, eight planets, their moons, and various smaller objects such as asteroids, comets, and dwarf planets, all bound together by the Sun's gravitational pull.The planets are divided into two categories: the inner terrestrial planets (Mercury, Venus, Earth, and Mars) and the outer gas giants (Jupiter, Saturn, Uranus, and Neptune). </p>
                    </div>
                    <div className='mt-6 '>
                      <Link href="/solar-system"> <button className='bg-white text-gray-900 px-2 rounded-md'>3D Solar System</button></Link>
                    </div>
                  

                </motion.div>
              


              {/* NEO Explorer Card */}

                <motion.div
                  className="flex flex-col justify-between h-[20rem] w-96 bg-gray-900 bg-opacity-50 p-5 rounded-sm ring-slate-700  border border-gray-600"
                  
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className=" text-white">
                    <h1 className='text-3xl pb-2'>Satellite</h1>
                    <p>A satellite is an object that orbits around a larger celestial body, like a planet or star, due to the gravitational pull of that body. Satellites can be natural, like the Moon orbiting Earth, or artificial, like the man-made objects launched into space to perform various tasks. Today, thousands of satellites orbit Earth, playing a critical role in modern life. </p>
                    </div>
                    <div className='mt-6 '>
                      <Link href="/neo"> <button className='bg-white text-gray-900 px-2 rounded-md'>Satellite Explorer</button></Link>
                    </div>
                </motion.div>
            </div>
          </motion.div>


        </div>
      </main>
    </div>
  );
};

export default Home;
