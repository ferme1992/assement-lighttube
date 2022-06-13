import express from 'express';
import { connectDB } from './db';
import usersRouter from './routes/api/users';
import authRouter from './routes/api/auth';

const app = express();
const port = 5000;

//Connect to MongoDB
connectDB();

app.get('/', (req, res) => {
  res.send('App is running');
});

app.listen(port, () => {
  console.log(`Connected succesfully on port ${port}`);
});

// Declare routes
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
