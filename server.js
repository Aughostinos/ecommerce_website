import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import User from './models/User.js';
import router from './routes/authRoutes.js';
import { getUserData } from './middleware/authMiddleware.js';

const app = express();

dotenv.config();

app.get('/', (req, res) => {
    res.send('Hello, world!');
  });

connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('*', getUserData)
app.use('/', router);

app.listen(process.env.PORT || 3000, () => {
  console.log('listening on *:3000');
});
