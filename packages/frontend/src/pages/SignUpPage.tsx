import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/authService';
import logo from '../assets/logo.svg';
import eyeOpen from '../assets/eye.svg';
import eyeOff from '../assets/eyeoff.svg';
import checkIcon from '../assets/check.svg';

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '', // Added missing field
    password: '',
    confirmPassword: ''
  });

  const isFormValid =
    formData.username.trim() !== '' &&
    formData.fullName.trim() !== '' &&
    formData.password.trim() !== '' &&
    formData.confirmPassword.trim() !== '' &&
    formData.password === formData.confirmPassword;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const result = await registerUser(formData.username, formData.password, formData.fullName);

      if (result.success) {
        alert('Registration successful! Redirecting to Login page.');
        navigate('/login');
      } else {
        setError(result.message || 'Registration failed.');
      }
    } catch (err: unknown) {
      const errorMessage = (err as { message?: string })?.message || 'Cannot connect to server.';
      setError(errorMessage);
    }
  };

  return (
    <div className="flex w-full min-h-screen flex-col items-center justify-center bg-[#000A26] font-sans">
      {/* Logo Section */}
      <div className="flex items-center py-[25px]">
        <img src={logo} alt="DevLingo" className="w-[87px] h-[71px]" />
        <h1 className="text-5xl font-bold text-[#E5E7EB] tracking-wide pl-[34px]">DevLingo</h1>
      </div>

      {/* Form Container */}
      <div className="bg-white p-12 rounded-lg shadow-2xl w-[460px] flex flex-col items-center">
        <h2 className="text-[#3B82F6] text-5xl font-bold text-center pb-[20px]">Sign up</h2>

        {error && (
          <div className="bg-[#FFB3B3] text-[#D00000] p-3 rounded-md mb-6 w-full flex items-center text-sm">
            <span className="mr-2">⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          {/* Username Input */}
          <div>
            <label className="block text-left text-sm font-medium mb-1">Username</label>
            <input
              type="text" name="username"
              className="w-full p-3 bg-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.username} onChange={handleChange} required
              placeholder="username_123"
            />
          </div>

          {/* Full Name Input - Added to match Backend requirements */}
          <div>
            <label className="block text-left text-sm font-medium mb-1">Full Name</label>
            <input
              type="text" name="fullName"
              className="w-full p-3 bg-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.fullName} onChange={handleChange} required
              placeholder="John Doe"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label className="block text-left text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'} name="password"
                className="w-full p-3 bg-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.password} onChange={handleChange} required
                placeholder="**********"
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

          {/* Confirm Password Input */}
          <div className="relative">
            <label className="block text-left text-sm font-medium mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword"
                className="w-full p-3 bg-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.confirmPassword} onChange={handleChange} required
                placeholder="**********"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                {formData.confirmPassword.length > 0 && formData.confirmPassword === formData.password && (
                  <img
                    src={checkIcon}
                    alt="matched"
                    className="w-[21px] h-[21px] object-contain"
                  />
                )}
                <button
                  type="button"
                  className="flex items-center justify-center focus:outline-none text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <img
                    src={showConfirmPassword ? eyeOpen : eyeOff}
                    alt="toggle password"
                    className="object-contain"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-3 font-bold rounded-md transition-all mt-6 ${isFormValid
              ? "bg-[#3B82F6] hover:bg-[#0040CD] text-white cursor-pointer"
              : "bg-[#8F8E8E] cursor-not-allowed"
              }`}
          >
            Sign up
          </button>

          <p className="text-center text-sm mt-6">
            Already have an account? <Link to="/login" className="text-[#3B82F6] font-semibold hover:underline">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;