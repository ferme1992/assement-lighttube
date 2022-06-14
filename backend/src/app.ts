import express from 'express';
import usersRoutes from './routes/users.routes';
import authRoutes from './routes/auth.routes';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';
import passportMiddleware from './middlewares/passport';

const app = express();

// settings
app.set('port', process.env.PORT || 5000);

// Init middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

//routes
app.get('/', (req, res) => {
  res.send(`API connected succesfully at http://localhost:${app.get('port')}`);
});

// Declare routes
app.use(usersRoutes);
app.use(authRoutes);

export default app;
