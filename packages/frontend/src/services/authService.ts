import axios from 'axios';

const API_URL = '/api/auth';

// Thêm kiểu string cho username và password
export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    return response.data; 
  } catch (error: any) { // Định nghĩa kiểu any cho error để truy cập .response
    throw error.response?.data || { message: 'Không thể kết nối đến server' };
  }
};