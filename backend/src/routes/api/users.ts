import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { User } from '../../models/User';
import bcrypt from 'bcryptjs';

const router = express.Router();

// @route   GET api/users/test
// @desc    Test route
// @access  Public
router.get('/test', (req, res) => res.send('Testing users route'));

// @route   Post api/users
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
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

      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.send('User registered');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }
);

export default router;
