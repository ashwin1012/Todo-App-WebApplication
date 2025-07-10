import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050';

export const apiClient = axios.create({
  baseURL
});
