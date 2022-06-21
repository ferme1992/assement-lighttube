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
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (!loggedIn) {
      navigate('/');
    }
  }, []);

  return (
    <Container disableGutters>
      <SearchBar
        setSearchValue={setSearchValue}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      <VideosStack searchValue={searchValue} inputValue={inputValue} />
    </Container>
  );
};

export default Home;
