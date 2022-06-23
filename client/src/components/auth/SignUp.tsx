import React, { FormEvent, useEffect, useState } from 'react';
import {
  Container,
  Box,
  TextField,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Stack,
  Typography,
  FormHelperText,
} from '@mui/material';
import { Visibility, VisibilityOff, AccountCircle } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../context/AuthContext';

interface State {
  password: string;
  showPassword: boolean;
}

const SignUp = () => {
  const { signUpUser, loggedIn } = useAuth();
  const navigate = useNavigate();
  const [isFormInvalid, setIsFormInvalid] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const password = formData.get('password') as string;
    if (password.length > 6) {
      signUpUser(
        formData.get('name') as string,
        formData.get('email') as string,
        password
      );
    } else {
      setIsFormInvalid(true);
    }
  }

  useEffect(() => {
    if (loggedIn) {
      navigate('/home');
    }
  }, [loggedIn]);

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
    <Container>
      <Box component='h1'>Sign Up</Box>
      <Box component='p'>
        <Stack direction='row' spacing={1}>
          <AccountCircle fontSize='small' />
          <Typography variant='h2' sx={{ fontSize: '1rem', mb: '1rem' }}>
            Create your Account
          </Typography>
        </Stack>
      </Box>
      <Box component='form' onSubmit={handleSubmit}>
        <Box>
          <TextField
            type='text'
            required
            margin='normal'
            placeholder='Name'
            name='name'
          />
        </Box>
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
            error={isFormInvalid}
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
          {isFormInvalid && (
            <FormHelperText error id='password-error'>
              Your password needs to be at least 7 characters long
            </FormHelperText>
          )}
        </Box>
        <Button
          type='submit'
          variant='contained'
          aria-label='sign up button'
          sx={{ my: '1.5rem' }}
        >
          Sign Up
        </Button>
      </Box>
      <Box component='p'>
        Already have an account? <Link to='/signIn'>Sign In</Link>
      </Box>
    </Container>
  );
};

export default SignUp;
