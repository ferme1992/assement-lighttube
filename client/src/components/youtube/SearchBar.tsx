import React, { useState, useEffect } from 'react';
import { Box, TextField, Autocomplete, Stack, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { YoutubeSearchResponse, searchYoutube } from '../../sdk/youtube';
import { getSearchTerms, addSearchTerm } from '../../sdk/user';
import useAuth from '../../context/AuthContext';

export interface Props {
  setSearchValue: (searchResult: YoutubeSearchResponse | undefined) => void;
}

const SearchBar = (props: Props) => {
  const { token } = useAuth();
  const [searchHistory, setSearchHistory] = useState([' ']);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    getSearchHistory();
  }, []);

  const getSearchHistory = async () => {
    if (token) {
      const searchTerms: [] = await getSearchTerms(token);
      if (searchTerms.length !== 0) {
        setSearchHistory(searchTerms);
      }
    }
  };

  const addSearchedTerm = async () => {
    if (token) {
      await addSearchTerm(inputValue, token);
      getSearchHistory();
    }
  };

  const handleEnterKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  async function handleSearch() {
    await addSearchedTerm();
    await getSearchedVideos();
  }

  const getSearchedVideos = async () => {
    if (token) {
      const searchResult = await searchYoutube(inputValue, token);
      props.setSearchValue(searchResult);
    }
  };

  return (
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
  );
};

export default SearchBar;
