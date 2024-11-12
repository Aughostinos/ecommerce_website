import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDb from './config/db.js';
import authRouter from './routes/authRoutes.js';
import homeRouter from './routes/homeRoute.js';
import orderRouter from './routes/orderRoutes.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import categoryRouter from './routes/categoryRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import cors from 'cors';

const app = express();

dotenv.config();

connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(
  {
    origin: ['http://localhost:3001'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
));
app.options('*', cors());

//app.use('*', getUserData)
app.use('/', homeRouter);
app.use('/auth', authRouter);
app.use('/order', orderRouter);
app.use('/user', userRouter);
app.use('/products', productRouter);
app.use('/category', categoryRouter);
app.use('/admin', adminRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log('listening on *:3000');
});
