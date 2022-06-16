import { AxiosError } from 'axios';
import api from '../utils/api';

export const signIn = async (email: string, password: string) => {
  const body = { email, password };

  try {
    const response = await api.post('/signin', body);
    return response.data.token;
  } catch (err) {
    console.log((err as AxiosError).response?.data);
  }
};

export const signUp = async (name: string, email: string, password: string) => {
  const body = { name, email, password };

  try {
    const response = await api.post('/signUp', body);
    return response.data.token;
  } catch (err) {
    console.log((err as AxiosError).response?.data);
  }
};
