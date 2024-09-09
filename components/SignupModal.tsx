'use client';

import React, { useState } from 'react';
import Modal from 'react-modal';
import CryptoJS from 'crypto-js';


interface SignupModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSignup: (username: string, password: string) => void; // Update to expect two arguments
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onRequestClose, onSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = () => {
    const user = localStorage.getItem('user');
    if (user) {
      const { username: existingUsername } = JSON.parse(user);
      if (username === existingUsername) {
        setError('Username already exists');
        return;
      }
    }

    const encryptedPassword = CryptoJS.AES.encrypt(password, 'secret-key').toString();
    localStorage.setItem('user', JSON.stringify({ username, password: encryptedPassword }));
    onSignup(username, password); // Pass both username and password
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Signup Modal"
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="relative bg-black bg-opacity-30 p-8 rounded-lg shadow-lg max-w-sm w-full">
        {/* Close Icon */}
        <button
          onClick={onRequestClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-200"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
        >
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border bg-black border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border bg-black border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default SignupModal;
