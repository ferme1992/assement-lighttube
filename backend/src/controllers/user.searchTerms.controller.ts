import { Request, Response } from 'express';
import { User } from '../models/User';

// @route   POST /addSearchTerm
// @desc    Add search term to user
// @access  Private
export const addSearchTerm = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.body.id).exec();

    if (!user) {
      return res.status(400).json({
        errors: [{ msg: 'The user does not exists' }],
      });
    }

    const searchTerm = req.body.searchTerm;

    if (!searchTerm) {
      return res.status(400).send('Search term not provided');
    }
    if (user.searchTerms.includes(searchTerm)) {
      return res.status(200).send('User has already searched for this term');
    }
    user.searchTerms.push(searchTerm);
    await User.findByIdAndUpdate(user.id, user).exec();

    res.status(200).send('Search term added to user');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server Error');
  }
};

// @route   GET /getSearchTerms
// @desc    Get user's search terms
// @access  Private
export const getSearchTerms = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.body.id).exec();

    if (!user) {
      return res.status(400).json({
        errors: [{ msg: 'The user does not exists' }],
      });
    }

    const searchTerms = user.searchTerms;

    if (searchTerms.length < 1) {
      return res.status(200).send('The user has not searched videos yet');
    }

    res.json(searchTerms);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server Error');
  }
};
