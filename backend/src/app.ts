import express from 'express';
import { connectDB } from './db';

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
