import React from 'react';
import { Typography, Stack, AppBar } from '@mui/material';
import {
  Logout,
  ElectricBolt,
  Login,
  AccountCircle,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useAuth from '../../context/AuthContext';

const Navbar = () => {
  const { loggedIn, logout } = useAuth();
  // TODO Add auth links redirect, redirect logout to landing, add search bar, fav
  const authLinks = (
    <Stack direction='column' spacing={1}>
      <Stack direction='row' spacing={1}>
        <Logout onClick={logout} fontSize='small' />
        <Typography component='a' sx={{ fontSize: '1rem', mb: '1rem' }}>
          Logout
        </Typography>
      </Stack>
    </Stack>
  );
  //TODO add redirect to home
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