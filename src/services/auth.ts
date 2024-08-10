import api from './api';

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (email: string, store_name: string, password: string) => {
  const response = await api.put('/auth/register', { email, store_name, password });
  return response.data;
};
