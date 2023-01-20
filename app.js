import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import handler from './routes/handler.js';

// connect to database
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1/todoDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
  res.status(404).json({ message: 'Error' });
});

// listen for request
const port = 3000;
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
