import axios, { AxiosError } from 'axios';

const API_URL = '/api/auth';

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    return response.data; 
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || { success: false, message: 'Cannot connect to the server' };
    }
    throw { success: false, message: 'An unknown error occurred' };
  }
};

export const registerUser = async (username: string, password: string, fullName: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      password,
      fullName
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || { success: false, message: 'Cannot connect to the server' };
    }
    throw { success: false, message: 'An unknown error occurred' };
  }
};
