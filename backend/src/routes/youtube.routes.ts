import { Router } from 'express';
import passport from 'passport';
import {
  searchYoutube,
  listFavoritedVideos,
} from '../controllers/youtube.controller';

const router = Router();

const authJwt = passport.authenticate('jwt', { session: false });

router.get('/search', authJwt, searchYoutube);
router.get('/listFavoritedVideos', authJwt, listFavoritedVideos);

export default router;
