'use client';

import React, { useState } from 'react';
import Modal from 'react-modal';
import CryptoJS from 'crypto-js';


interface LoginModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onLogin: (username: string, password: string) => void; // Update to expect two arguments
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onRequestClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const user = localStorage.getItem('user');
    if (user) {
      const { username: storedUsername, password: storedPassword } = JSON.parse(user);
      const decryptedPassword = CryptoJS.AES.decrypt(storedPassword, 'secret-key').toString(CryptoJS.enc.Utf8);

      if (username === storedUsername && password === decryptedPassword) {
        onLogin(username, password); // Pass both username and password
        onRequestClose();
      } else {
        setError('Invalid username or password');
      }
    } else {
      setError('User not found');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Login Modal"
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="relative border-2 border-gray-400 backdrop-blur-sm bg-black/40 p-8 rounded-lg shadow-lg max-w-sm w-full">
        <button
          onClick={onRequestClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
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

        <h2 className="text-xl font-semibold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
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
            Login
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default LoginModal;
