import express, { Request, Response } from 'express';
import passport from 'passport';
import {
  addFavoriteVideo,
  removeFavoriteVideo,
  getFavoritedVideos,
} from '../controllers/user.favorites.controller';
import {
  addSearchTerm,
  getSearchTerms,
} from '../controllers/user.searchTerms.controller';

const router = express.Router();
const authJwt = passport.authenticate('jwt', { session: false });

router.post('/addFavorite', authJwt, addFavoriteVideo);
router.post('/removeFavorite', authJwt, removeFavoriteVideo);
router.get('/getFavorites', authJwt, getFavoritedVideos);
router.post('/addSearchTerm', authJwt, addSearchTerm);
router.get('/getSearchTerms', authJwt, getSearchTerms);

export default router;
