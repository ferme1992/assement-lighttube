import { Request, Response, NextFunction } from 'express';
import { google } from 'googleapis';
import config from '../config/config';
import { User } from '../models/User';

const apiUrl = 'https://www.googleapis.com/youtube/v3';
const youtube = google.youtube({
  version: 'v3',
  auth: config.youtubeKey,
});

// @route   GET /search
// @desc    Search by query on youtube
// @access  Private
export const searchYoutube = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const searchQuery = req.query.search_query?.toString();
    const response = await youtube.search.list({
      part: ['snippet'],
      maxResults: 12,
      q: searchQuery,
    });

    res.send(response.data);
  } catch (err) {
    next(err);
  }
};

// @route   GET /listFavoritedVideos
// @desc    List favorited videos from user
// @access  Private
export const listFavoritedVideos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne(req.user).exec();

    if (!user) {
      return res.status(400).json({
        errors: [{ msg: 'The user does not exists' }],
      });
    }

    const videosIds = user.favoritedVideos;

    if (videosIds.length < 1) {
      return res.send([' ']);
    }

    const response = await youtube.videos.list({
      part: ['snippet'],
      id: videosIds,
    });

    res.send(response.data);
  } catch (err) {
    next(err);
    return res.status(500).send('Server Error');
  }
};

// @route   GET /pagination
// @desc    Get pagination from youtube
// @access  Private
export const pagination = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const searchQuery = req.query.search_query?.toString();
    const pageToken = req.query.page?.toString();
    const response = await youtube.search.list({
      part: ['snippet'],
      maxResults: 12,
      pageToken: pageToken,
      q: searchQuery,
    });

    res.send(response.data);
  } catch (err) {
    next(err);
  }
};
