import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import handler from './routes/handler.js';

// connect to database
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1/todoDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// middleware
app.use(cors());
app.use((req, res, next) => {
  console.log('Time         :', Date.now());
  console.log('Request type :', req.method);
  next();
});

// routes
app.use('/', handler);

// 404 page
app.use((req, res) => {
  res.status(404).render('404');
});

// listen for request
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
