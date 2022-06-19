import React, { FormEvent, useEffect } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../context/AuthContext';
interface State {
  password: string;
  showPassword: boolean;
}

const SignIn = () => {
  const { storeToken, loggedIn } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    storeToken(
      formData.get('email') as string,
      formData.get('password') as string
    );
  }

  useEffect(() => {
    if (loggedIn) {
      navigate('/home');
    }
  }, [storeToken]);

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
      <Box component='form' onSubmit={handleSubmit}>
        <Box>
          <TextField
            required
            id='email-input'
            label='Email'
            margin='normal'
            name='email'
          />
          <InputLabel htmlFor='outlined-adornment-password'>
            Password
          </InputLabel>
          <OutlinedInput
            required
            id='outlined-adornment-password'
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            name='password'
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
          type='submit'
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
