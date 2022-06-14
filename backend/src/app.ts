import express from 'express';
import usersRoutes from './routes/api/users.routes';
import authRoutes from './routes/api/auth.routes';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

// settings
app.set('port', process.env.PORT || 5000);

// Init middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//routes
app.get('/', (req, res) => {
  res.send(`API connected succesfully at http://localhost:${app.get('port')}`);
});

// Declare routes
app.use(usersRoutes);
app.use(authRoutes);

export default app;
