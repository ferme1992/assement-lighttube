export default {
  jwtSecret: process.env.JWT_SECRET || 'mysecrettoken',
  DB: {
    URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/lighttube',
    USER: process.env.MONGODB_USER,
    PASSWORD: process.env.MONGODB_PASSWORD,
  },
  youtubeKey: process.env.YOUTUBE_KEY,
};
