// AnimatedLoginPage.jsx
import React, { useState } from 'react';
import './Login.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AnimatedLoginPage({ role = 'Admin' }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || 'Login failed');
      } else {
        toast.success('Login successful!');
        localStorage.setItem('token', data.token); // optional
        setTimeout(() => {
          navigate('/admindashboard'); // Redirect after short delay
        }, 1500);
      }
    } catch (err) {
      toast.error('Server error. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />

      <motion.div
        className="login-left"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1>
          Hello!<br />
          <span>Have a</span><br />
          <strong>GREAT DAY</strong>
        </h1>
      </motion.div>

      <motion.div
        className="login-right"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2>Login as {role}</h2>
        <form onSubmit={handleSubmit}>
          <motion.input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            whileFocus={{ scale: 1.02 }}
            required
            autoComplete="off" // prevents browser from auto-filling
          />
          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            whileFocus={{ scale: 1.02 }}
            required
            autoComplete="off"
          />
          <div className="login-actions">
            <a href="/forgot-password">Forgot password?</a>
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </form>

        <p className="create-account">
          Don't have an account? <a href="/register">Create an account</a>
        </p>
      </motion.div>
    </div>
  );
}
