import axios, { AxiosError } from 'axios';

// Absolute path to avoid Port mismatch between Vite (5173) and Express (5000)
const API_URL = 'https://devlingo-backend-vercel-1075077880290.europe-west1.run.app/api/auth';

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