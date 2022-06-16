import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { User, IUser } from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config/config';

function createToken(user: IUser) {
  return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
    expiresIn: 86400,
  });
}

// @route   POST /signup
// @desc    Register user
// @access  Public
export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  // See if user exists
  try {
    let user = await User.findOne({ email }).exec();
    if (user) {
      return res.status(400).json({
        errors: [{ msg: 'User already exists' }],
      });
    }

    user = new User({
      name,
      email,
      password,
    });

    await user.save();

    return res.status(200).json({ token: createToken(user) });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server Error');
  }
};

// @route   POST /signin
// @desc    Login user
// @access  Public
export const signIn = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email }).exec();
  if (!user) {
    return res.status(400).json({
      errors: [{ msg: 'The user does not exists' }],
    });
  }

  const isMatch = await user.comparePassword(password);
  if (isMatch) {
    return res.status(200).json({ token: createToken(user) });
  } else {
    return res.status(400).json({
      msg: 'The email or password are incorrect',
    });
  }
};
