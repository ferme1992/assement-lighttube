import api from '../utils/api';
import { AxiosError } from 'axios';

interface Snippet {
  title: string;
  description: string;
  channelTitle: string;
}

interface Item {
  id: string;
  snippet: Snippet;
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface YoutubeResponse {
  items: Item[];
  pageInfo: PageInfo;
}

export const searchYoutube = async (searchQuery: string, token: string) => {
  try {
    const response = await api.get<YoutubeResponse>('/search', {
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
    const response = await api.get<YoutubeResponse>('/listFavoritedVideos', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.log((err as AxiosError).response?.data);
  }
};
