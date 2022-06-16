import React from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Stack,
} from '@mui/material';
import { Visibility, VisibilityOff, AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { signUp } from '../../sdk/auth';

interface State {
  password: string;
  showPassword: boolean;
}

const SignIn = () => {
  const [values, setValues] = React.useState<State>({
    password: '',
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Container sx={{ my: '4rem' }}>
      <Box>
        <Typography variant='h2' sx={{ fontSize: '2rem', mb: '1rem' }}>
          Sign In
        </Typography>
      </Box>
      <Box>
        <Stack direction='row' spacing={1}>
          <AccountCircle fontSize='small' />
          <Typography variant='h2' sx={{ fontSize: '1rem', mb: '1rem' }}>
            Sign Into Your Account
          </Typography>
        </Stack>
      </Box>
      <Box component='form'>
        <Box>
          <TextField required id='email-input' label='Email' margin='normal' />
          <InputLabel htmlFor='outlined-adornment-password'>
            Password
          </InputLabel>
          <OutlinedInput
            id='outlined-adornment-password'
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label='Password'
          />
        </Box>
        <Button
          variant='contained'
          aria-label='sign in button'
          sx={{ my: '1.5rem' }}
        >
          Sign In
        </Button>
      </Box>
      <Box component='p'>
        Don't have an account? <Link to='/signUp'>Sign Up</Link>
      </Box>
    </Container>
  );
};

export default SignIn;
