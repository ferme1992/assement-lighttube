import express, { Request, Response } from 'express';

const router = express.Router();

// @route   GET api/users/test
// @desc    Test route
// @access  Public
router.get('/test', (req: Request, res: Response) =>
  res.send('Testing users route')
);

export default router;
