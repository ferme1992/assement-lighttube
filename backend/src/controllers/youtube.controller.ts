import { Request, Response, NextFunction } from 'express';
import { google } from 'googleapis';
import config from '../config/config';

const apiUrl = 'https://www.googleapis.com/youtube/v3';
const youtube = google.youtube({
  version: 'v3',
  auth: config.youtubeKey,
});

// @route   GET /search
// @desc    Search by title on youtube
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
      maxResults: 10,
      q: searchQuery,
    });

    res.send(response.data.items);
  } catch (err) {
    next(err);
  }
};
