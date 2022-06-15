import { Request, Response, NextFunction } from 'express';
import { google } from 'googleapis';
import config from '../config/config';

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
      part: ['id'],
      maxResults: 10,
      q: searchQuery,
    });

    res.send(response.data.items);
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
    const idsToList = req.body.favoritedVideos;
    const response = await youtube.videos.list({
      part: ['snippet'],
      id: idsToList,
    });

    res.send(response.data.items);
  } catch (err) {
    next(err);
  }
};
