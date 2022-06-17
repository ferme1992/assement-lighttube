import api from '../utils/api';
import { AxiosError } from 'axios';
import useAuth from '../context/AuthContext';

export const searchYoutube = async (searchQuery: string, token: string) => {
  try {
    const response = await api.get('/search', {
      params: { search_query: searchQuery },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.log((err as AxiosError).response?.data);
  }
};

export const listFavorites = async (token: string) => {
  try {
    const response = await api.get('/listFavoritedVideos', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.log((err as AxiosError).response?.data);
  }
};
