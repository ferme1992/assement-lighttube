import React from 'react';
import { Box, Button, ButtonGroup } from '@mui/material';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Box className='landing'>
      <Box className='dark-overlay'>
        <Box className='landing-inner'>
          <Box
            component='h1'
            sx={{ fontSize: '4rem', lineHeight: 1.2, mb: '1rem' }}
          >
            Light tube
          </Box>
          <Box component='h1' sx={{ fontSize: '1.5rem', mb: '1rem' }}>
            Search for videos in a super light app and add them to your
            favorites to watch later
          </Box>
          <Box>
            <ButtonGroup size='large' aria-label='large button group'>
              <Button
                component={Link}
                to='/signIn'
                variant='contained'
                aria-label='sign in button'
              >
                <Link to='/signIn'></Link>
                Sign In
              </Button>
              <Button
                component={Link}
                to='/signUp'
                variant='contained'
                aria-label='sign up button'
              >
                Sign Up
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Landing;
