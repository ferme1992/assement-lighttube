import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { YoutubeSearchResponse } from '../../sdk/youtube';
import useAuth from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import VideosStack from './VideosStack';

const Home = () => {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<YoutubeSearchResponse>();

  useEffect(() => {
    if (!loggedIn) {
      navigate('/');
    }
  }, []);

  return (
    <Container sx={{ justifyContent: 'center' }}>
      <SearchBar setSearchValue={setSearchValue} />
      <VideosStack searchValue={searchValue} />
    </Container>
  );
};

export default Home;
