import { Request, Response } from 'express';
import { userInfo } from 'os';
import { User, IUser } from '../models/User';

// @route   POST /favorites
// @desc    Add favorite videos to user
// @access  Private
export const addFavoriteVideo = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.body.id).exec();

    if (!user) {
      return res.status(400).json({
        errors: [{ msg: 'The user does not exists' }],
      });
    }

    const videoId = req.body.videoId;

    if (!videoId) {
      return res.status(400).send('Video Id not provided');
    }
    if (user.favoritedVideos.includes(videoId)) {
      return res.status(400).send('User already has favorited this video');
    }
    user.favoritedVideos.push(videoId);
    await User.findByIdAndUpdate(user.id, user).exec();

    res.status(200).send('Video added to user favorites');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server Error');
  }
};
