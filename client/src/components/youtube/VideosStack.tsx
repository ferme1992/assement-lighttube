import React, { useEffect, useState } from 'react';
import { Box, Typography, Stack, Divider, Grid, Button } from '@mui/material';
import {
  YoutubeListResponse,
  YoutubeSearchResponse,
  listFavorites,
  paginationYoutube,
} from '../../sdk/youtube';
import useAuth from '../../context/AuthContext';
import YoutubePlayer from './YoutubePlayer';

export interface Props {
  searchValue: YoutubeSearchResponse | undefined;
  inputValue: string;
}

const VideosStack = (props: Props) => {
  const { token } = useAuth();
  const [favoriteVideos, setFavoriteVideos] = useState<YoutubeListResponse>();
  const [listSearch, setListSearch] = useState<JSX.Element | JSX.Element[]>();
  const [nextPageResponse, setNextPageResponse] =
    useState<YoutubeSearchResponse>();
  const [previousPageResponse, setPreviousPageResponse] =
    useState<YoutubeSearchResponse>();

  useEffect(() => {
    getFavoriteVideos();
    setNextPageResponse(props.searchValue);
  }, []);

  useEffect(() => {
    if (props.searchValue) {
      setListSearch(videoList(props.searchValue));
    }
  }, [props.searchValue, favoriteVideos]);

  const getFavoriteVideos = async () => {
    if (token) {
      const favorites = await listFavorites(token);
      setFavoriteVideos(favorites);
    }
  };

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

  async function handleNextPage() {
    if (token && props.searchValue) {
      setNextPageResponse(props.searchValue);
      if (nextPageResponse) {
        const nextPage = await paginationYoutube(
          props.inputValue,
          nextPageResponse.nextPageToken,
          token
        );
        if (nextPage) {
          setNextPageResponse(nextPage);
          setPreviousPageResponse(nextPage);
          setListSearch(videoList(nextPage));
        }
      }
    }
  }

  async function handlePreviousPage() {
    if (token && props.searchValue) {
      setNextPageResponse(props.searchValue);
      if (previousPageResponse) {
        const previousPage = await paginationYoutube(
          props.inputValue,
          previousPageResponse.prevPageToken,
          token
        );
        if (previousPage) {
          setNextPageResponse(previousPage);
          setPreviousPageResponse(previousPage);
          setListSearch(videoList(previousPage));
        }
      }
    }
  }

  const videoList = (youtubeSearch: YoutubeSearchResponse) => {
    return youtubeSearch.items ? (
      youtubeSearch.items.map((searchedVideo, index) => (
        <Grid item xs={4} key={index}>
          <Box>
            <YoutubePlayer
              id={searchedVideo.id.videoId}
              title={searchedVideo.snippet.title}
              getFavoriteVideos={getFavoriteVideos}
              isSearchedVideoFavorited={isSearchedVideoFavorited}
            />
          </Box>
        </Grid>
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
      sx={{ justifyContent: 'center' }}
    >
      <Box>
        <Typography gutterBottom variant='h4' component='div'>
          Search Results
        </Typography>
        <Grid container spacing={1}>
          {listSearch}
        </Grid>
        <Stack direction={'row'} spacing={1}>
          <Button size='small' onClick={handlePreviousPage}>
            Previous page
          </Button>
          <Button size='small' onClick={handleNextPage}>
            Next page
          </Button>
        </Stack>
      </Box>
      <Box>
        <Typography gutterBottom variant='h4' component='div'>
          Favorites
        </Typography>
        {favoriteVideos?.items ? (
          favoriteVideos?.items.map((favVideo, index) => (
            <Box key={index}>
              <YoutubePlayer
                id={favVideo.id}
                title={favVideo.snippet.title}
                getFavoriteVideos={getFavoriteVideos}
              />
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
