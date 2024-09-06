'use client';

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import CryptoJS from 'crypto-js';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

Modal.setAppElement('#__next'); // Set the app element for accessibility

const Nav: React.FC = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve user from localStorage on initial render
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const { username } = JSON.parse(storedUser);
      setUser(username);
    }
  }, []);

  const handleLogin = (username: string, password: string) => {
    const user = localStorage.getItem('user');
    if (user) {
      const { username: storedUsername, password: storedPassword } = JSON.parse(user);
      const decryptedPassword = CryptoJS.AES.decrypt(storedPassword, 'secret-key').toString(CryptoJS.enc.Utf8);

      if (username === storedUsername && password === decryptedPassword) {
        setUser(username);
        localStorage.setItem('loggedInUser', username); // Store logged-in user
        return true; // Login successful
      }
    }
    return false; // Login failed
  };

  const handleSignup = (username: string, password: string) => {
    const existingUser = localStorage.getItem('user');
    if (existingUser) {
      const { username: existingUsername } = JSON.parse(existingUser);
      if (username === existingUsername) {
        return false; // Username already exists
      }
    }

    const encryptedPassword = CryptoJS.AES.encrypt(password, 'secret-key').toString();
    localStorage.setItem('user', JSON.stringify({ username, password: encryptedPassword }));
    setUser(username);
    localStorage.setItem('loggedInUser', username); // Store logged-in user
    return true; // Signup successful
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  return (
    <div>
      <div className="flex mx-10 py-5 justify-between bg-transparent">
        <div>Astro Nexus</div>
        <div className="flex space-x-5">
          {user ? (
            <div className="flex items-center space-x-3">
              <span>Logged in as {user}</span>
              <button
                onClick={handleLogout}
                className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <div
                className="cursor-pointer"
                onClick={() => setLoginModalOpen(true)}
              >
                Login
              </div>
              <div
                className="cursor-pointer"
                onClick={() => setSignupModalOpen(true)}
              >
                Sign Up
              </div>
            </>
          )}
        </div>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onRequestClose={() => setLoginModalOpen(false)}
        onLogin={(username, password) => {
          if (handleLogin(username, password)) {
            setLoginModalOpen(false);
          } else {
            alert('Invalid username or password');
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
            alert('Username already exists');
          }
        }}
      />
    </div>
  );
};

export default Nav;
