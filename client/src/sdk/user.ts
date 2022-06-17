import { AxiosError } from 'axios';
import api from '../utils/api';

// Favorites functions
export const addFavoriteVideo = async (videoId: string, token: string) => {
  try {
    const response = await api.post(
      '/addFavorite',
      { videoId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.status;
  } catch (err) {
    console.log((err as AxiosError).response?.data);
  }
};

export const removeFavoriteVideo = async (videoId: string, token: string) => {
  try {
    const response = await api.post(
      '/removeFavorite',
      { videoId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.status;
  } catch (err) {
    console.log((err as AxiosError).response?.data);
  }
};

//Search term functions
export const addSearchTerm = async (searchTerm: string, token: string) => {
  try {
    const response = await api.post(
      '/addSearchTerm',
      { searchTerm },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.status;
  } catch (err) {
    console.log((err as AxiosError).response?.data);
  }
};

export const getSearchTerms = async (token: string) => {
  try {
    const response = await api.get('/getSearchTerms', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.log((err as AxiosError).response?.data);
  }
};
