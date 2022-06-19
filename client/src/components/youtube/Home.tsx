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
  TextField,
  Autocomplete,
  Stack,
  IconButton,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {
  listFavorites,
  YoutubeListResponse,
  YoutubeSearchResponse,
  searchYoutube,
} from '../../sdk/youtube';
import {
  removeFavoriteVideo,
  getSearchTerms,
  addSearchTerm,
} from '../../sdk/user';
import useAuth from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Favorites = () => {
  const { token, loggedIn } = useAuth();
  const navigate = useNavigate();
  const [favoriteVideos, setFavoriteVideos] = useState<YoutubeListResponse>();
  const [searchHistory, setSearchHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState<YoutubeSearchResponse>();
  const [listSearch, setListSearch] = useState<JSX.Element | JSX.Element[]>();

  const getFavoriteVideos = async () => {
    if (token) {
      const favorites = await listFavorites(token);
      setFavoriteVideos(favorites);
    }
  };

  const getSearchHistory = async () => {
    if (token) {
      const searchTerms = await getSearchTerms(token);
      setSearchHistory(searchTerms);
    }
  };

  const getSearchedVideos = async () => {
    if (token) {
      const searchResult = await searchYoutube(inputValue, token);
      setSearchValue(searchResult);
    }
  };

  const addSearchedTerm = async () => {
    if (token) {
      await addSearchTerm(inputValue, token);
      getSearchHistory();
    }
  };

  useEffect(() => {
    if (!loggedIn) {
      navigate('/');
    }
    getFavoriteVideos();
    getSearchHistory();
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

  const handleEnterKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  async function handleSearch() {
    await addSearchedTerm();
    await getSearchedVideos();
  }

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
              <Button
                size='small'
                id={searchedVideo.id.videoId}
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
          Search in youtube!
        </Typography>
      </Box>
    );
  };

  return (
    <Container sx={{ justifyContent: 'center' }}>
      <Box sx={{ m: '1rem' }}>
        <Stack direction='row' spacing={1}>
          <Autocomplete
            freeSolo
            id='search-bar'
            disableClearable
            sx={{ maxWidth: '60rem', width: '40rem' }}
            onKeyDown={handleEnterKeyDown}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            options={searchHistory.map((term) => term)}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Search on Youtube'
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
              />
            )}
          />
          <IconButton aria-label='search-youtube' onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </Stack>
      </Box>
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

export default Favorites;
