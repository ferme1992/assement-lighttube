import express from 'express';

const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('App is running');
});

app.listen(port, () => {
  console.log(`Connected succesfully on port ${port}`);
});
