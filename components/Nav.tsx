"use client";

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import CryptoJS from "crypto-js";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

Modal.setAppElement("#__next");

const Nav: React.FC = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);
  const [isMenuModalOpen, setMenuModalOpen] = useState(false);
  const [isAsteroidModalOpen, setAsteroidModalOpen] = useState(false);
  const [isNewModalOpen, setNewModalOpen] = useState(false); // State for the new modal
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { username } = JSON.parse(storedUser);
      setUser(username);
    }
  }, []);

  const handleLogin = (username: string, password: string) => {
    const user = localStorage.getItem("user");
    if (user) {
      const { username: storedUsername, password: storedPassword } =
        JSON.parse(user);
      const decryptedPassword = CryptoJS.AES.decrypt(
        storedPassword,
        "secret-key"
      ).toString(CryptoJS.enc.Utf8);

      if (username === storedUsername && password === decryptedPassword) {
        setUser(username);
        localStorage.setItem("loggedInUser", username);
        return true;
      }
    }
    return false;
  };

  const handleSignup = (username: string, password: string) => {
    const existingUser = localStorage.getItem("user");
    if (existingUser) {
      const { username: existingUsername } = JSON.parse(existingUser);
      if (username === existingUsername) {
        return false;
      }
    }

    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      "secret-key"
    ).toString();
    localStorage.setItem(
      "user",
      JSON.stringify({ username, password: encryptedPassword })
    );
    setUser(username);
    localStorage.setItem("loggedInUser", username);
    return true;
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <div className="bg-cover bg-center bg-no-repeat">
      <div className="flex mx-10 py-5 justify-between">
        <div>
          <Image src={"/assets/logo.png"} width={150} height={30} alt="logo" />
        </div>
        {user ? (
          <div
            className="font-bold text-white cursor-pointer"
            onClick={() => setMenuModalOpen(true)}
          >
            MENU
          </div>
        ) : (
          <></>
        )}
        <div className="flex space-x-5">
          {user ? (
            <div className="flex items-center space-x-3 text-white">
              <span>Logged in as {user}</span>
              <button
                onClick={handleLogout}
                className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/50 transition duration-300 ease-in-out"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <div
                className="cursor-pointer text-white hover:text-blue-400 transition duration-300 ease-in-out"
                onClick={() => setLoginModalOpen(true)}
              >
                Login
              </div>
              <div
                className="cursor-pointer text-white hover:text-green-400 transition duration-300 ease-in-out"
                onClick={() => setSignupModalOpen(true)}
              >
                Sign Up
              </div>
            </>
          )}
        </div>
      </div>

      <Modal
        isOpen={isMenuModalOpen}
        onRequestClose={() => setMenuModalOpen(false)}
        className="flex justify-center pr-[510px] pt-[650px] items-center min-h-screen bg-black bg-opacity-10"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
      >
        <motion.div
          className="bg-transparent p-10 rounded-lg w-full max-w-4xl grid grid-cols-3 gap-[500px] mb-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          {/* Hazardous Asteroids Card */}
          <motion.div
            className="relative h-56 w-72 bg-black bg-opacity-60 flex justify-center items-center ring-1 rounded-xl ring-slate-700 cursor-pointer"
            onClick={() => setAsteroidModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="absolute text-white">Hazardous Asteroids</div>
          </motion.div>

          {/* 3D Live Solar System Card */}
          <Link href="/solar-system">
            <motion.div
              className="relative h-56 w-72 bg-black bg-opacity-60 flex justify-center items-center ring-1 rounded-xl ring-slate-700 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="absolute text-white">3D Live Solar System</div>
            </motion.div>
          </Link>

          {/* NEO Explorer Card */}
          <Link href="/neo">
            <motion.div
              className="relative h-56 w-72 bg-black bg-opacity-60 flex justify-center items-center ring-1 rounded-xl ring-slate-700 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="absolute text-white">NEO Explorer</div>
            </motion.div>
          </Link>
        </motion.div>
      </Modal>

      {/* Asteroid Modal */}
      <Modal
        isOpen={isAsteroidModalOpen}
        onRequestClose={() => setAsteroidModalOpen(false)}
        className="flex justify-center items-center min-h-screen"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
      >
        <motion.div
          className="bg-black bg-opacity-30 h-[85vh] w-[85vw] space-y-4 p-10 rounded-lg shadow-lg text-center overflow-hidden"
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
              {[
                "2024 RZ2",
                "2024 RL3",
                "2024 RR3",
                "2018 QE",
                "2024 RN1",
                "2024 RN3",
                "2024 RF3",
                "2024 RQ",
                "2024 ON",
                "2024 RO2",
                "2016 VA",
                "2024 RQ5",
              ].map((asteroid, index) => (
                <motion.div
                  key={asteroid}
                  className="hover:bg-white bg-opacity-60 hover:text-black cursor-pointer rounded-xl py-4 text-lg text-white"
                  onClick={() => {
                    setAsteroidModalOpen(false);
                    setNewModalOpen(true);
                  }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  {asteroid}
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
        className="flex justify-center items-center min-h-screen"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 z-50 transition-opacity duration-300"
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
              distance of
              <strong> 2,609,338.3 kilometers</strong> from Earth. The current
              Right Ascension is <strong>00h 05m 15s</strong> and the
              Declination is <strong>+18° 02’ 06”</strong>
              (apparent coordinates). The magnitude of Asteroid (NEO) 2024 RZ2
              is
              <strong>21.02</strong> (data provided by JPL Horizons).
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

      <LoginModal
        isOpen={isLoginModalOpen}
        onRequestClose={() => setLoginModalOpen(false)}
        onLogin={(username, password) => {
          if (handleLogin(username, password)) {
            setLoginModalOpen(false);
          } else {
            alert("Invalid username or password");
          }
        }}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        onRequestClose={() => setSignupModalOpen(false)}
        onSignup={(username, password) => {
          if (handleSignup(username, password)) {
            setSignupModalOpen(false);
          } else {
            alert("Username already exists");
          }
        }}
      />
    </div>
  );
};

export default Nav;
