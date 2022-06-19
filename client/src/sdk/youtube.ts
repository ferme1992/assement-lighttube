import api from '../utils/api';
import { AxiosError } from 'axios';

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

interface Id {
  videoId: string;
}

interface Snippet {
  title: string;
  description: string;
  channelTitle: string;
}

interface ListItem {
  id: string;
  snippet: Snippet;
}

interface SearchItem {
  id: Id;
  snippet: Snippet;
}

export interface YoutubeListResponse {
  items: ListItem[];
  pageInfo: PageInfo;
}

export interface YoutubeSearchResponse {
  nextPageToken: string;
  pageInfo: PageInfo;
  items: SearchItem[];
}

export const searchYoutube = async (searchQuery: string, token: string) => {
  try {
    const response = await api.get<YoutubeSearchResponse>('/search', {
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
    const response = await api.get<YoutubeListResponse>(
      '/listFavoritedVideos',
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (err) {
    console.log((err as AxiosError).response?.data);
  }
};
