import React, { useEffect, useState } from 'react';
import { Box, Typography, Stack, Divider } from '@mui/material';
import {
  YoutubeListResponse,
  YoutubeSearchResponse,
  listFavorites,
} from '../../sdk/youtube';
import useAuth from '../../context/AuthContext';
import YoutubePlayer from './YoutubePlayer';

export interface Props {
  searchValue: YoutubeSearchResponse | undefined;
}

const VideosStack = (props: Props) => {
  const { token } = useAuth();
  const [favoriteVideos, setFavoriteVideos] = useState<YoutubeListResponse>();
  const [listSearch, setListSearch] = useState<JSX.Element | JSX.Element[]>();

  useEffect(() => {
    getFavoriteVideos();
  }, []);

  const getFavoriteVideos = async () => {
    if (token) {
      const favorites = await listFavorites(token);
      setFavoriteVideos(favorites);
    }
  };

  useEffect(() => {
    setListSearch(searchedVideoList);
  }, [props.searchValue, favoriteVideos]);

  const isSearchedVideoFavorited = (searchedVideoId: string) => {
    let isFav = false;
    if (favoriteVideos && favoriteVideos.items) {
      favoriteVideos?.items.forEach((favVideo) => {
        if (favVideo.id === searchedVideoId) {
          isFav = true;
        }
      });
    }
    return isFav;
  };

  const searchedVideoList = () => {
    return props.searchValue?.items ? (
      props.searchValue?.items.map((searchedVideo) => (
        <Box>
          <YoutubePlayer
            id={searchedVideo.id.videoId}
            title={searchedVideo.snippet.title}
            getFavoriteVideos={getFavoriteVideos}
            isSearchedVideoFavorited={isSearchedVideoFavorited}
          />
        </Box>
      ))
    ) : (
      <Box>
        <Typography gutterBottom variant='h5' component='div'>
          Search in youtube!
        </Typography>
      </Box>
    );
  };

  return (
    <Stack
      direction='row'
      divider={<Divider orientation='vertical' flexItem />}
      spacing={3}
    >
      <Box sx={{ mr: '10rem' }}>
        <Typography gutterBottom variant='h4' component='div'>
          Search Results
        </Typography>
        {listSearch}
      </Box>
      <Box>
        <Typography gutterBottom variant='h4' component='div'>
          Favorites
        </Typography>
        {favoriteVideos?.items ? (
          favoriteVideos?.items.map((favVideo) => (
            <Box>
              <Box>
                <YoutubePlayer
                  id={favVideo.id}
                  title={favVideo.snippet.title}
                  getFavoriteVideos={getFavoriteVideos}
                />
              </Box>
            </Box>
          ))
        ) : (
          <Box>
            <Typography gutterBottom variant='h5' component='div'>
              You have not favorited any videos yet, use our search bar and add
              videos to your favorites
            </Typography>
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default VideosStack;
