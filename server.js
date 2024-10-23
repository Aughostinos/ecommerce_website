import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDb from './config/db.js';
import User from './models/User.js';
import authRouter from './routes/authRoutes.js';
import router from './routes/productRoutes.js';
import { getUserData } from './middleware/authMiddleware.js';

const app = express();

dotenv.config();

app.get('/', (req, res) => {
    res.send('Hello, world!');
  });

connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//app.use('*', getUserData)
app.use('/', router);

app.listen(process.env.PORT || 3000, () => {
  console.log('listening on *:3000');
});
