import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { User } from '../../models/User';
import bcrypt from 'bcryptjs';

const router = express.Router();

// @route   GET api/users/test
// @desc    Test route
// @access  Public
router.get('/test', (req, res) => res.send('Testing users route'));

export default router;
