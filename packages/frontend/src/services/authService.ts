import axios from 'axios';

// Đổi thành link tuyệt đối để tránh lỗi lệch Port giữa 5173 và 5000
const API_URL = 'http://localhost:5000/api/auth';

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    // Axios tự động parse JSON nên return luôn data
    return response.data; 
  } catch (error: any) {
    // Trả về error message từ server nếu có, không thì báo lỗi kết nối
    throw error.response?.data || { success: false, message: 'Không thể kết nối đến server' };
  }
};