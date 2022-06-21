import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Card,
  Typography,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Stack,
  Divider,
} from '@mui/material';
import {
  listFavorites,
  YoutubeListResponse,
  YoutubeSearchResponse,
} from '../../sdk/youtube';
import { removeFavoriteVideo, addFavoriteVideo } from '../../sdk/user';
import useAuth from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

const Home = () => {
  const { token, loggedIn } = useAuth();
  const navigate = useNavigate();
  const [favoriteVideos, setFavoriteVideos] = useState<YoutubeListResponse>();
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState<YoutubeSearchResponse>();
  const [listSearch, setListSearch] = useState<JSX.Element | JSX.Element[]>();

  const getFavoriteVideos = async () => {
    if (token) {
      const favorites = await listFavorites(token);
      setFavoriteVideos(favorites);
    }
  };

  useEffect(() => {
    if (!loggedIn) {
      navigate('/');
    }
    getFavoriteVideos();
  }, []);

  useEffect(() => {
    setListSearch(searchedVideoList);
  }, [searchValue]);

  async function handleRemoveFavorite(e: React.MouseEvent<HTMLElement>) {
    if (token) {
      await removeFavoriteVideo(e.currentTarget.id, token);
      getFavoriteVideos();
    }
  }

  async function handleAddFavorite(e: React.MouseEvent<HTMLElement>) {
    if (token) {
      await addFavoriteVideo(e.currentTarget.id, token);
      getFavoriteVideos();
    }
  }

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
    return searchValue?.items ? (
      searchValue?.items.map((searchedVideo) => (
        <Box>
          <Card sx={{ maxWidth: 500, m: '0.5rem' }}>
            <CardMedia
              component='iframe'
              width='560'
              height='315'
              image={`https://www.youtube.com/embed/${searchedVideo.id.videoId}`}
              title='YouTube video player'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
              frameBorder='0'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                {searchedVideo.snippet.title}
              </Typography>
            </CardContent>
            <CardActions>
              {isSearchedVideoFavorited(searchedVideo.id.videoId) ? (
                <Button
                  size='small'
                  id={searchedVideo.id.videoId}
                  onClick={handleRemoveFavorite}
                >
                  Remove from Favorites
                </Button>
              ) : (
                <Button
                  size='small'
                  id={searchedVideo.id.videoId}
                  onClick={handleAddFavorite}
                >
                  Add to Favorites
                </Button>
              )}
            </CardActions>
          </Card>
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
    <Container sx={{ justifyContent: 'center' }}>
      <SearchBar
        token={token}
        inputValue={inputValue}
        setSearchValue={setSearchValue}
        setInputValue={setInputValue}
      />
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
                <Card sx={{ maxWidth: 345, m: '0.5rem' }}>
                  <CardMedia
                    component='iframe'
                    width='560'
                    height='315'
                    image={`https://www.youtube.com/embed/${favVideo.id}`}
                    title='YouTube video player'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                    frameBorder='0'
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      {favVideo.snippet.title}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size='small'
                      id={favVideo.id}
                      onClick={handleRemoveFavorite}
                    >
                      Remove from Favorites
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            ))
          ) : (
            <Box>
              <Typography gutterBottom variant='h5' component='div'>
                You have not favorited any videos yet, use our search bar and
                add videos to favorites
              </Typography>
            </Box>
          )}
        </Box>
      </Stack>
    </Container>
  );
};

export default Home;
