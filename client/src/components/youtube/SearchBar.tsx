import React, { useState, useEffect } from 'react';
import { Box, TextField, Autocomplete, Stack, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { YoutubeSearchResponse, searchYoutube } from '../../sdk/youtube';
import { getSearchTerms, addSearchTerm } from '../../sdk/user';

export interface Props {
  token: string | null | undefined;
  inputValue: string;
  setSearchValue: (searchResult: YoutubeSearchResponse | undefined) => void;
  setInputValue: (searchResult: string) => void;
}

const SearchBar = (props: Props) => {
  const [searchHistory, setSearchHistory] = useState([' ']);

  useEffect(() => {
    getSearchHistory();
  }, []);

  const getSearchHistory = async () => {
    if (props.token) {
      const searchTerms: [] = await getSearchTerms(props.token);
      if (searchTerms.length !== 0) {
        setSearchHistory(searchTerms);
      }
    }
  };

  const addSearchedTerm = async () => {
    if (props.token) {
      await addSearchTerm(props.inputValue, props.token);
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
    if (props.token) {
      const searchResult = await searchYoutube(props.inputValue, props.token);
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
          inputValue={props.inputValue}
          onInputChange={(event, newInputValue) => {
            props.setInputValue(newInputValue);
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
