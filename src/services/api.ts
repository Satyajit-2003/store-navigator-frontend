import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'https://store-backend-bvus.onrender.com/', 
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(config => {
  const token = Cookies.get('token');
  if (token) {
    config.data = { ...config.data, token }; // Add token to the request body
  }
  return config;
});

export default api;
