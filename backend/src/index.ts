import app from './app';
import { connectDB } from './database';

app.listen(app.get('port'));
console.log('Server on port', app.get('port'));

//Connect to MongoDB
connectDB();
