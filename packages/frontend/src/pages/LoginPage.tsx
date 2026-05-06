import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/authService';
import logo from '../assets/logo.svg';
import eyeOpen from '../assets/eye.svg';
import eyeOff from '../assets/eyeoff.svg';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isFormValid = username.length > 0 && password.length > 0;
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const result = await loginUser(username, password);

      if (result.success) {
        localStorage.setItem('token', result.data.token);
        navigate('/dashboard');
      } else {
        setError(result.message || 'Wrong username or password.');
      }
    } catch (err: unknown) {
      const errorMessage = (err as { message?: string })?.message || 'Internal server error. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div className="flex w-full min-h-screen overflow-hidden font-sans">
      {/* Left Side - Logo Section */}
      <div className="w-3/5 bg-[#000A26] flex flex-col items-center justify-center text-white">
        <img src={logo} alt="DevLingo Logo" className="w-[177px] h-[143px] mb-4" />
        <h1 className="text-5xl font-bold tracking-tight">DevLingo</h1>
      </div>

      {/* Right Side - Form Section */}
      <div className="w-2/5 bg-white flex flex-col items-center justify-center relative">
        <div className="w-[400px]">
          <h2 className="text-[#3B82F6] text-4xl font-bold text-center mb-8">Log in</h2>

          {/* Error Message Banner */}
          {error && (
            <div className="bg-[#FFB3B3] text-[#D00000] p-3 rounded-md mb-4 flex items-center text-sm">
              <span className="mr-2">⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                className="w-full p-3 bg-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username_123"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-left text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full p-3 bg-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="**********"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <img src={showPassword ? eyeOpen : eyeOff} alt="toggle password" />
                </button>
              </div>
            </div>

            <div className="text-right">
              <a href="#" className="text-blue-600 text-xs hover:underline">I forgot my password</a>
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full text-white py-3 rounded-lg font-bold text-lg shadow-md transition-all active:scale-[0.98]
                ${isFormValid
                  ? 'bg-[#2563EB] border-1 border-[#639EFF] cursor-pointer'
                  : 'bg-gray-400 cursor-not-allowed'
                }`}
            >
              Log in
            </button>

            <p className="text-center text-sm mt-4">
              Don't you have an account? <Link to="/signup" className="text-blue-600 font-semibold hover:underline">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;