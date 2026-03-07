import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });
  const isFormValid =
    formData.username.trim() !== '' &&
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
      setError('Mật khẩu xác nhận không khớp!');
      return;
    }

    try {
      // Backend của ông đang dùng SQLite
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password, // Frontend gửi 'password'
          fullName: formData.username
        }),
      });

      if (response.ok) {
        alert('Đăng ký thành công! Đang chuyển đến trang Login.');
        navigate('/login');
      } else {
        const data = await response.json();
        setError(data.message || 'Đăng ký thất bại.');
      }
    } catch (err) {
      setError('Không thể kết nối đến server.');
    }
  };

  return (
    // Nền xanh đậm toàn trang (#000A26)
    <div className="flex w-full min-h-screen flex-col items-center justify-center bg-[#000A26] font-sans">

      {/* Devlingo Logo */}
      <div className="flex items-center py-[25px]">
        <img src="src/assets/logo.svg" alt="DevLingo" className="w-[87px] h-[71px]" />
        <h1 className="text-5xl font-bold text-[#E5E7EB] tracking-wide pl-[34px]">DevLingo</h1>
      </div>

      {/* Khung trắng bo góc chứa form */}
      <div className="bg-white p-12 rounded-lg shadow-2xl w-[460px] flex flex-col items-center">

        {/* "Sign up" */}
        <h2 className="text-[#3B82F6] text-5xl font-bold text-center pb-[20px]">Sign up</h2>

        {error && (
          <div className="bg-[#FFB3B3] text-[#D00000] p-3 rounded-md mb-6 w-full flex items-center text-sm">
            <span className="mr-2">⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 w-full">

          {/* Input Username - p-3 bg-[#E5E7EB] rounded-md */}
          <div>
            <label className="block text-left text-sm font-medium mb-1">Username</label>
            <input
              type="text" name="username"
              className="w-full p-3 bg-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.username} onChange={handleChange} required
              placeholder="username_123"
            />
          </div>

          {/* Input Password - p-3 bg-[#E5E7EB] rounded-md */}
          <div className="relative">
            <label className="block text-left text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type="password" name="password"
                className="w-full p-3 bg-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.password} onChange={handleChange} required
                placeholder="**********"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transfrom -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {/* Eye/Eye-off Icon */}
                <img src={showPassword ? "src/assets/eye.svg" : "src/assets/eye-off.svg"} alt="toggle password" />
              </button>
            </div>
          </div>

          {/* Ô Input Confirm Password - p-3 bg-[#E5E7EB] rounded-md */}
          <div className="relative">
            <label className="block text-left text-sm font-medium mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type="password" name="confirmPassword"
                className="w-full p-3 bg-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.confirmPassword} onChange={handleChange} required
                placeholder="**********"
              />

              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                {/* Check Icon */}
                {formData.confirmPassword.length > 0 && formData.confirmPassword === formData.password && (
                  <img
                    src="src/assets/check.svg"
                    alt="matched"
                    className="w-[21px] h-[21px] object-contain"
                  />
                )}
                <button
                  type="button"
                  className="flex items-center justify-center focus:outline-none text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {/* Eye/Eye-off Icon */}
                  <img
                    src={showConfirmPassword ? "src/assets/eye.svg" : "src/assets/eye-off.svg"}
                    alt="toggle password"
                    className="object-contain"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Nút Sign up màu xám, bo góc (#9ca3af) */}
          <button
            type="submit"
            disabled={!isFormValid} // Khóa nút nếu form chưa hợp lệ
            className={`w-full py-3 font-bold rounded-md transition-all mt-6 ${isFormValid
              ? "bg-[#3B82F6] hover:bg-[#0040CD] text-white cursor-pointer" // Khi sáng (xanh)
              : "bg-[#8F8E8E] cursor-not-allowed" // Khi tối (xám)
              }`}
          >
            Sign up
          </button>

          {/* Dòng Log in ở dưới (#3B82F6 link) */}
          <p className="text-center text-sm mt-6">
            Already have an account? <Link to="/login" className="text-[#3B82F6] font-semibold hover:underline">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;