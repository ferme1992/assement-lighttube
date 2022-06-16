import { AxiosError } from 'axios';
import api from '../utils/api';

export const signIn = async (email: string, password: string) => {
  const body = { email, password };

  try {
    return await api.post('/signin', body);
  } catch (err) {
    console.log((err as AxiosError).response?.data);
  }
};

export const signUp = async (name: string, email: string, password: string) => {
  const body = { name, email, password };

  try {
    return await api.post('/signUp', body);
  } catch (err) {
    console.log((err as AxiosError).response?.data);
  }
};
