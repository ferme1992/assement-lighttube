import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { User } from '../models/User';

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

    return res.status(201).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server Error');
  }
};

export const signIn = (req: Request, res: Response) => {
  res.send('Sign in');
};
