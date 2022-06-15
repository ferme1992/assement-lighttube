import express, { Request, Response } from 'express';
import passport from 'passport';
import { addFavoriteVideo } from '../controllers/user.favorites.controller';

const router = express.Router();
const authJwt = passport.authenticate('jwt', { session: false });

router.post('/addFavorite', authJwt, addFavoriteVideo);

export default router;
