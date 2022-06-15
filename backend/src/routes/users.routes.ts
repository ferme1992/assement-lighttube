import express, { Request, Response } from 'express';
import passport from 'passport';
import {
  addFavoriteVideo,
  removeFavoriteVideo,
  getFavoritedVideos,
} from '../controllers/user.favorites.controller';

const router = express.Router();
const authJwt = passport.authenticate('jwt', { session: false });

router.post('/addFavorite', authJwt, addFavoriteVideo);
router.post('/removeFavorite', authJwt, removeFavoriteVideo);
router.get('/getFavorites', authJwt, getFavoritedVideos);

export default router;
