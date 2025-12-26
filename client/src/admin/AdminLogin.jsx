import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await api.post('/auth/login', credentials);
      
      if (response.data.success) {
        // Store auth token in localStorage
        localStorage.setItem('adminToken', response.data.token);
        navigate('/admin/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Login failed');
      } else {
        setError('Network error. Please try again.');
      }
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  return (
    <div className="min-h-screen bg-gym-darker flex items-center justify-center p-4">
      {/* Back to Home Button */}
      <Link 
        to="/" 
        className="fixed top-6 left-6 flex items-center gap-2 text-gym-light hover:text-gym-accent transition-colors group z-10"
      >
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="font-medium">Back to Home</span>
      </Link>

      <div className="card w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gym-accent/10 rounded-full mb-4">
            <svg className="w-8 h-8 text-gym-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gym-light">Admin Login</h2>
          <p className="text-gym-light/60 mt-2">Access your dashboard</p>
        </div>
        
        {error && (
          <div className="bg-red-900 text-red-100 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gym-light mb-2">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gym-gray text-gym-light rounded-lg border border-gym-accent focus:outline-none focus:ring-2 focus:ring-gym-accent"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-gym-light mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gym-gray text-gym-light rounded-lg border border-gym-accent focus:outline-none focus:ring-2 focus:ring-gym-accent"
              required
            />
          </div>
          
          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            Login
          </button>

          <div className="text-center mt-4">
            <Link 
              to="/" 
              className="text-gym-light/70 hover:text-gym-accent transition-colors text-sm"
            >
              ← Return to Website
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;