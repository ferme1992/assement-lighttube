import React, { useEffect } from 'react';
import { Typography, Stack, AppBar } from '@mui/material';
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
  // TODO add search bar, fav, style
  const authLinks = (
    <Stack direction='column' spacing={1}>
      <Stack direction='row' spacing={1} onClick={logout}>
        <Logout fontSize='small' />
        <Typography component='a' sx={{ fontSize: '1rem', mb: '1rem' }}>
          Logout
        </Typography>
      </Stack>
    </Stack>
  );
  const guestLinks = (
    <Stack direction='column' spacing={1}>
      <Stack direction='row' spacing={1} component={Link} to='/signIn'>
        <Login fontSize='small' />
        <Typography component='a' sx={{ fontSize: '1rem', mb: '1rem' }}>
          Sign In
        </Typography>
      </Stack>
      <Stack direction='row' spacing={1} component={Link} to='/signUp'>
        <AccountCircle fontSize='small' />
        <Typography component='a' sx={{ fontSize: '1rem', mb: '1rem' }}>
          Sign Up
        </Typography>
      </Stack>
    </Stack>
  );

  return (
    //Add navbar properties, style https://mui.com/material-ui/react-app-bar/#main-content
    <AppBar position='static'>
      <Stack direction='row' spacing={1} component={Link} to='/'>
        <ElectricBolt fontSize='small' />
        <Typography component='a' sx={{ fontSize: '1rem', mb: '1rem' }}>
          LightTube
        </Typography>
      </Stack>
      <>{loggedIn ? authLinks : guestLinks}</>
    </AppBar>
  );
};

export default Navbar;
