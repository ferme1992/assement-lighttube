import { Request, Response } from 'express';
import { User } from '../models/User';

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

export const removeFavoriteVideo = async (req: Request, res: Response) => {
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

    if (!user.favoritedVideos.includes(videoId)) {
      return res.status(400).send('User has not favorited this video');
    }

    const removeIndex = user.favoritedVideos.findIndex(() => {
      (id: string) => id === videoId;
    });
    user.favoritedVideos.splice(removeIndex, 1);

    await User.findByIdAndUpdate(user.id, user).exec();

    res.status(200).send('Video removed from user favorites');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server Error');
  }
};
