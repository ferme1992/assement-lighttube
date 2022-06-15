import { Router } from 'express';
import { signIn, signUp } from '../controllers/auth.controller';
import { check } from 'express-validator';

const router = Router();

router.post(
  '/signup',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  signUp
);

router.post(
  '/signin',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  signIn
);

export default router;
