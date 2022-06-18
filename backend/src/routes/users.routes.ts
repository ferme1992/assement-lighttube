import { Router } from 'express';
import passport from 'passport';
import {
  addFavoriteVideo,
  removeFavoriteVideo,
} from '../controllers/user.favorites.controller';
import {
  addSearchTerm,
  getSearchTerms,
} from '../controllers/user.searchTerms.controller';

const router = Router();
const authJwt = passport.authenticate('jwt', { session: false });

router.post('/addFavorite', authJwt, addFavoriteVideo);
router.post('/removeFavorite', authJwt, removeFavoriteVideo);
router.post('/addSearchTerm', authJwt, addSearchTerm);
router.get('/getSearchTerms', authJwt, getSearchTerms);

export default router;
