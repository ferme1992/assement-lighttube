import React, { useEffect } from 'react';
import { Typography, Stack, AppBar, Box, Toolbar } from '@mui/material';
import {
  Logout,
  ElectricBolt,
  Login,
  AccountCircle,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../context/AuthContext';

const Navbar = () => {
  const { loggedIn, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate('/');
    }
  }, [loggedIn]);
  const authLinks = (
    <Stack direction='row' spacing={1} onClick={logout}>
      <Logout fontSize='small' />
      <Typography sx={{ fontSize: '1rem', mb: '1rem' }}>Logout</Typography>
    </Stack>
  );
  const guestLinks = (
    <>
      <Stack direction='row' spacing={1} component={Link} to='/signIn'>
        <Login fontSize='small' />
        <Typography sx={{ fontSize: '1rem', mb: '1rem' }}>Sign In</Typography>
      </Stack>
      <Stack direction='row' spacing={1} component={Link} to='/signUp'>
        <AccountCircle fontSize='small' />
        <Typography sx={{ fontSize: '1rem', mb: '1rem' }}>Sign Up</Typography>
      </Stack>
    </>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Stack
            direction='row'
            spacing={1}
            component={Link}
            to='/'
            sx={{ flexGrow: 1 }}
          >
            <ElectricBolt fontSize='small' />
            <Typography sx={{ fontSize: '1rem', mb: '1rem' }}>
              LightTube
            </Typography>
          </Stack>
          {loggedIn ? authLinks : guestLinks}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
