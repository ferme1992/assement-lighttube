import { Router } from 'express';
import config from '../config/config';
import { google } from 'googleapis';
import passport from 'passport';
import { searchYoutube } from '../controllers/youtube.controller';

const router = Router();
const apiUrl = 'https://www.googleapis.com/youtube/v3';
const youtube = google.youtube({
  version: 'v3',
  auth: config.youtubeKey,
});
const authJwt = passport.authenticate('jwt', { session: false });

router.get('/search', authJwt, searchYoutube);

export default router;
